"use strict";

const logger = require("../utils/logger");
const stationList = require("../models/station");
const stationAnalytics = require("../utils/station-analytics");
const station = require('./station.js');

const reading = {
  index(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Editing Reading ${readingId} from Station ${stationId}`);
    const viewData = {
      title: "Edit Reading",
      station: stationList.getStation(stationId),
      reading: stationList.getReading(stationId, readingId)
    };
    response.render("reading", viewData);
  },

  update(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    const reading = stationList.getReading(stationId, readingId);


    
    var unix_timestamp = Math.floor(Date.now() / 1000);
    var date = new Date(unix_timestamp * 1000);
    date =
      date.getDate() +
      "/" +
      date.getMonth() +
      "/" +
      date.getFullYear() +
      " " +
      (1 + date.getHours()) +
      ":" +
      date.getMinutes().toFixed(2);
    
    const newReading = {
      date: Number(request.body.date),
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      pressure: Number(request.body.pressure),
      windDirection: Number(request.body.windDirection),
      icon: station.weatherIcon,
      main: station.latestWeather,
    };
    logger.debug(`Updating Reading ${readingId} from Station ${stationId}`);
    stationList.updateReading(reading, newReading);
    response.redirect("/station/" + stationId);
  }
};

module.exports = reading;