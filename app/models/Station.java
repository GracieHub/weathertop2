package models;

import play.db.jpa.Model;
import utils.Conversion;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Station extends Model
{
  public String name;
  public double lat;
  public double lng;

  public int code;
  public String weather;
  public double tempC, tempF;
  public double maxTemp, minTemp;
  public int tempTrend;

  public int windBft;
  public double maxWind, minWind;
  public int windTrend;
  public double windChill;
  public String windCompass;

  public int pressure;
  public double maxPressure, minPressure;
  public int pressureTrend;

  @OneToMany(cascade = CascadeType.ALL)
  public List<Reading> readings = new ArrayList<Reading>();

  public Station(String name, double lat, double lng)
  {
    this.name = name;
    this.lat = lat;
    this.lng = lng;
  }

  public String weatherIcon() {
    return Conversion.weatherIcon(this.code);
  }
}