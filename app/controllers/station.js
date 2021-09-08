'use strict';

const logger = require('../utils/logger');
const stationList = require('../models/station');
const uuid = require("uuid");
const axios = require("axios");
const stationAnalytics = require('../utils/station-analytics');

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug('Station id = ', stationId);
    const stationList = require('../models/station');
    const station = stationList.getStation(stationId);
    const readingId = request.params.readingid;
    const readings = station.readings;

    
 if (station.readings.length > 0){
    const latestReading = stationAnalytics.getLatestReading(station);
    console.log(latestReading);
    const maxTemp = stationAnalytics.getMaxTemp(station);
    const minTemp = stationAnalytics.getMinTemp(station);
    const minWindSpeed = stationAnalytics.getMinWindSpeed(station);
    const maxWindSpeed = stationAnalytics.getMaxWindSpeed(station);
    const minPressure = stationAnalytics.getMinPressure(station);
    const maxPressure = stationAnalytics.getMaxPressure(station);
    const latestWeather = stationAnalytics.latestWeather(station);
    const weatherIcon = stationAnalytics.weatherIcon(station);
    const getWindTrend = stationAnalytics.getWindTrend(station);
    const getTempTrend = stationAnalytics.getTempTrend(station);
    const getPressureTrend = stationAnalytics.getPressureTrend(station);

    station.maxTemp = stationAnalytics.getMaxTemp(station);
    station.minTemp = stationAnalytics.getMinTemp(station);
    station.maxWindSpeed = stationAnalytics.getMaxWindSpeed(station);
    station.minWindSpeed = stationAnalytics.getMinWindSpeed(station);
    station.maxPressure = stationAnalytics.getMaxPressure(station);
    station.minPressure = stationAnalytics.getMinPressure(station);
    station.weatherIcon = stationAnalytics.weatherIcon(station);
    station.latestWeather = stationAnalytics.latestWeather(station);
    station.getWindTrend = stationAnalytics.getWindTrend(station.readings);
    station.getTempTrend = stationAnalytics.getTempTrend(station.readings);
    station.getPressureTrend = stationAnalytics.getPressureTrend(station.readings);

    const viewData = {
      title: 'Station',
      station: stationList.getStation(stationId),
      latestReading: latestReading,
      maxTemp: maxTemp,
      minTemp: minTemp,
      maxWindSpeed: maxWindSpeed,
      minWindSpeed: minWindSpeed,
      maxPressure: maxPressure,
      minPressure: minPressure,
      weatherIcon: weatherIcon,
      latestWeather: latestWeather,
      degreesToCompass: stationAnalytics.degreesToCompass(
          latestReading.windDirection),
      windBft: stationAnalytics.beafourt(latestReading.windSpeed),
      windChill: stationAnalytics.windChill
      (latestReading.temperature, latestReading.windSpeed).toFixed(2),
      getWindTrend: getWindTrend,
      getTempTrend: getTempTrend,
      getPressureTrend: getPressureTrend
      
        
    };
    response.render('station', viewData);
  } else {
      const viewData = {
        title: "Station",
        station: stationList.getStation(stationId)
      };
      response.render("station", viewData);
    }
  },
  
  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationList.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },
  
    
  async addReport(request, response) {
    logger.info("rendering new report");
    let report = {};
    
    const stationId = request.params.id;
    const station = stationList.getStation(stationId);
    const readingId = request.params.readingid;
    const lat = stationList.getLat(stationId);
    const lng = stationList.getLng(stationId);
    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=2c9407bebff8d23f3e0083d7eb6fa6d6`;
    
    const result = await axios.get(requestUrl);
    if (result.status == 200) {
      const reading = result.data.current;
      let unix_timestamp = reading.dt;
      var date = new Date(unix_timestamp * 1000);
      report.date =
        date.getDate() +
        "/" +
        (1 + date.getMonth()) +
        "/" +
        date.getFullYear() +
        " " +
        (1 + date.getHours()) +
        ":" + 
         date.getMinutes();

    
      report.code = reading.weather[0].id;
      report.temperature = reading.temp;
      report.windSpeed = reading.wind_speed;
      report.pressure = reading.pressure;
      report.windDirection = reading.wind_deg;
      report.icon = reading.weather[0].icon;
      report.main = reading.weather[0].main;
    }
      const newReading = {
      id: uuid.v1(),
      date: report.date,
      code: report.code,
      temperature: report.temperature,
      windSpeed: report.windSpeed,
      windDirection: report.windDirection,
      pressure: report.pressure,
      main: report.main,
      icon: "http://openweathermap.org/img/w/" + report.icon + ".png"
      };
    console.log(report);
    const viewData = {
      title: "Weather Report",
      reading: report
    };
    logger.debug("New Reading = ", newReading);
    stationList.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationList.getStation(stationId);
    const lat = stationList.getLat(stationId);
    const lng = stationList.getLng(stationId);
    const latestWeather = station.latestWeather
    const weatherIcon = station.weatherIcon
    
    var unix_timestamp = Math.floor(Date.now() / 1000);

    var date = new Date(unix_timestamp * 1000);

    date =
      date.getDate() +
      "/" +
      (1 + date.getMonth()) +
      "/" +
      date.getFullYear() +
      " " +
      (1 + date.getHours()) +
      ":" +
      date.getMinutes().toFixed(2);
    
    const newReading = {
      id: uuid.v1(),
      date: date,
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      windDirection: request.body.windDirection,
      pressure: request.body.pressure,
      main: latestWeather,
      icon: weatherIcon,
      main: latestWeather
    };

    logger.debug("New Reading = ", newReading);
    stationList.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
  }
};

module.exports = station;