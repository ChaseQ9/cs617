// Chase Quigley
// CS617 
let marginTop = 60;
let marginLeft = 60;
let marginRight = 60;
let marginBottom = 60;
let width = 1000 - marginLeft - marginRight;
let height = 600 - marginTop - marginBottom;

const formatTime = d3.timeParse("%Y-%m-%d");
const formatYear = d3.timeParse("%Y");
const formatMonth = d3.timeFormat("%B");
// Dow = Day of week
const formatDow = d3.timeFormat("%A");

const x_scale = d3.scaleBand().range([0, width]);
const y_scale = d3.scaleLinear().range([height, 0]);

// The date reflects when the season Starts (2025-2026 season is '2025')
function chartFranchiseResults(team) {
	d3.csv(`./data/${team}Data/franchiseresults.csv`).then(function(data) {
		let timeColumn = "Year";
		data.forEach((d) => {
			d.Year = formatYear(d.Year);
			d.W = +d.W;
			d.L = +d.L;
		});
		data.sort((a, b) => a.Year - b.Year);
		
		const svg = d3.select(`#${team}`).append("svg").attr("width", width + marginLeft + marginRight).attr("height", height + marginTop + marginBottom).append("g").attr("transform", `translate(${marginLeft},${marginTop})`);
		const x = d3.scaleTime().domain(d3.extent(data, d => d.Year)).range([0, width]);
		const y = d3.scaleLinear().domain([0, d3.max(data, d => Math.max(d.W, d.L))]).range([height, 0]).nice();
		svg.append("g").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(x));
		svg.append("g").call(d3.axisLeft(y).tickFormat(d3.format("d")));

		const winLine = d3.line().x(d => x(d.Year)).y(d => y(d.W));
		const loseLine = d3.line().x(d => x(d.Year)).y(d => y(d.L));
		
		// Plot the Wins and Loses
		let winColor = "green";
		let lossColor = "red";
		const winPath = svg.append("path").datum(data).attr("fill", "none").attr("stroke", winColor).attr("stroke-width", 2).attr("d", winLine);
		const lossPath = svg.append("path").datum(data).attr("fill", "none").attr("stroke", lossColor).attr("stroke-width", .5).attr("d", loseLine);
		const tLength = winPath.node().getTotalLength();
		winPath.attr("stroke-dasharray", tLength).attr("stroke-dashoffset", tLength).transition().duration(3000).ease(d3.easeLinear).attr("stroke-dashoffset", 0);
		lossPath.attr("stroke-dasharray", "8,4").style("opacity", 0).transition().delay(1000).duration(3000).style("opacity", 1);
		
		svg.append("text").attr("x", width - 100).attr("y", 0).attr("fill", winColor).text("Wins");
		svg.append("text").attr("x", width - 100).attr("y", 20).attr("fill", lossColor).text("Losses");
		// Create a headline
		let headlineText = `${team}'s Franchise History Results`;
		svg.append("text").attr("x", (width / 2)).attr("y", 0 - (marginTop / 2)).attr("text-anchor", "middle").style("font-size", "16px").style("fill", "white").text(headlineText);
	}).catch(function(error) {
		console.error(error);
	});
}

function createResultsChart() {
	d3.csv("./data/BruinsData/seasonresults.csv").then(function(data) {
		// Everything mainly happens between this 
		console.log(data);
		data.forEach((d) => {
			d.Date = formatTime(d.Date);
			d.GF = +d.GF;
		});
		data.sort((a, b) => a.Date - b.Date);

		//console.log(d["Att."]);
		const svg = d3.select("#container").append("svg").attr("width", width + marginLeft + marginRight).attr("height", height + marginTop + marginBottom).append("g").attr("transform", `translate(${marginLeft},${marginTop})`);
		const x = d3.scaleTime().domain(d3.extent(data, d => d.Date)).range([0, width]);
		const y = d3.scaleLinear().domain([0, d3.max(data, d => d.GF)]).range([height, 0]).nice();
		svg.append("g").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(x));
		svg.append("g").call(d3.axisLeft(y).ticks(5).tickFormat(d3.format("d")));

		const line = d3.line().x(d => x(d.Date)).y(d => y(d.GF));

		svg.append("path").datum(data).attr("fill", "none").attr("stroke", "steelblue")
			.attr("stroke-width", 2).attr("d", line);
		const color = d => d.Result === "W" ? "green" : "red";
		svg.selectAll("circle").data(data).enter().append("circle").attr("cx", d => x(d.Date)).attr("cy", d => y(d.GF)).attr("r", 4).attr("fill", color);
		// Everything above is related to drawing the graphs
	}).catch(function(error) {
		console.error(error);
	});
}


window.onload = (e) => {
	//createResultsChart();
	chartFranchiseResults("Bruins");
	chartFranchiseResults("RedSox");
	chartFranchiseResults("Celtics");
	chartFranchiseResults("Patriots");
}
