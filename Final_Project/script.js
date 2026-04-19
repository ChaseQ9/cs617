
const CHART_WIDTH = 600;
const CHART_HEIGHT = 200;

const dataVisOptions = {

}
window.onload = () => {
	createZipVsAvgTotalVal();
	createPropertyPie("#vis2");
	createPropertyScatter("#vis3");
}

function createPropertyScatter(vis) {
	let spec = {
		"title": "Scatter Plot Land SQFT vs Gross Tax",
		// Load in the data, set the format
		"data": {
			"url": "./prop.json",
			"format": {
				"type": "json",
			}
		},
		"width": CHART_WIDTH,
		"height": CHART_HEIGHT,
		// Set the 'mark' of the chart, aka what type of chart we are using 
		"mark": "point",
		// Convert the zip code column to a string (prevents losing the 0)
		"background": "white",
		// Set the encoding of the graph
		"encoding": {
			"x": {
				"aggregate": "average",
				"field": "LAND_SF",
				"type": "quantitative",
				"title": "Land Square Footage"
			},
			"y": {
				"field": "GROSS_TAX",
				"type": "quantitative",
				"title": "Gross Tax"
			}
		},
	};
	vegaEmbed(vis, spec, {"actions": false});
}

function createPropertyPie(vis) {
	let spec = {
		"title": "Property Breakdown By Land Usage(LU)",
		// Load in the data, set the format
		"data": {
			"url": "./prop.json",
			"format": {
				"type": "json",
			}
		},
		"width": CHART_WIDTH,
		"height": CHART_HEIGHT,
		"transform": [ {
			"aggregate": [{ "op" : "count", "as": "count"}],
			"groupby": ["LU"]
		},
		{
			"joinaggregate": [
				{"op": "sum", "field": "count", "as" : "total"}]
		},
		{
			"calculate": "datum.count / datum.total",
			"as" : "percent"
		}],
		// Set the 'mark' of the chart, aka what type of chart we are using 
		"mark": {
			"type": "arc",
			"innerRadius": 50
		},
		// Convert the zip code column to a string (prevents losing the 0)
		"background": "white",
		// Set the encoding of the graph
		"encoding": {
			"theta": {
				"field": "percent",
				"type": "quantitative"
			},
			"color": {
				"field": "LU",
				"type": "nominal",
			},
			"tooltip": [
				{"field": "percent", "type": "quantitative", "format": ".1%"}
			],
		}
	};
	vegaEmbed(vis, spec, {"actions": false});
}
function createZipVsAvgTotalVal() {
	// This function used chatgpt for assistance in creating and fixing the
	// vegalite code seen below
	let spec = {
		"title": "Average Property Value By Boston Zip Code",
		// Load in the data, set the format
		"data": {
			"url": "./prop.json",
			"format": {
				"type": "json",
			}
		},
		"width": CHART_WIDTH,
		"height": CHART_HEIGHT,
		// Set the 'mark' of the chart, aka what type of chart we are using 
		"mark": {
			"type": "bar",
		},
		// Convert the zip code column to a string (prevents losing the 0)
		"transform": [{
			"calculate": "toString(datum.ZIP_CODE)",
			"as": "ZIP_STR"
		}],
		"background": "white",
		// Set the encoding of the graph
		"encoding": {
			"x": {
				"field": "ZIP_STR",
				"type": "nominal",
				"title": "Zip Code",
			},
			"y": {
				"aggregate": "average",
				"field": "TOTAL_VALUE",
				"title": "Avg Total Property Value ($)"
			},
			"color": {
				"field": "CITY",
				"type": "nominal",
				"title": "City"
			},
			"tooltip": [
				{"field": "ZIP_STR", "type": "nominal", "title": "Zip"},
				{"field": "CITY", "type": "nominal"},
				{"aggregate" : "mean", "field": "TOTAL_VALUE", "title": "Avg Value $"},
			]
		}
	};
	vegaEmbed('#vis', spec, {"actions": false});
}
