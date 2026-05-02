// Chase Quigley
// CS617 
let marginTop = 60;
let marginLeft = 100;
let marginRight = 100;
let marginBottom = 60;
let width = 1200 - marginLeft - marginRight;
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
	Promise.all([
		d3.csv(`./data/${team}Data/franchiseresults.csv`),
		d3.csv(`./data/${team}Data/cmpfranchiseresults.csv`)
	]).then(function([bos_team, cmp_team]) {
		bos_team.forEach((d) => {
			d.Year = formatYear(d.Year);
			d.W = +d.W;
			d.L = +d.L;
			if (d.Team) d.Team = d.Team.replace("*", '');
		});
		cmp_team.forEach((d) => {
			d.Year = formatYear(d.Year);
			d.W = +d.W;
			d.L = +d.L;
			if (d.Team) d.Team = d.Team.replace("*", '');
		});

		function drawDots() {

			svg.selectAll(".win-dot")
			.data(bos_team)
			.enter()
			.append("circle")
			.attr("cx", d => x(d.Year))
			.attr("cy", d => y(d.W))
			.attr("r", 4)
			.attr("fill", "green")
			.attr("opacity", 0.2)
			.on("mouseover", (event, d) => {
				tooltip.style("opacity", 1)
					.html(`
						<strong>${d.Year.getFullYear()}</strong><br/>
						Wins: ${d.W}<br/>
						Losses: ${d.L}
					`);
			})
			.on("mousemove", (event) => {
				tooltip
					.style("left", (event.pageX + 10) + "px")
					.style("top", (event.pageY + 10) + "px");
			})
			.on("mouseout", () => {
				tooltip.style("opacity", 0);
			});

			svg.selectAll(".cmp-dot")
			.data(cmp_team)
			.enter()
			.append("circle")
			.attr("cx", d => x(d.Year))
			.attr("cy", d => y(d.W))
			.attr("r", 4)
			.attr("fill", "steelblue")
			.attr("opacity", 0.2)
			.on("mouseover", (event, d) => {
				tooltip.style("opacity", 1)
					.html(`
						<strong>${d.Year.getFullYear()}</strong><br/>
						Wins: ${d.W}<br/>
						Losses: ${d.L}
					`);
			})
			.on("mousemove", (event) => {
				tooltip
					.style("left", (event.pageX + 10) + "px")
					.style("top", (event.pageY + 10) + "px");
			})
			.on("mouseout", () => {
				tooltip.style("opacity", 0);
			});
		}

		const tooltip = d3.select("body")
		.append("div")
		.style("position", "absolute")
		.style("background", "rgba(0,0,0,0.8)")
		.style("color", "white")
		.style("padding", "6px 10px")
		.style("border-radius", "6px")
		.style("font-size", "12px")
		.style("pointer-events", "none")
		.style("opacity", 0);

		const wonPlayoffs = bos_team.filter(d => d.Playoffs && d.Playoffs.includes("Won"));
		const cmpWonPlayoffs = cmp_team.filter(d => d.Playoffs && d.Playoffs.includes("Won"));
		bos_team.sort((a, b) => a.Year - b.Year);
		cmp_team.sort((a, b) => a.Year - b.Year);
		
		const allData = bos_team.concat(cmp_team);
		
		let x = d3.scaleTime().domain(d3.extent(allData, d => d.Year)).range([0, width]);
		let y = d3.scaleLinear().domain([0, d3.max(allData, d => Math.max(d.W, d.L))]).range([height, 0]).nice();
		let svg = d3.select(`#${team}`).append("svg").attr("width", width + marginLeft + marginRight).attr("height", height + marginTop + marginBottom + 40).append("g").attr("transform", `translate(${marginLeft},${marginTop})`);
		svg.append("g").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(x));
		svg.append("g").call(d3.axisLeft(y).tickFormat(d3.format("d")));

		const winLine = d3.line().x(d => x(d.Year)).y(d => y(d.W));
		const cmpWinLine = d3.line().x(d => x(d.Year)).y(d => y(d.W));

		// Plot the Wins and Loses
		const winColor = "green";
		const cmpColor = "steelblue";
		const cmpTeamName= cmp_team[cmp_team.length - 1].Team;


		const winPath = svg.append("path").datum(bos_team).attr("fill", "none").attr("stroke", winColor).attr("stroke-width", 2).attr("d", winLine);
		const cmpPath = svg.append("path").datum(cmp_team).attr("fill", "none").attr("stroke", cmpColor).attr("stroke-width", 2).attr("d", cmpWinLine);
		const tLength = winPath.node().getTotalLength();
		winPath.attr("stroke-dasharray", tLength).attr("stroke-dashoffset", tLength).transition().duration(3000).ease(d3.easeLinear).attr("stroke-dashoffset", 0).on("end", () => {
			drawDots(bos_team, cmp_team);
		});
		cmpPath.attr("stroke-dasharray", tLength).attr("stroke-dashoffset", tLength).transition().duration(3000).ease(d3.easeLinear).attr("stroke-dashoffset", 0);
		svg.selectAll(".champ-circle")
		.data(wonPlayoffs)
		.enter()
		.append("circle")
		.attr("class", "champ-circle")
		.attr("cx", d => x(d.Year))
		.attr("cy", d => y(d.W)) // aligns with win line
		.attr("r", 0)
		.attr("fill", "green")
		.attr("stroke", "white")
		.attr("stroke-width", 1.5)
		.transition()
		.delay(2000) // so it appears after line animates
		.duration(500)
		.attr("r", 6);

		svg.selectAll(".cmp-champ-circle")
		.data(cmpWonPlayoffs)
		.enter()
		.append("circle")
		.attr("class", "cmp-champ-circle")
		.attr("cx", d => x(d.Year))
		.attr("cy", d => y(d.W))
		.attr("r", 0)
		.attr("fill", "steelblue")
		.attr("stroke", "white")
		.attr("stroke-width", 1)
		.transition()
		.delay(2000)
		.duration(500)
		.attr("r", 5);
		
		const legend = svg.append("g").attr("transform", `translate(${width / 2 - 100}, -10)`);
		legend.append("text")
			.attr("x", -160)
			.attr("fill", winColor)
			.text(`${team} Wins`);
		
		legend.append("text")
			.attr("x", 160)
			.attr("fill", cmpColor)
			.text(`${cmpTeamName} Wins`);

		const headlineText = `${team}'s Franchise History Wins (And Playoff Championships)`;
		svg.append("text").attr("x", (width / 2)).attr("y", 0 - (marginTop / 2)).attr("text-anchor", "middle").style("font-size", "16px").style("fill", "white").text(headlineText);


		// Create a headline
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
