"use strict";


const stationList = require('../models/station');
const newStation = require("../controllers/dashboard");
const stationAnalytics = {

  
  getLatestReading(station) {
    let latestReading = 0;
    let weatherIcon = 0;
    if (station.readings.length > 0) {
      latestReading = station.readings[station.readings.length - 1];
    }
    
    //weatherIcon = station.codeToString(station.readings.get(station.readings.length - 1).code);

    station.code = latestReading.code;
    station.windBft = stationAnalytics.beafourt(latestReading.windSpeed);
    station.tempF = stationAnalytics.tempF(latestReading.temperature).toFixed(2);
  //  station.weatherIcon = stationAnalytics.weatherIcon(latestReading.code);
   // station.latestWeather = stationAnalytics.latestWeather(latestReading.code);
    station.pressure = latestReading.pressure;
    station.tempC = latestReading.temperature;
    station.degreesToCompass = stationAnalytics.degreesToCompass(latestReading.windDirection);
    station.windChill = stationAnalytics.windChill(latestReading.temperature, latestReading.windSpeed).toFixed(2);
    station.getWindTrend = stationAnalytics.getWindTrend(station.readings);
    return latestReading;

    // station.tempTrend = stationAnalytics.tempTrend(station.readings);
     //station.windTrend = stationAnalytics.windTrend(station.readings);
    // String.format("%1.2f", stationAnalytics.windChill(latestReading.temperature, latestReading.windSpeed));
    // station.windCompass = stationAnalytics.degreesToCompass(latestReading.windDirection);
    // station.pressureTrend = stationAnalytics.pressureTrend(station.readings);
  },
  
  

/* codeToString(code) {
        switch (code) {
            case 200:
                return "Thunderstorm";

            case 300:
                return "Drizzle";

            case 500:
                return "Rain";

            case 600:
                return "Snow";

            case 701:
                return "Mist";
            
            case 701:
                return "Mist";
            
            case 711:
                return "Smoke";
            
            case 721:
                return "Haze";
            
            case 731:
                return "Sand/Dust swirls";
            
            case 741:
                return "Fog";
            
            case 751:
                return "Sand";
            
            case 761:
                return "Dust";
            
            case 762:
                return "Volcanic Ash";
            
            case 771:
                return "Squalls";
            
            case 781:
                return "Tornado";

            case 800:
                return "Clear";

            case 801:
                return "Few clouds: 11-25%";

            case 802:
                return "Scattered clouds: 25-50%";
            
            case 803:
                return "Broken clouds: 51-84%	";            
          
            case 802:
                return "Overcast clouds: 85-100%";
            
        }
        return " ";
    },
      setWeatherReport(weatherReport) {
        this.weatherReport = weatherReport;
      },

    weatherIcon(code) {
        let weatherIcons = new Map();
        weatherIcons.put(200, "http://openweathermap.org/img/w/11d.png");
        weatherIcons.put(200, "cloud sun icon");
        weatherIcons.put(300, "cloud icon");
        weatherIcons.put(400, "cloud rain icon");
        weatherIcons.put(500, "cloud showers heavy icon");
        weatherIcons.put(600, "snowflake icon");
        weatherIcons.put(700, "snowflake icon");
        weatherIcons.put(800, "poo storm icon");

        return weatherIcons.get(code);
    },

  setWeatherIcon(weatherIcon) {
        this.weatherIcon = weatherIcon;
    },*/
  
    weatherIcon(station) {
    let weatherIcon = null;
    if (station.readings.length > 0) {
      const code = station.readings[station.readings.length - 1].code;

    if (code >= 200 && code <= 232)
      weatherIcon = "http://openweathermap.org/img/w/11d.png";
    else if (code >= 300 && code <= 321)
      weatherIcon = "http://openweathermap.org/img/w/09d.png";
      else if (code >= 500 && code <= 504)
      weatherIcon = "http://openweathermap.org/img/w/10d.png";
    else if (code == 511)
      weatherIcon = "http://openweathermap.org/img/w/13d.png";
    else if (code >= 520 && code <= 531)
      weatherIcon = "http://openweathermap.org/img/w/09d.png";
    else if (code >= 600 && code <= 622)
      weatherIcon = "http://openweathermap.org/img/w/13d.png";
    else if (code == 701)
      weatherIcon = "http://openweathermap.org/img/w/50d.png";
    else if (code == 711)
      weatherIcon = "http://openweathermap.org/img/w/50d.png";
    else if (code == 721)
      weatherIcon = "http://openweathermap.org/img/w/50d.png";
    else if (code == 731)
      weatherIcon = "http://openweathermap.org/img/w/50d.png";
    else if (code == 741)
      weatherIcon = "http://openweathermap.org/img/w/50d.png";
    else if (code == 751)
      weatherIcon = "http://openweathermap.org/img/w/50d.png";
    else if (code == 761)
      weatherIcon = "http://openweathermap.org/img/w/50d.png";
    else if (code == 762)
      weatherIcon = "http://openweathermap.org/img/w/50d.png";
    else if (code == 771)
      weatherIcon = "http://openweathermap.org/img/w/50d.png";
    else if (code == 781)
      weatherIcon = "http://openweathermap.org/img/w/50d.png";
    else if (code == 800)
      weatherIcon = "http://openweathermap.org/img/w/01d.png";
    else if (code == 801)
      weatherIcon = "http://openweathermap.org/img/w/02d.png";
    else if (code == 802)
      weatherIcon = "http://openweathermap.org/img/w/03d.png";
    else if (code == 803 || code == 804)
      weatherIcon = "http://openweathermap.org/img/w/04d.png";
    else weatherIcon = "http://openweathermap.org/img/w/01n.png";

    return weatherIcon;
    }
  },

  latestWeather(station) {
    let latestWeather = null;
    if (station.readings.length > 0) {
      const code = station.readings[station.readings.length - 1].code;

    if (code >= 200 && code <= 232) latestWeather = "Thunderstorm";
    else if (code >= 300 && code <= 321) latestWeather = "Drizzle";
    else if (code == 500) latestWeather = "Light Rain";
    else if (code == 501) latestWeather = "Moderate Rain";
    else if (code == 502) latestWeather = "Heavy Rain";
    else if (code == 503) latestWeather = "Very Heavy Rain";
    else if (code == 500) latestWeather = "Extreme Rain";
    else if (code == 511) latestWeather = "Freezing Rain";
    else if (code == 520) latestWeather = "Light Rain Shower";
    else if (code == 521) latestWeather = "Rain Shower";
    else if (code == 522) latestWeather = "Heavy Rain Shower";
    else if (code == 531) latestWeather = "Ragged Rain Shower";
      
   
    else if (code >= 600 && code <= 622) latestWeather = "Snow";
    else if (code == 701) latestWeather = "Mist";
    else if (code == 711) latestWeather = "Smoke";
    else if (code == 721) latestWeather = "Haze";
    else if (code == 731) latestWeather = "Dust";
    else if (code == 741) latestWeather = "Fog";
    else if (code == 751) latestWeather = "Sand";
    else if (code == 761) latestWeather = "Dust";
    else if (code == 762) latestWeather = "Ash";
    else if (code == 771) latestWeather = "Squall";
    else if (code == 781) latestWeather = "Tornado";
    else if (code == 800) latestWeather = "Clear";
    else if (code == 801) latestWeather = "Clouds";
    else if (code == 802) latestWeather = "Clouds";
    else if (code == 803 || code == 804) latestWeather = "Clouds";
    else latestWeather = "Inavalid Code Entry";

    return latestWeather;
    }
  },

  convertToWindSpeedBFT(windSpeed) {
    if (windSpeed == 1) return 0;
    else if (windSpeed >= 1 && windSpeed <= 5) return 1;
    else if (windSpeed >= 6 && windSpeed <= 11) return 2;
    else if (windSpeed >= 12 && windSpeed <= 19) return 3;
    else if (windSpeed >= 20 && windSpeed <= 28) return 4;
    else if (windSpeed >= 29 && windSpeed <= 38) return 5;
    else if (windSpeed >= 39 && windSpeed <= 49) return 6;
    else if (windSpeed >= 50 && windSpeed <= 61) return 7;
    else if (windSpeed >= 62 && windSpeed <= 74) return 8;
    else if (windSpeed >= 75 && windSpeed <= 88) return 9;
    else if (windSpeed >= 89 && windSpeed <= 102) return 10;
    else if (windSpeed >= 103 && windSpeed <= 117) return 11;
    else return 0;
  },

  tempF(tempC) {
    return (tempC * 1.8) + 32;
  },
  
  getMaxTemp(station) {
    let maxTemp = 0;
    if (station.readings.length > 0) {
      maxTemp = station.readings[0].temperature;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].temperature > maxTemp) {
          maxTemp = station.readings[i].temperature;
        }
      }
    }
    return maxTemp;
  },

  getMinTemp(station) {
    let minTemp = 0;
    if (station.readings.length > 0) {
      minTemp = station.readings[0].temperature;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].temperature < minTemp) {
          minTemp = station.readings[i].temperature;
        }
      }
    }
    return minTemp;
  },
  
  
  
  beafourt(windspeed) {
    if (windspeed == 0) {
      return 0;
    } else if (windspeed >= 1 && windspeed <= 6) {
      return 1;
    } else if (windspeed >= 7 && windspeed <= 11) {
      return 2;
    } else if (windspeed >= 12 && windspeed <= 19) {
      return 3;
    } else if (windspeed >= 20 && windspeed <= 29) {
      return 4;
    } else if (windspeed >= 30 && windspeed <= 39) {
      return 5;
    } else if (windspeed >= 40 && windspeed <= 50) {
      return 6;
    } else if (windspeed >= 51 && windspeed <= 62) {
      return 7;
    } else if (windspeed >= 63 && windspeed <= 75) {
      return 8;
    } else if (windspeed >= 76 && windspeed <= 87) {
      return 9;
    } else if (windspeed >= 88 && windspeed <= 102) {
      return 10;
    } else if (windspeed >= 103 && windspeed <= 117) {
      return 11;
    } else if (windspeed >= 117) {
      return 12;
    }
    return -1;
  },
  

  degreesToCompass(deg) 
  {
    if (deg > 11.25 && deg <= 33.75) {
      return "North North East";
    } else if (deg > 33.75 && deg <= 56.25) {
      return "East North East";
    } else if (deg > 56.25 && deg <= 78.75) {
      return "East";
    } else if (deg > 78.75 && deg <= 101.25) {
      return "East South East";
    } else if (deg > 101.25 && deg <= 123.75) {
      return "East South East";
    } else if (deg > 123.75 && deg <= 146.25) {
      return "South East";
    } else if (deg > 146.25 && deg <= 168.75) {
      return "South South East";
    } else if (deg > 168.75 && deg <= 191.25) {
      return "South";
    } else if (deg > 191.25 && deg <= 213.75) {
      return "South South West";
    } else if (deg > 213.75 && deg <= 236.25) {
      return "South West";
    } else if (deg > 236.25 && deg <= 258.75) {
      return "West South West";
    } else if (deg > 258.75 && deg <= 281.25) {
      return "West";
    } else if (deg > 281.25 && deg <= 303.75) {
      return "West North West";
    } else if (deg > 303.75 && deg <= 326.25) {
      return "North West";
    } else if (deg > 326.25 && deg <= 348.75) {
      return "North North West";
    } else {
      return "North";
    }
  },
      
  windChill(temp, windspeed) {
    return 13.12 + 0.6215 * temp -  11.37 * (Math.pow(windspeed, 0.16)) + 0.3965 * temp * (Math.pow(windspeed, 0.16));
  },

  getMaxWindSpeed(station) {
    let maxWindSpeed = 0;
    if (station.readings.length > 0) {
      maxWindSpeed = station.readings[0].windSpeed;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].windSpeed > maxWindSpeed) {
          maxWindSpeed = station.readings[i].windSpeed;
        }
      }
    }
    return maxWindSpeed;
  },
  
  getMinWindSpeed(station) {
    let minWindSpeed = 0;
    if (station.readings.length > 0) {
      minWindSpeed = station.readings[0].windSpeed;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].windSpeed < minWindSpeed) {
          minWindSpeed = station.readings[i].windSpeed;
        }
      }
    }
    return minWindSpeed;
  },
  
  getMaxPressure(station) {
    let maxPressure = 0;
    if (station.readings.length > 0) {
      maxPressure = station.readings[0].pressure;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].pressure > maxPressure) {
          maxPressure = station.readings[i].pressure;
        }
      }
    }
    return maxPressure;
  },
  
  getMinPressure(station) {
    let minPressure = 0;
    if (station.readings.length > 0) {
      minPressure = station.readings[0].pressure;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].pressure < minPressure) {
          minPressure = station.readings[i].pressure;
        }
      }
    }
    return minPressure;
  },

/*
  pressureTrend(readings) {
    int trend = 0;
    if (readings.size() > 2) {
      values[] = {readings.get(readings.size()-3).pressure, readings.get(readings.size()-2).pressure, readings.get(readings.size()-1).pressure};
      trend = calcTrend(values);
    }
    return trend;
  },
*/
 


  getTempTrend(readings) {
    let trend = 0;
    if (readings.length > 2) {
      let values = [readings[readings.length - 3].temperature, readings[readings.length - 2].temperature, readings[readings.length - 1].temperature];
      trend = this.calcTrend(values);
    }
    return trend;
  },

  getWindTrend(readings) {
    let trend = 0;
    if (readings.length > 2) {
      let values = [readings[readings.length - 3].windSpeed, readings[readings.length - 2].windSpeed, readings[readings.length - 1].windSpeed];
      trend = this.calcTrend(values);
    }
    return trend;
  },

  getPressureTrend(readings) {
    let trend = 0;
    if (readings.length > 2) {
      let values = [readings[readings.length - 3].pressure, readings[readings.length - 2].pressure, readings[readings.length - 1].pressure];
      trend = this.calcTrend(values);
    }
    return trend;
  },

  calcTrend(values) {
    let trend = "";
    if (values.length > 2) {
      if ((parseInt(values[2]) > parseInt(values[1])) && (parseInt(values[1]) > parseInt(values[0]))){
        trend = "big green angle double up icon";
      } else if ((parseInt(values[2]) < parseInt(values[1]))&& (parseInt(values[1]) < parseInt(values[0]))) {
        trend = "big red angle double down icon";
      }
    }
    return trend;
  }
};
module.exports = stationAnalytics;
