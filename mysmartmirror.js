class Module {
	constructor(div) {
		this.div = div;
	}

	getSize() {

	}
}

class Time extends Module {
	constructor(div) {
		console.log("Initiating time");
		super(div);
		this.clockDiv = div.find("#clock");
		this.dateDiv = div.find("#date");
		this.updateTime();
		setInterval(this.updateTime.bind(this), 10000);
	}
	updateTime() {
		console.log("Updating time");
		this.date = new Date();
		this.clockDiv.text(this.clockFormat());
		this.dateDiv.text(this.dateFormat());
	}
	clockFormat() {
		
		return this.date.getHours() + ":" + ("0" + this.date.getMinutes()).slice(-2);
	}
	dateFormat() {
		var days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
		var months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
		return days[this.date.getDay()] + " " + this.date.getDate() + " " + months[this.date.getMonth()] + " " + this.date.getFullYear();
	}
}

class Tan extends Module {
	constructor(div) {
		console.log("Initiating Tan");
		super(div);
		this.getTanTime();
		setInterval(this.getTanTime.bind(this), 30000);
	}

	getTanTime() {
		var tan = this;
		// lien vers le JSON des temps d'attente à l'arrêt Chanzy direction Gare de Chantenay
		var tanAPI = "http://open.tan.fr/ewp/tempsattente.json/CHZY2";
		$.getJSON(tanAPI, function () {
			console.log("success");
		})
			.done(function (TIME) {
				console.log("second success");
				//affichage du texte
				tan.div.html(TIME[0].temps + "<br>" + TIME[1].temps);
				//tan.div.text();
			})
			.fail(function () {
				console.log("error");
			})
			.always(function () {
				console.log("complete");
			});
	}
}

class Weather extends Module {
	constructor(div) {
		console.log("Initiating weather");
		super(div);
		this.currentDiv = div.find("#current");
		this.soonDiv = div.find("#soon");
		this.tomorrowDiv = div.find("#tomorrow");
		this.getWeather();
		setInterval(this.getWeather.bind(this), 600000);
	}

	getWeather() {
		var t = this;
		var k = "YjU3MjUwMzE5MjBlZTI1ZmI2MWU1MWFhZmIyMDNjMWQ=";
		var current = "http://api.openweathermap.org/data/2.5/weather?id=6434483&appid=" + window.atob(k);
		var forecast = "http://api.openweathermap.org/data/2.5/forecast?id=6434483&appid=" + window.atob(k);
		$.getJSON(current)
			.done(function (data) {
				console.log("Current weather request done");
				t.currentDiv.find(".description").text(data.weather[0].description);
				t.currentDiv.find("img").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
			})
			.fail(function () {
				console.log("Current weather request fail");
			});
		$.getJSON(forecast)
			.done(function (data) {
				console.log("Forecast weather request done");
				var date = new Date();
				var soonTime = Math.trunc(date.getTime() / 1000) + 7200;
				var i = 0;
				var found = false;
				while(data.list[i] != undefined && !found) {
					console.log("Data time = " + data.list[i].dt + ", Soon Time = " + soonTime);
					if(parseInt(data.list[i].dt) >= soonTime) {
						found = true;
					} else {
						i++;
					}
				}
				if(found) {
					var foundDate = new Date(data.list[i].dt * 1000);
					t.soonDiv.find(".title").text(foundDate.getHours() + ":" + ("0" + foundDate.getMinutes()).slice(-2));
					t.soonDiv.find(".description").text(data.list[i].weather[0].description);
					t.soonDiv.find("img").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
				} else {
					console.log("There's no soon...");
				}
				date.setHours(24,0,0,0);
				var tomorrowTime = Math.trunc(date.getTime() / 1000) + 43200;
				found = false;
				while(data.list[i] != undefined && !found) {
					console.log("Data time = " + data.list[i].dt + ", Tomorrow Time = " + tomorrowTime);
					if(parseInt(data.list[i].dt) >= tomorrowTime) {
						found = true;
					} else {
						i++;
					}
				}
				if(found) {
					var foundDate = new Date(data.list[i].dt * 1000);
					t.tomorrowDiv.find(".title").text(foundDate.getHours() + ":" + ("0" + foundDate.getMinutes()).slice(-2));
					t.tomorrowDiv.find(".description").text(data.list[i].weather[0].description);
					t.tomorrowDiv.find("img").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
				} else {
					console.log("There's no tomorrow...");
				}
			})
			.fail(function () {
				console.log("Forecast weather request fail");
			});
	}
}

function init() {
	console.log("Document loaded, initiating modules...");
	new Time($("#time"));
	new Tan($("#tan"));
	new Weather($("#weather"));
}

$(document).ready(init);
