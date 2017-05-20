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

function init() {
	console.log("Document loaded, initiating modules...");
	new Time($("#time"));
}

$(document).ready(init);
