import { AfterViewInit, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-grammar',
  templateUrl: './grammar.component.html',
  styleUrls: ['./grammar.component.scss'],
})
export class GrammarComponent implements AfterViewInit {

  @ViewChild('tableG') elementRef: any;
  dataG = [];
  columnG = [];


  ngAfterViewInit() {
    this.dataG = JSON.parse(localStorage.getItem('lg-dataG') || '[]');
    console.log("dataG= " +this.dataG);
    this.columnG = JSON.parse(localStorage.getItem('lg-columnG') || '[]');
    console.log("columnG= ", this.columnG);
    const headerNames = this.dataG[0];
    this.elementRef.nativeElement.data = this.dataG;

    const customTypes = this.columnG.map((e, i) => {
      if ((e['typeName'] as any).toLowerCase().includes('label')) {
      return {
        name: "Label " + i,
        label: {
          options: (e['cellDropdownItems'] as any).map((d: any) => ({
            text: d['name'],
            backgroundColor: d['backgroundColor']
          })),
          canAddMoreOptions: true
        }
      }} 
      return null;
    });

    this.elementRef.nativeElement.customColumnTypes = customTypes.filter(e => e);

    this.elementRef.nativeElement.customColumnsSettings = this.columnG.map((e, i) => {
      const custom = customTypes[i] || {} as any;
      return {
        headerName: headerNames[i],
        defaultColumnTypeName: (custom['name'] || e['typeName'] as any).toLowerCase(),
        cellStyle: {
          width: e['width']
        }
      }
    });
    /* this.elementRef.nativeElement.onCellUpdate = (cellUpdate: any) => { console.log(cellUpdate); };
    this.elementRef.nativeElement.onDataUpdate = (dataUpdate: any) => {
      console.log(dataUpdate);
    }; */

    
   /*  this.elementRef.nativeElement.onCellUpdate = (cellUpdateCol: any) => { console.log("colupdate" + cellUpdateCol); };
    this.elementRef.nativeElement.onDataUpdate = (dataUpdateCol: any) => {
      console.log("datacolupdate"+ dataUpdateCol);
    };
 */
  }

  save() {
    
    localStorage.setItem('lg-dataG', JSON.stringify(this.elementRef.nativeElement.getData()));
    localStorage.setItem('lg-columnG', JSON.stringify(this.elementRef.nativeElement.getColumnsDetails()));
  }


}