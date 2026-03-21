// Main js code here
//

function toggle() {
    const frame = document.getElementById("data-frame");
	console.log(frame.style.visibility); 
    if (frame.style.visibility == "hidden") {
        frame.style.visibility = "visible";
    } else {
        frame.style.visibility = "hidden";
    }
}

function string_to_number(string) {
    let data_array = string.split('\n')
	.map(line => line.trim())
	.filter(line => line !== "")
	.map(Number);

	return data_array 
}
window.onload = async function() {
    // Fetch both files
	// Docs: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    const latText = await (await fetch('./lat.txt')).text();
    const lonText = await (await fetch('./long.txt')).text();
	const District_Count = {'B3': 3287,
         'B2': 4284,
         'A1': 3691,
         'E5': 1548,
         'D14': 2304,
         'C6': 2742,
         'D4': 4535,
         'E18': 1675,
         'C11': 3704,
         'E13': 1946,
         'A7': 1668,
         'A15': 551,
         'External': 44,
         'None': 21}

	// https://police.boston.gov/districts/
	const district_legend = {
		'A1': 'Downtown',
		'A15': 'Charlestown',
		'A7': 'East Boston',
		'B2': 'Roxbury',
		'B3': 'Mattapan',
		'C6': 'South Boston',
		'C11': 'Dorchester',
		'D4': 'South End',
		'D14': 'Brighton',
		'E5': 'West Roxbury',
		'E13': 'Jamaica Plain',
		'E18': 'Hyde Park'
	}

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
	const district_keys = [];
	const district_vals = [];
	for (const key in District_Count) {
		district_keys.push(key);
		district_vals.push(District_Count[key]);
	}
	// These two arrays contain 1000 values - not every
	// value within the dataset is present within these 
	// arrays / points
	const lattitude_array = string_to_number(latText);
    const longitude_array = string_to_number(lonText); 

	console.log(lattitude_array);
	console.log(longitude_array);
    const data_map_chart = [
        {
            type: "scattermapbox",
			mode: "markers",
            lon: longitude_array,
            lat: lattitude_array,
        }
    ];

    const layout_map_chart = {
		mapbox: {style: "carto-darkmatter", center: {lat: 42, lon: -71}, zoom: 8},
		autosize: true,
		width: 800,
		height: 600,
    };

	const data_bar_chart = [
		{
			x: district_keys,
			y: district_vals,
			type: 'bar'
		}
	];

	const layout_bar_chart = {
		title: "Bar Chart",
		width: 800,
		height: 600
	}
    Plotly.newPlot("plot1", data_map_chart, layout_map_chart, {scrollzoom: true});
    Plotly.newPlot("plot2", data_bar_chart, layout_bar_chart);

}
