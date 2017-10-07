import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
//@Input()
        //chartOptions:any;
  constructor(public navCtrl: NavController) {}
      /*this.chartOptions = {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Fruit Consumption'
    },
    xAxis: {
        categories: ['Apples', 'Bananas', 'Oranges']
    },
    yAxis: {
        title: {
            text: 'Fruit eaten'
        }
    },
    series: [{
        name: 'Jane',
        data: [1, 0, 4]
    }, {
        name: 'John',
        data: [5, 7, 3]
    }]
}
  }*/
ionViewDidLoad(){
    var myChart = HighCharts.chart('container', {

        chart: {

            type: 'bar'

        },

        title: {

            text: 'Fruit Consumption'

        },

        xAxis: {

            categories: ['Apples', 'Bananas', 'Oranges']

        },

        yAxis: {

            title: {

                text: 'Fruit eaten'

            }

        },

        series: [{

            name: 'Jane',

            data: [1, 0, 4]

        }, {

            name: 'John',

            data: [5, 7, 3]

        }]

    });
}

}
