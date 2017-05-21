class Module {
	constructor(div) {
		this.div = div;
	}

	getSize() {

	}
}

class Time extends Module {
	constructor(div, clockDiv, dateDiv) {
		console.log("Initiating time");
		super(div);
		this.clockDiv = (clockDiv === undefined) ? div.find("#clock") : clockDiv;
		this.dateDiv = (dateDiv === undefined) ? div.find("#date") : dateDiv;
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
		setInterval(this.getTanTime.bind(this), 10000);
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
				var tab = tan.getC1(TIME);
				console.log(tab[0]);
				console.log(tab[1]);
				tan.checkTanTime(TIME, tan, tab);
			})
			.fail(function () {
				console.log("error");
			})
			.always(function () {
				console.log("complete");
			});
	}

	//fonction pour récupérer les deux premiers horaires du C1
	getC1(all) {
		var i=-1;
		var j=0;
		var tabIndHoraires = [1000,1000];
		while(i<1 && all[j] !== undefined) {
			if (all[j].ligne.numLigne == "C1") {
				i+=1;
				tabIndHoraires[i]=j;
			}
			j+=1;
		}
		return tabIndHoraires;
	}

	//fonction de vérification des données et d'affichage des horaires
	checkTanTime(timeJSON, tan, tabInd) {
	   
		var horaires = "";
		if (timeJSON[tabInd[0]] === undefined) {
			horaires += "PLUS DE BUS";
			console.log("plusdebus");
		}
		else {
			if (timeJSON[tabInd[0]].temps == "Proche" || timeJSON[tabInd[0]].temps == "horaire.proche") {
				horaires += "<span class='warning'>PROCHE</span>";
				console.log("temps1proche");
			} else {
				horaires += timeJSON[tabInd[0]].temps;
				console.log("temps1");
			}
			horaires += "<br>";
			if (timeJSON[tabInd[1]] === undefined) {
				horaires += "<span class='warning'>DERNIER BUS</span>"
				console.log("temps2undefined");
			} else {
				horaires += timeJSON[tabInd[1]].temps;
				console.log("temps2");
			}
		}
		tan.div.html(horaires);
	}
}

function init() {
	console.log("Document loaded, initiating modules...");
	new Time($("#time"));
	new Tan($("#tan"));
}

$(document).ready(init);
