export enum Hours {
  ONE = 1,
  TWELVE = 12,
  ONE_HUNDRED_TWENTY = 120,
  TWENTY_FOUR = 24,
  SEVENTY_TWO = 72
}

export enum Days {
  ONE = 1,
  FIVE = 5,
  TEN = 10,
  FIFTEEN = 15
}

interface AccuweatherInterface {
  getDailyWeatherForecast(currentPosition: string, forecastInterval: Days): Promise<any>;
  getHourlyWeatherForecast(currentPosition: string, forecastInterval: Hours): Promise<any>
}

export class Accuweather implements AccuweatherInterface{
  constructor(private baseUrl: string, private apiKey: string){
  }

  private get(url: string) {
    return fetch(url, { method: 'GET', mode: 'cors', cache: 'default'});
  }

  private async getLocationKey(response: Response): Promise<string> {
    if (response) {
      let responseData = await response;

      if (responseData.ok) {
        let result: any = await responseData.json();
        return Promise.resolve(result.Key);
      } else {
        return Promise.reject(responseData.statusText);
      }
    }

    return Promise.reject('No Response to process');
  }

  private getLocationSearchUrl(apiKey: string, baseUrl: string, query: string, currentPosition: string): string {
    return baseUrl + "/" + query + "?apikey=" + apiKey + "&q=" + currentPosition;
  }s

  private getForecastUrl(numberOfDays: number, apiKey: string, baseUrl: string, query: string, locationKey: string, isDaily: boolean) : string {
    return baseUrl + "/" + query + "/" + numberOfDays.toString() +  (isDaily ? "day/" : "hour/") + locationKey + "?apikey=" + apiKey + "&metric=true";
  }

  public getDailyWeatherForecast(currentPosition: string, numberOfDaysToQuery: Days): Promise<any> {
    return this.getWeatherForTimeInterval(currentPosition, numberOfDaysToQuery, "forecasts/v1/daily", true);
  }

  public getHourlyWeatherForecast(currentPosition: string, numberOfHoursToQuery: Hours): Promise<any> {
    return this.getWeatherForTimeInterval(currentPosition, numberOfHoursToQuery, "forecasts/v1/hourly", false);
  }

  private async getWeatherForTimeInterval(currentPosition: string, interval: number, apiUrl: string, isDaily: boolean): Promise<any> {
    const geolocationQuery = "locations/v1/cities/geoposition/search";

    const locationSearchUrl: string = this.getLocationSearchUrl(this.apiKey, this.baseUrl, geolocationQuery, currentPosition);
    const locationResult: Response = await this.get(locationSearchUrl);
    const locationKey: string = await this.getLocationKey(locationResult);
    const forecastUrl: string = this.getForecastUrl(interval, this.apiKey, this.baseUrl, apiUrl, locationKey, isDaily);
    const forecastResult: Response = await this.get(forecastUrl);

    return Promise.resolve(await forecastResult.json());
  }
}
