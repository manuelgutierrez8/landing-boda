/**
 * index.js
 * - All our useful JS goes here, awesome!
 */
/*$(".jumbotron").css({ height: $(window).height() + "px" });

$(window).on("resize", function() {
  $(".jumbotron").css({ height: $(window).height() + "px" });
});*/

var lang = "en";
var redirectPage = "https://www.google.com";
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
      date: "Viernes 01 de noviembre",
      mass: "Misa",
      "mass-place":
        "Capilla de nuestra señora del sagrado Colegio Centroamérica",
      event: "Recepción",
      "event-place": "Casa & jardín Eventos - Las Colinas",
      rsvp: "Por favor RSVP antes del 20 de octubre",
      guests: " Invitado(s)",
      message: "Lluvia de sobres",
      "button-text": "Asistiremos"
    },
    en: {
      intro:
        "Request the honor of your presence at the ceremony of their wedding",
      date: "November 1st, 2019",
      mass: "Ceremony",
      "mass-place": "Capel Nuestra Señora del Sagrado Colegio Centroamerica",
      event: "Reception",
      "event-place": "Casa & jardín Eventos - Las Colinas",
      rsvp: "Kindly RSVP by October 20th.",
      guests: " Guest(s)",
      message: "Cards Box",
      "button-text": "Joyfully Accepts"
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
