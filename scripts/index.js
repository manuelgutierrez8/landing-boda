/**
 * index.js
 * - All our useful JS goes here, awesome!
 */
/*$(".jumbotron").css({ height: $(window).height() + "px" });

$(window).on("resize", function() {
  $(".jumbotron").css({ height: $(window).height() + "px" });
});*/

var lang = "en";
var redirectPage = "default.html";
var userData;

$(window).on("load", function() {
  //Get query strings
  var urlParams = new URLSearchParams(window.location.search);
  let guestId = "";

  if (urlParams.has("guest")) {
    guestId = urlParams.get("guest");
    getData(guestId);
  } else {
    window.location.href = redirectPage;
  }
});

$(document).on("ready", function() {
  setUserInformation();
});

function getData(guestId) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let db = JSON.parse(this.responseText);

      userData = db.find(function(el) {
        return el.id === guestId;
      });

      if (!userData) {
        window.location.href = redirectPage;
      } else {
        setUserInformation();
      }
    }
  };
  xmlhttp.open("GET", "db.json", true);
  xmlhttp.send();
}

function setUserInformation() {
  lang = userData.language;

  document.querySelector(".js-name").textContent = userData.name;
  document.querySelector(".js-guests").textContent = userData.guests;

  translateForm();
}

function getDictionary() {
  return {
    es: {
      intro: "Tienen el agrado de invitarle a la celebración de su boda",
      date: "01 de noviembre de 2019",
      mass: "Misa",
      "mass-place":
        "Capilla Nuestra Señora del Sagrado Corazón  - Colegio Centroamérica",
      event: "Recepción",
      "event-place": "Casa & Jardín Eventos - Las Colinas",
      rsvp: "Por favor RSVP antes del 20 de octubre",
      guests: "Total de invitados: ",
      message: "Lluvia de sobres",
      "button-text": "Asistiremos", 
      "mass-hour": "5:00 PM",      
      "event-hour": "7:00 PM"
    },
    en: {
      intro:
        "Request the honor of your presence at the ceremony of their wedding",
      date: "November 1st, 2019",
      mass: "Ceremony",
      "mass-place": "Capel Nuestra Señora del Sagrado Corazón - Colegio Centroamerica",
      event: "Reception",
      "event-place": "Casa & Jardín Eventos - Las Colinas",
      rsvp: "Kindly RSVP by October 20th.",
      guests: "Total Guests: ",
      message: "Cards Box",
      "button-text": "Joyfully Accepts",
      "mass-hour": "5:00 PM",      
      "event-hour": "7:00 PM"
    }
  };
}

function translateForm() {
  let dictionary = getDictionary();
  let phrases = dictionary[lang];
  let sectionPhrases = Object.keys(phrases);

  sectionPhrases.forEach(prop => {
    var elements = document.querySelectorAll(`[data-locale-text="${prop}"]`);

    elements.forEach(function(el) {
      el.textContent = phrases[prop];
    });
  });
}
