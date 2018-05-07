import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { AppService } from './app.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  chart: Chart;
  branchReport: Chart;
  constructor(private router: Router,
    private route: ActivatedRoute, private appService: AppService) { }

  ngOnInit() {
    const vm = this;
    vm.appService.getGraphData({}).subscribe(response => {
      this.init(response);
    });
    vm.appService.getBranchGraphData({}).subscribe(response => {
      this.BranchReportGraph(response);
    });
  }

  init(inp) {
    const chart = new Chart({
      chart: {
        type: 'column',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: 'Reports'
      },
      credits: {
        enabled: false
      },
      series: [{
        data: inp
      }]
    });

    this.chart = chart;
  }
  BranchReportGraph(inp) {
    console.log(inp);
    const branchChart = new Chart({
      chart: {
        type: 'pie',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: 'Reports'
      },
      credits: {
        enabled: false
      },
      series: [{
        data: inp
      }]
    });

    this.branchReport = branchChart;
  }

}
