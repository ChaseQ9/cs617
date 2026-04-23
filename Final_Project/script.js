// Chase Quigley
// CS617 
let width = 600;
let height = 600;
let marginTop,marginBottom,marginRight,marginLeft = 20;

const formatTime = d3.timeParse("%Y-%m-%d");
const formatMonth = d3.timeFormat("%B");
// Dow = Day of week
const formatDow = d3.timeFormat("%A");

const x_scale = d3.scaleBand().range([0, width]);
const y_scale = d3.scaleLinear().range([height, 0]);

const svg = d3.select("vis").attr("width", width).attr("height", height);

function createResultsChart() {
	d3.csv("./data/BruinsData/seasonresults.csv").then(function(data) {
		// Everything mainly happens between this 
		console.log(data);
		data.forEach((d) => {
			let time = formatTime(d.Date);
			console.log(formatMonth(time));
			console.log(formatDow(time));
			console.log(d.Result);
			//console.log(d["Att."]);
		});
		// Everything above is related to drawing the graphs
	}).catch(function(error) {
		console.error(error);
	});
}

window.onload = (e) => {
	createResultsChart();
	console.log("test");
}
