import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/service/weather.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {

  constructor(
    private weatherService: WeatherService,
    private datePipe: DatePipe
  ) {
    this.today = this.datePipe.transform(this.today, 'dd-MM-yyyy');
    this.timenow = this.datePipe.transform(this.timenow, 'hh : mm');
  }

  public today: any = Date.now();
  public timenow: any = Date.now();
  public day: any;
  public weathers: any;
  public tem: number = 0;

  ngOnInit(): void {
    this.getWeather();

    this.getDay();



  }

  getWeather() {
    this.weatherService.getWeather().subscribe((item: any) => {
      this.weathers = item;
      console.log(this.weathers);
    });


  }

  getDay() {
    let x: any = new Date();
    let y: any = x.getDay();
    switch (y) {
      case 1:
        this.day = 'Thứ Hai';
        break;
      case 2:
        this.day = 'Thứ Ba';
        break;
      case 3:
        this.day = 'Thứ Tư';
        break;
      case 4:
        this.day = 'Thứ Năm';
        break;
      case 5:
        this.day = 'Thứ Sáu';
        break;
      case 6:
        this.day = 'Thứ Bảy';
        break;
      case 0:
        this.day = 'Chủ nhật';
        break;
    }

  }


}
