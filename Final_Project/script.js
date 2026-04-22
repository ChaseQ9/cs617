
const spec = {
	"data": {
		"url": "./data/BruinsData/dataJSON/bos_standardstats.json",
		"format": "json"
	},
	"mark": "bar",
	"encoding": {
		"x": {
			"field": "Age",
			"type": "quantitative"
		},
		"y": {
			"field": "G",
			"type": "quantitative"
		}
	}
};

let groupBar = {
	"data": {
		"url": "./data/BruinsData/dataJSON/bos_seasonresults.json",
		"format": "json"
	},
	"mark": "line",
	"encoding": {
		"x": {
			"field": "Date",
			"type": "nominal"
		},
		"y": {
			"field": "GF",
			"type": "quantitative"
		},
	}
};

function vis(spec) {
	vegaEmbed("#vis", spec, {actions: false});
}

function main(Team) {
	vis(groupBar);
}

window.onload = () => {
	let Bruins = document.getElementById("Bruins");
	let RedSox = document.getElementById("RedSox");
	let Celtics = document.getElementById("Celtics");
	let Patriots = document.getElementById("Patriots");
	main(Bruins);
}
