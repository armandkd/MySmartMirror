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

function init() {
	console.log("Document loaded, initiating modules...");
	new Time($("#time"));
}

$(document).ready(init);
