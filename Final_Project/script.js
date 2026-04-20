const DATAPATH = "./data/HockeyRef";

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
		"url": "./data/BruinsData/dataJSON/bos_teamstats.json",
		"format": "json"
	},
	"mark": "bar",
	"encoding": {
		"x": {
			"field": "GF",
			"type": "quantitative"
		},
		"y": {
			"field": "S",
			"type": "quantitative"
		},
		"xOffset": {
			"field": "Team"
		},
		"color": {
			"field": "Team"
		}
	}
};

function generateSpec(specInfo) {
	const spec = {
		"data": {
			"url": specInfo.url,
			"format": "json"
		},
		"mark": specInfo.mark,
		"encoding": specInfo.encoding
	};
	return spec;
}

function vis(spec) {
	vegaEmbed("#vis", spec, {actions: false});

}
function main() {
	console.log("main");
	vis(groupBar);
}

window.onload = () => {
	main();
}
