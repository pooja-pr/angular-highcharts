import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { AppService } from '../app.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
  providers: [AppService]
})
export class ChartsComponent implements OnInit {
  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Linechart'
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Line 1',
      data: [1, 2, 3]
    }]
  });

  constructor() { }

  ngOnInit() {
  }

}
