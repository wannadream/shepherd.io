import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var google: any;

@Injectable()
export class ImmigrationStatisticsService {

  constructor(private _http: HttpClient) {
  }

  drawComboChart(elementId: string, dataFile: string, options: any) {
    this._http.get<Array<any>>(`/assets/data/${dataFile}`).subscribe(
      data => {
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => {
          const chart = new google.visualization.ComboChart(document.getElementById(elementId));
          chart.draw(google.visualization.arrayToDataTable(data), options);
        });
      });
  }

  drawGeoChart(elementId: string, dataFile: string, options: any) {
    this._http.get<Array<any>>(`/assets/data/${dataFile}`).subscribe(
      data => {
        google.charts.load('current', {
          'packages': ['geochart'],
          'mapsApiKey': 'AIzaSyASrPC6Tthpqf2x9aSzwb9vY8lZGIReC3M'
        });
        google.charts.setOnLoadCallback(() => {
          const chart = new google.visualization.GeoChart(document.getElementById(elementId));
          chart.draw(google.visualization.arrayToDataTable(data), options);
        });
      }
    );
  }
}
