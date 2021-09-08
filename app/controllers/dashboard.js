"use strict";

const accounts = require ('./accounts.js');
const logger = require("../utils/logger");
const stationList = require("../models/station");
const uuid = require("uuid");
const station = require('./station.js');
const stationAnalytics = require('../utils/station-analytics');
const axios = require("axios");
const oneCallRequest = `https://api.openweathermap.org/data/2.5/weather?lat={{lat}}&lon={{lon}}&appid=2c9407bebff8d23f3e0083d7eb6fa6d6`


const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const stationId = request.params.id;
    logger.debug("Station id = ", stationId);
    const allStations = stationList.getAllStations();
    const station = stationList.getStation(stationId);
    const readingId = request.params.readingid;

      for (let i=0; i<allStations.length; i++) {
      const station = allStations[i];
        
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
    }

    const viewData = {
      title: "Station Dashboard",
      stations: stationList.getUserStations(loggedInUser.id),
    };
    logger.info("about to render", stationList.getAllStations);
    response.render("dashboard", viewData);
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting Stations ${stationId}`);
    stationList.removeStation(stationId);
    response.redirect("/dashboard");
  },

  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      title: request.body.title,
      lat: request.body.lat,
      lng: request.body.lng,
      readings: []
      
    };
    logger.debug("Creating a new Station", newStation);
    stationList.addStation(newStation);
    response.redirect("/dashboard");
  },

};

module.exports = dashboard;
