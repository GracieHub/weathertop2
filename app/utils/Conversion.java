package utils;

import java.util.HashMap;
import java.util.Map;

public class Conversion {
  static Map<Integer, String> weatherCodes = new HashMap<>();
  static Map<Integer, String> weatherCodeIcons = new HashMap<>();
  static {
    weatherCodes.put(100, "Clear");
    weatherCodes.put(200, "Partial Clouds");
    weatherCodes.put(300, "Cloudy");
    weatherCodes.put(400, "Light Showers");
    weatherCodes.put(500, "Heavy Showers");
    weatherCodes.put(600, "Rain");
    weatherCodes.put(700, "Snow");
    weatherCodes.put(800, "Thunder");

    weatherCodeIcons.put(100, "sun");
    weatherCodeIcons.put(200, "cloud sun");
    weatherCodeIcons.put(300, "cloud");
    weatherCodeIcons.put(400, "cloud sun rain");
    weatherCodeIcons.put(500, "cloud showers heavy");
    weatherCodeIcons.put(600, "cloud rain");
    weatherCodeIcons.put(700, "snowflake");
    weatherCodeIcons.put(800, "bolt");
  }

  public static String weatherIcon(int code) {
    return weatherCodeIcons.get(code);
  }

  public static String currentWeather(int code) {
    return weatherCodes.get(code);
  }

  public static double tempF(double tempC) {
    return (tempC * 1.8) + 32;
  }

  public static int beafourt(double windspeed) {
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
  }

  public static String degreesToCompass(double deg) {
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
  }
}
