import { Component, OnInit } from '@angular/core';
import { ImmigrationStatisticsService } from '../immigration-statistics.service';

@Component({
  selector: 'app-immigration-statistics',
  templateUrl: './immigration-statistics.component.html',
  styleUrls: ['./immigration-statistics.component.css']
})
export class ImmigrationStatisticsComponent implements OnInit {

  constructor(private _imSvc: ImmigrationStatisticsService) { }

  ngOnInit() {
    this._imSvc.drawComboChart('aliens-removed-or-returned'
      , 'aliensRemovedOrReturned.json'
      , {
        vAxis: { title: 'Population' },
        hAxis: { title: 'Year' },
        seriesType: 'bars'
      });

    this._imSvc.drawGeoChart('aliens-removed-by-country-of-nationality-2016'
      , 'aliensRemovedByCountryOfNationality2016.json'
      , { colorAxis: { colors: ['lightgrey', 'blue'] } });

    this._imSvc.drawGeoChart('aliens-returned-by-country-of-nationality-2016'
      , 'aliensReturnedByCountryOfNationality2016.json'
      , { colorAxis: { colors: ['lightgrey', 'red'] } });
  }

}
