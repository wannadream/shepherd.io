import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Sheep } from '../sheep';
import { BaseComponent } from '../base.component';
import { SheepService } from '../sheep.service';

@Component({
  selector: 'app-sheep',
  templateUrl: './sheep.component.html',
  styleUrls: ['./sheep.component.css']
})
export class SheepComponent extends BaseComponent implements OnInit {

  dataSource: MatTableDataSource<Sheep>;
  displayedColumns = ['alienNo', 'name', 'nationality', 'dateOfCustody', 'id'];

  constructor(private _sheepSvc: SheepService,
    private _observableMedia: ObservableMedia) { super(); }

  ngOnInit() {
    this.baseInit(this._observableMedia);
    this._sheepSvc.getSheep().subscribe(data => this.dataSource = new MatTableDataSource(data));
  }

}
