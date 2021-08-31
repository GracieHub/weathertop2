package controllers;

import models.Member;
import models.Station;
import play.Logger;
import play.mvc.Controller;
import utils.Analytics;

import java.util.Collections;
import java.util.List;

public class Dashboard extends Controller
{
  public static void index() {
    Logger.info("Rendering Dashboard");
    Member member = Accounts.getLoggedInMember();
    List<Station> stations = member.stations;
    Collections.sort(stations, (a, b) -> a.name.compareToIgnoreCase(b.name));
    render ("dashboard.html", stations);
  }

  public static void addStation (String name, double lat, double lng)
  {
    Logger.info("Adding a Station");
    Member member = Accounts.getLoggedInMember();
    Station station = new Station(name, lat, lng);
    member.stations.add(station);
    member.save();
    redirect ("/dashboard");
  }

  public static void deleteStation (Long id)
  {
    Logger.info("Deleting a Station");
    Member member = Accounts.getLoggedInMember();
    Station station = Station.findById(id);
    member.stations.remove(station);
    member.save();
    station.delete();
    redirect ("/dashboard");
  }
}
