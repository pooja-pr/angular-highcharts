import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { AppService } from './app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartModel } from './input.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  chart: Chart;
  branchReport: Chart;
  branchInput: ChartModel;
  userInput: ChartModel;
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
    vm.branchInput = new ChartModel();
    vm.userInput = new ChartModel();
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

  onSubmit() {
    console.log('submitted');
    const vm = this;
    if (vm.branchInput.from) {
      vm.branchInput.from = vm.branchInput.from['epoc'];
    }
    if (vm.branchInput.to) {
      vm.branchInput.to = vm.branchInput.to['epoc'];
    }
    console.log(this.branchInput);
    vm.appService.getBranchGraphData(vm.branchInput).subscribe(response => {
      this.init(response);
    });
  }

  onClick() {
    console.log('submitted');
    const vm = this;
    if (vm.userInput.from) {
      vm.userInput.from = vm.branchInput.from['epoc'];
    }
    if (vm.userInput.to) {
      vm.userInput.to = vm.branchInput.to['epoc'];
    }
    console.log(this.userInput);
    vm.appService.getGraphData(vm.userInput).subscribe(response => {
      this.BranchReportGraph(response);
    });
  }

}
