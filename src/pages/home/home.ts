import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {
    myCharts:any;
    myCharts2:any;
    myCharts3:any;
    chart:any;

  constructor(public navCtrl: NavController) {}

ionViewDidLoad() {

     var myChart = HighCharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'HouseCoders Group Fund Member Performance'
        },
        xAxis: {
            categories: ['Anna', 'Leticia', 'Benson', 'Tangeni']
        },
        yAxis: {
            title: {
                text: 'Contributions'
            }
        },
        series: [
            {
                name: 'Money',
                data: [1, 9, 4, 2]
            },
            {
                name: 'Material',
                data: [5, 7, 3, 8]
            },
            {name: 'Services',
                data: [2, 1, 2, 6]}
        ]
    });
    this.myCharts = myChart;

 var myCharts2 =    HighCharts.chart('container2', {
         chart: {
      type: 'pie'
      },
      title: {
      text: 'HouseCoders Group Fund'
      },
      xAxis: {
      categories: ['Anna', 'Leticia', 'Benson', 'Tangeni']
      },
      yAxis: {
      title: {
      text: 'Contributions'
      }
      },
      series: [
      {
      name: 'Money',
            data: [1, 9, 4, 2]
      }
      ]
      });


    this.myCharts2 = myCharts2;
}

}
