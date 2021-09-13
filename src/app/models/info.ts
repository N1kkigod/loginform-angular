import { TransferItem } from 'ng-zorro-antd/transfer';

export class VendorValue {
  constructor()
  {
    this.label = '';
    this.value = '';
  }
  label: string;
  value: string;
}

export class Technology {
  constructor()
  {
    this.value = '';
    this.disabledState = false;
  }
  value: string;
  disabledState: boolean;
}

export class Kpi {
  constructor()
  {
    this.value = '';
    this.formula = '';
  }
  value: string;
  formula: string;
}

export class VendorModel {
  constructor()
  {
    this.vendorValue = new VendorValue();
    this.technologyList = [];
    this.kpiAll = [];
    this.kpiValue = [];
  }
  public vendorValue: VendorValue;
  public technologyList: Technology[];
  public kpiAll: TransferItem[];
  public kpiValue: TransferItem[];
}

export class ExportModel {
  constructor()
  {
    this.vendorValue = '';
    this.technology = '';
    this.kpiToView = [];
    this.formulas = [];
  }
  public vendorValue: string;
  public technology: string;
  public kpiToView: string[];
  public formulas: string[];
}
