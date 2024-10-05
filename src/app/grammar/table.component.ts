import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-fida-table',
  styleUrls: ['./grammar.component.scss'],
  templateUrl: './table.component.html',
})
export class TableComponent implements AfterViewInit {
  @Input() name = 'P';

  @ViewChild('tableP') elementRef: any;
  data = [];
  column = [];

  salvato: boolean = true;

  constructor(private change: ChangeDetectorRef) {

  }


  ngAfterViewInit() {
    this.data = JSON.parse(localStorage.getItem('lg-data' + this.name) || '[]');
    this.column = JSON.parse(
      localStorage.getItem('lg-column' + this.name) || '[]'
    );
    const headerNames = this.data[0];
    this.elementRef.nativeElement.data = this.data;

    const customTypes = this.column.map((e, i) => {
      if ((e['typeName'] as any).toLowerCase().includes('label')) {
        return {
          name: 'Label ' + i,
          label: {
            options: (e['cellDropdownItems'] as any).map((d: any) => ({
              text: d['name'],
              backgroundColor: d['backgroundColor'],
            })),
            canAddMoreOptions: true,
          },
        };
      }
      return null;
    });

    this.elementRef.nativeElement.customColumnTypes = customTypes.filter(
      (e) => e
    );

    this.elementRef.nativeElement.customColumnsSettings = this.column.map(
      (e, i) => {
        const custom = customTypes[i] || ({} as any);
        return {
          headerName: headerNames[i],
          defaultColumnTypeName: (
            custom['name'] || (e['typeName'] as any)
          ).toLowerCase(),
          cellStyle: {
            width: e['width'],
          },
        };
      }
    );
    /* this.elementRef.nativeElement.onCellUpdate = (cellUpdate: any) => { console.log(cellUpdate); };
    this.elementRef.nativeElement.onDataUpdate = (dataUpdate: any) => {
      console.log(dataUpdate);
    }; */

    //this.elementRef.nativeElement.onCellUpdate = (cellUpdateCol: any) => { this.salvato = true; console.log("colupdate" + cellUpdateCol); };
    const listener = (e: HTMLElement) => {
      window.open(
        'https://dict.leo.org/italienisch-deutsch/' + e.innerText,
        '_blank'
      );
    };
    const shadow = this.elementRef.nativeElement.shadowRoot;
    this.elementRef.nativeElement.onDataUpdate = (dataUpdateCol: any) => {
      shadow.querySelectorAll('td').forEach((e: HTMLElement) => {
        const plug = (ev: Event) => {
          ev.preventDefault();
          ev.stopPropagation();
          listener(e);
        };
        e.removeEventListener('dblclick', plug);
        e.addEventListener('dblclick', plug);
      });
      //console.log("datacolupdate"+ dataUpdateCol);
      this.salvato = false;
      this.change.detectChanges();
    };
  }

  save() {
    localStorage.setItem(
      'lg-data' + this.name,
      JSON.stringify(this.elementRef.nativeElement.getData())
    );
    localStorage.setItem(
      'lg-column' + this.name,
      JSON.stringify(this.elementRef.nativeElement.getColumnsDetails())
    );
    this.salvato = !this.salvato;
  }
}
