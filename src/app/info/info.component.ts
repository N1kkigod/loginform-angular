import { VendorValue, Technology, Kpi, VendorModel, ExportModel } from './../models/info';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransferItem } from 'ng-zorro-antd/transfer';
import { ExportService } from './../services/export.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  providers: [ExportService]
})

export class InfoComponent implements OnInit {

  vendorValueList: VendorValue[] = [
    { label: 'vendor1', value: 'vendor1'},
    { label: 'vendor2', value: 'vendor2'},
    { label: 'vendor3', value: 'vendor3'}
  ];
  technologyList: Technology[] = [
    { value: 'All', disabledState: false },
    { value: '2G', disabledState: false },
    { value: '3G', disabledState: true },
    { value: '4G', disabledState: true }
  ];
  kpiList: Kpi[] = [
    { value: 'kpi1', formula: 'Counter1+Counter2' },
    { value: 'kpi2', formula: 'Counter1-Counter2' },
    { value: 'kpi3', formula: 'Counter1*Counter2' }
  ];
  formulaList: string[] = [
     'Counter1+Counter2',  'Counter1-Counter2', 'Counter1*Counter2'
  ];
  nzTransferList: TransferItem[] = [
    { key: '0', title: this.kpiList[0].value, disabled: false },
    { key: '1', title: this.kpiList[1].value, disabled: false },
    { key: '2', title: this.kpiList[2].value, disabled: false }
  ];
  vendorList: VendorModel[] = [
     { vendorValue: this.vendorValueList[0],
       technologyList: [this.technologyList[0], this.technologyList[1]],
       kpiAll: [this.nzTransferList[0]],
       kpiValue: [ this.nzTransferList[0] ] },
     { vendorValue: this.vendorValueList[1],
       technologyList: [this.technologyList[0], this.technologyList[1], this.technologyList[2]],
       kpiAll: [this.nzTransferList[0], this.nzTransferList[1]],
       kpiValue: [this.nzTransferList[0], this.nzTransferList[1]] },
     { vendorValue: this.vendorValueList[2],
       technologyList: [this.technologyList[0], this.technologyList[1], this.technologyList[2], this.technologyList[3]],
       kpiAll: [this.nzTransferList[0], this.nzTransferList[1], this.nzTransferList[2]],
       kpiValue: [this.nzTransferList[0], this.nzTransferList[1], this.nzTransferList[2]] }
  ];
  vendorModelToExport: ExportModel = new ExportModel();
  vendorChooseValue = this.vendorValueList[0];
  vendorChooseFromList = this.vendorList[0];

  technologyValue = this.technologyList[0];
  technologyPicked = [];
  formulaToShow: string[] = [];

  nzTransferListToShow: TransferItem[] = [];

  disabled = false;

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.value === o2.value : o1 === o2);

  constructor(private exportService: ExportService, private routerModule: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('loginState') !== 'true')
    {
      // tslint:disable-next-line: no-unused-expression
      this.routerModule.navigate(['/login']);
    }
  }

  vendorChange(data: any): void{
    this.vendorChooseValue = data;
    switch (data){
      case this.vendorValueList[0] : {
        this.vendorModelToExport = new ExportModel();
        this.nzTransferListToShow = [];
        this.formulaToShow = [];
        this.technologyValue = new Technology();
        this.vendorChooseFromList = this.vendorList[0];
        this.technologyList[2].disabledState = true;
        this.technologyList[3].disabledState = true;
        this.vendorModelToExport.vendorValue = this.vendorValueList[0].value;
        break;
      }
      case this.vendorValueList[1] : {
        this.vendorModelToExport = new ExportModel();
        this.nzTransferListToShow = [];
        this.formulaToShow = [];
        this.technologyValue = new Technology();
        this.vendorChooseFromList = this.vendorList[1];
        this.technologyList[2].disabledState = false;
        this.technologyList[3].disabledState = true;
        this.vendorModelToExport.vendorValue = this.vendorValueList[1].value;
        break;
      }
      case this.vendorValueList[2] : {
        this.vendorModelToExport = new ExportModel();
        this.nzTransferListToShow = [];
        this.formulaToShow = [];
        this.technologyValue = new Technology();
        this.vendorChooseFromList = this.vendorList[2];
        this.technologyList[2].disabledState = false;
        this.technologyList[3].disabledState = false;
        this.vendorModelToExport.vendorValue = this.vendorValueList[2].value;
        break;
      }
    }
  }

  technologyChange(data: any): void{
    switch (data){
      case this.technologyList[0].value: {
        this.vendorModelToExport.formulas = [];
        this.vendorModelToExport.kpiToView = [];
        this.nzTransferListToShow = [];
        this.vendorModelToExport.technology = this.technologyList[0].value;
        this.formulaToShow = [];
        this.vendorChooseFromList.kpiAll.forEach((value: any) => {
          value.direction = 'left';
          this.nzTransferListToShow.push(value);
        });
        break;
      }
      case this.technologyList[1].value: {
        this.vendorModelToExport.formulas = [];
        this.vendorModelToExport.kpiToView = [];
        this.nzTransferListToShow = [];
        this.vendorModelToExport.technology = this.technologyList[1].value;
        this.formulaToShow = [];
        this.vendorChooseFromList.kpiValue[0].direction = 'left';
        this.nzTransferListToShow.push(this.vendorChooseFromList.kpiValue[0]);
        break;
      }
      case this.technologyList[2].value: {
        this.vendorModelToExport.formulas = [];
        this.vendorModelToExport.kpiToView = [];
        this.nzTransferListToShow = [];
        this.vendorModelToExport.technology = this.technologyList[2].value;
        this.formulaToShow = [];
        this.vendorChooseFromList.kpiValue[1].direction = 'left';
        this.nzTransferListToShow.push(this.vendorChooseFromList.kpiValue[1]);
        break;
      }
      case this.technologyList[3].value: {
        this.vendorModelToExport.formulas = [];
        this.vendorModelToExport.kpiToView = [];
        this.nzTransferListToShow = [];
        this.vendorModelToExport.technology = this.technologyList[3].value;
        this.formulaToShow = [];
        this.vendorChooseFromList.kpiValue[2].direction = 'left';
        this.nzTransferListToShow.push(this.vendorChooseFromList.kpiValue[2]);
        break;
      }
    }
  }

  logout(): void{
    localStorage.setItem('loginState', 'false');
    this.routerModule.navigate(['/logout']);
  }
  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  exportFile(): void {
    this.exportService.downloadFile([this.vendorModelToExport]);
  }

  change(ret: any): void {
    ret.list.forEach((data: any) => {
      if (ret.to === 'right') {
        switch (data.key) {
          case '0': {
            this.formulaToShow.push(this.formulaList[0]);
            this.vendorModelToExport.kpiToView.push(data.title);
            this.vendorModelToExport.formulas.push(this.formulaList[0]);
            break;
          }
          case '1' : {
            this.formulaToShow.push(this.formulaList[1]);
            this.vendorModelToExport.kpiToView.push(data.title);
            this.vendorModelToExport.formulas.push(this.formulaList[1]);
            break;
          }
          case '2' : {
            this.formulaToShow.push(this.formulaList[2]);
            this.vendorModelToExport.kpiToView.push(data.title);
            this.vendorModelToExport.formulas.push(this.formulaList[2]);
            break;
          }
        }
        console.log(this.vendorModelToExport);
      }
      else if (data.direction === 'left'){
        switch (data.key) {
          case '0': {
            this.formulaToShow.splice(this.formulaToShow.findIndex(a => a === this.formulaList[0]), 1);
            this.vendorModelToExport.kpiToView.splice(this.vendorModelToExport.kpiToView.findIndex(a => a === data.title), 1);
            this.vendorModelToExport.formulas.splice(this.vendorModelToExport.formulas.findIndex(a => a === this.formulaList[0]), 1);
            break;
          }
          case '1' : {
            this.formulaToShow.splice(this.formulaToShow.findIndex(a => a === this.formulaList[1]), 1);
            this.vendorModelToExport.kpiToView.splice(this.vendorModelToExport.kpiToView.findIndex(a => a === data.title), 1);
            this.vendorModelToExport.formulas.splice(this.vendorModelToExport.formulas.findIndex(a => a === this.formulaList[1]), 1);
            break;
          }
          case '2' : {
            this.formulaToShow.splice(this.formulaToShow.findIndex(a => a === this.formulaList[2]), 1);
            this.vendorModelToExport.kpiToView.splice(this.vendorModelToExport.kpiToView.findIndex(a => a === data.title), 1);
            this.vendorModelToExport.formulas.splice(this.vendorModelToExport.formulas.findIndex(a => a === this.formulaList[2]), 1);
            break;
          }
        }
      }
    });

  }
}
