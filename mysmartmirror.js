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
		this.updateTime();
		setInterval(this.updateTime.bind(this), 10000);
	}
	updateTime() {
		console.log("Updating time");
		this.div.text(this.timeFormat());
	}
	timeFormat() {
		var date = new Date();
		return date.getHours() + ":" + ("0" + date.getMinutes()).slice(-2);
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



function init() {
	console.log("Document loaded, initiating modules...");
	new Time($("#time"));
	new Tan($("#tan"));
}

$(document).ready(init);
