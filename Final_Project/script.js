

const dataVisOptions = {

}
window.onload = () => {
	createZipVsAvgTotalVal();
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
		"width": "1000",
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
				{"aggregate" : "mean", "field": "LIVING_AREA", "title": "Avg Living Area"},
				{"aggregate" : "mean", "field": "TOTAL_VALUE", "title": "Avg Value"},
			]
		}
	}
	vegaEmbed('#vis', spec, {"actions": false});
}
