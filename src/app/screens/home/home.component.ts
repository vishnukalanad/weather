import { Component } from '@angular/core';
import {OverviewComponent} from "../../features/overview/overview.component";
import {ForecastComponent} from "../../features/forecast/forecast.component";
import {MultidayForecastComponent} from "../../features/multiday-forecast/multiday-forecast.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    OverviewComponent,
    ForecastComponent,
    MultidayForecastComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
