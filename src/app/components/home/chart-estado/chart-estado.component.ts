import { Component, Input, OnInit } from '@angular/core';
import { ApexChart, ApexPlotOptions, ApexFill, ApexStroke, ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'chart-estado',
  imports: [ChartComponent],
  standalone: true,
  templateUrl: './chart-estado.component.html',
  styleUrl: './chart-estado.component.css'
})


export class ChartEstadoComponent implements OnInit{
  @Input() titulo:string = "";
  @Input() cantidad:number=0;
  chart: ApexChart = {
    height: 280,
    type: 'radialBar'
  };
  colors: string[] = [];
  labels: string[] = []
  
  constructor(){}

  ngOnInit(): void {
      switch (this.titulo) {
    case "Verde":
        this.colors = ['#20E647'];
      break;
    case "Amarillo":
        this.colors = ['#e3e620ff'];
      break;
    case "Rojo":
        this.colors = ['#e62d20ff'];
      break;
    case "Negro":
        this.colors = ['#101110ff'];
      break;
  
    default:
      this.colors = ['#203ee6ff'];
      break;
    }

    this.labels= [this.titulo]
  }

  plotOptions: ApexPlotOptions = {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: '#333',
        startAngle: -90,
        endAngle: 90
      },
      dataLabels: {
        name: {
          show: true
        },
        value: {
          fontSize: '15px',
          offsetY: 0,
          show: true
        }
      }
    }
  };

  fill: ApexFill = {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      gradientToColors: ['#d8e2e7ff'],
      stops: [0, 100]
    }
  };

  stroke: ApexStroke = {
    lineCap: 'butt'
  };


}
