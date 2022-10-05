import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {



  constructor(
    private http: HttpClient
  ) { }
  private HNurl = "https://api.openweathermap.org/data/2.5/weather?lat=21.027764&lon=105.834160&appid=2c6411991161a195b76ab3724913a94e";

  getWeather() {
    return this.http.get<any>(this.HNurl).pipe(
      tap((res: any) => {
        return res;
      })
    );
  }
}
