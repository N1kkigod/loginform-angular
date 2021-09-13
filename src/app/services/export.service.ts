import { ExportModel } from './../models/info';
import { Injectable, ElementRef } from '@angular/core';

import { saveAs } from 'file-saver';

@Injectable()
export class ExportService {
  constructor() { }
    public downloadFile(data: ExportModel[]): void {
    const replacer = (key: any, value: any) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    const csv = data.map((row: any) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');

    const blob = new Blob([csvArray], {type: 'text/csv' });
    saveAs(blob, 'myFile.csv');
    }
}
