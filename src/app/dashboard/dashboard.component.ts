import { Component, OnInit } from '@angular/core';
import { CommonService } from './../shared/common.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [CommonService]
})
export class DashboardComponent implements OnInit {

  constructor(private commonService: CommonService) { }
  list: any[] = [];
  dropdownList: any[] = [];
  dataList: any[] = [];
  subtype: any;
  selectedHeader: any;
  IsListVisible:boolean = true;
  IsEditVisible:boolean = false;
  ngOnInit() {
    this.listJson(true);
  }

  listJson(single?: boolean) {
    this.commonService.GetMethod('assets/dropdown-data.json').subscribe(
      data => {
        this.dropdownList = data.data;
        if (single)
          this.subtype = this.dropdownList[0].ALERT_TYPE_ID;
        // console.log(this.dropdownList)
        this.addSelectedDropdown();
      }
    );
    this.bindTable();
  }
  bindTable(){
    this.dataList=[];
    this.commonService.GetMethod('assets/table-data.json').subscribe(
      data => {
        let list: any = [];
        let app_type_id: number[] = [];
        let app_id:any[]=[];
        let i: number = 0;
        for (let m of data.data) {
          if(m.ALERT_TYPE_ID == this.subtype){
            if(app_type_id.indexOf(m.ALERT_TYPE_ID) != -1 && app_id.indexOf(m.APP_ID) != -1){
              list[list.length-1].header = {
                    "NAME": m.COLUMN_NAME,
                    "DELIMETER": m.SRC_DELIM,
                    "APPROX_ROW": 100,
                    "FILENAME": m.SRC_FILE_NAME,
                    "ALERT_TYPE_ID": m.ALERT_TYPE_ID,
                    "APP_ID":m.APP_ID
                  };
            }
            else {
              list.push({
                "header":{
                  "NAME": m.COLUMN_NAME,
                  "DELIMETER": m.SRC_DELIM,
                  "APPROX_ROW": 100,
                  "FILENAME": m.SRC_FILE_NAME,
                  "ALERT_TYPE_ID": m.ALERT_TYPE_ID,
                  "APP_ID":m.APP_ID                  
                },
                "body":[]
              });
            }
          }
          app_type_id.push(m.ALERT_TYPE_ID);
          app_id.push(m.APP_ID);
        }
        for(let m of list){
          m.body  = m.body.concat(this.pushRelatedData(m.header.ALERT_TYPE_ID, m.header.APP_ID, data.data));
        }
        this.dataList = list;
        // console.log(this.dataList);
      }
    );
  }
  pushRelatedData(id: number, APP_ID:any, data: any) {
    let list: any[] = [];
    console.log(id,APP_ID)
    for (let m of data) {
      if (m.ALERT_TYPE_ID == id && m.APP_ID==APP_ID) {
        list.push({
          "ID": m.INDEX_TYPE_ID,
          "TYPE": m.SRC_DELIM,
          "REQUIRED": m.IS_MANDATORY == 1,
          "NAME": m.COLUMN_NAME,
          "UNIQUE": m.IS_UNIQUE == 1,
          "DOMAIN": m.DOMAIN,
          "DESCRIPTION": m.COLUMN_DESC,
          "MIN_LENGTH": m.MIN_LEN,
          "MAX_LENGTH": m.MAX_LEN,
          "FUTURE_ALLOWED": m.IS_FUTURE_ALLOWED == 1,
          "PAST_ALLOWED":m.IS_PAST_ALLOWED ==1,
          "ORDER":m.COL_ORD,
          "ALERT_TYPE_ID":m.ALERT_TYPE_ID
        })
      }
    }
    // console.log(list);
    return list;
  }
  addSelectedDropdown() {
    this.IsListVisible = true;
    this.IsEditVisible = false;
    for (let m of this.dropdownList) {
      if (m.ALERT_TYPE_ID == this.subtype) {
        this.selectedHeader = {
          "DISPLAY_VAL": m.DISPLAY_VAL,
          "ALERT_TYPE_ID": m.ALERT_TYPE_ID,
          "VERSION": m.VERSION,
          "APP_ID": m.APP_ID
        }
      }
    }
    this.bindTable();
    // this.listJson(false)
    // console.log(this.selectedHeader)
  }
  back(){
    this.IsListVisible = true;
    this.IsEditVisible = false;
  }
  editMode(data:any){
    this.IsListVisible = false;
    this.IsEditVisible = true;
    console.log(data);
  }
}
