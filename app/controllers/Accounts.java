package controllers;

import models.Member;
import play.Logger;
import play.mvc.Controller;

public class Accounts extends Controller {
  public static void index() {
    render("start.html");
  }

  public static void signup() {
    render("signup.html");
  }

  public static void login() {
    render("login.html");
  }

  public static void settings() {
    Member member = getLoggedInMember();
    render("settings.html", member);
  }

  public static void updateSettings(Member member) {
    Member loggedInMember = getLoggedInMember();
    loggedInMember.firstname = member.firstname;
    loggedInMember.lastname = member.lastname;
    loggedInMember.email = member.email;
    loggedInMember.password = member.password;

    loggedInMember.save();
    redirect("/settings");
  }

  public static void logout() {
    session.clear();
    index();
  }

  public static Member getLoggedInMember() {
    Member member = null;
    if (session.contains("logged_in_Memberid")) {
      String memberId = session.get("logged_in_Memberid");
      member = Member.findById(Long.parseLong(memberId));
    } else {
      login();
    }
    return member;
  }

  public static void register(String email, String firstname, String lastname, String password, String stationname) {
    Member member = new Member(firstname, lastname, email, password);
    member.save();
    index();
  }

  public static void authenticate(String email, String password) {
    Logger.info("Attempting to authenticate with " + email + ":" + password);

    Member member = Member.findByEmail(email);
    if ((member != null) && (member.checkPassword(password) == true)) {
      Logger.info("Authentication successful");
      session.put("logged_in_Memberid", member.id);
      Dashboard.index();
    } else {
      Logger.info("Authentication failed");
      login();
    }
  }
}
