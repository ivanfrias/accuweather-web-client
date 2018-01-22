import * as test from 'tape';
import * as Accuweather from '../src/index';

let json = require('./config.json');

const position: string = '39.6558007,-8.5887342';
const baseUrl: string = "http://dataservice.accuweather.com";
const client: Accuweather.Accuweather = new Accuweather.Accuweather(baseUrl, json.apiKey);

test('get weather for next 5 days', async function(t) {
  try {
    const result = await client.getDailyWeatherForecast(position, Accuweather.Days.FIVE);
    t.notEqual(result, undefined);
    t.equals(result.DailyForecasts.length, 5);
    t.notEquals(result.DailyForecasts[0].Date, undefined);
    t.notEquals(result.DailyForecasts[0].Temperature.Minimum.Value, undefined);
    t.notEquals(result.DailyForecasts[0].Temperature.Maximum.Value, undefined);
  } catch(e) {
    t.fail(e);
  } finally {
    t.end();
  }
});

test('get weather for next hour', async function(t) {
  try {
    const result = await client.getHourlyWeatherForecast(position, Accuweather.Hours.ONE);
    t.notEqual(result, undefined);
    t.notEquals(result[0].DateTime, undefined);
    t.notEquals(result[0].Temperature, undefined);
  } catch(e) {
    t.fail(e);
  } finally {
    t.end();
  }
});
