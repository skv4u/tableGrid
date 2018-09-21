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
    this.commonService.GetMethod('assets/table-data.json').subscribe(
      data => {
        let list: any = [{ "header": {}, "body": [] }];
        let app_type_id: number[] = [];
        let i: number = 0;
        for (let m of data.data) {
          if (app_type_id.indexOf(m.ALERT_TYPE_ID) == -1) {
            list[i].header = {
              "NAME": m.COLUMN_NAME,
              "DELIMETER": m.SRC_DELIM,
              "APPROX_ROW": 100,
              "FILENAME": m.SRC_FILE_NAME,
              "ALERT_TYPE_ID": m.ALERT_TYPE_ID
            };
            list[i].body = this.pushRelatedData(m.ALERT_TYPE_ID, data.data)
          }
          app_type_id.push(m.ALERT_TYPE_ID);
        }
      }
    );
  }
  pushRelatedData(id: number, data: any) {
    let list: any[] = [];
    for (let m of data) {
      if (m.ALERT_TYPE_ID == id) {
        list.push({
          "ID": m.INDEX_TYPE_ID,
          "TYPE": m.SRC_DELIM,
          "REQUIRED": 100,
          "NAME": m.SRC_FILE_NAME,
          "UNIQUE": m.IS_UNIQUE,
          "DOMAIN": m.DOMAIN,
          "DESCRIPTION": m.COLUMN_DESC,
          "MIN_LENGTH": m.MIN_LEN,
          "MAX_LENGTH": m.MAX_LEN,
          "FUTURE_ALLOWED": m.IS_FUTURE_ALLO
        })
      }
    }
    return list;
  }
  addSelectedDropdown() {
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
    console.log(this.selectedHeader)
  }
}
