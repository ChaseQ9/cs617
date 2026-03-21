// Main js code here
// Google Colab Link:
// https://colab.research.google.com/drive/172xRhtAd_kDpGGJTafF5-ZwknkoKAPCR#scrollTo=2b2F8qMmq2MJ

// Function used to toggle showing the iframe containing
// the boston pd data
function toggle() {
    const frame = document.getElementById("data-frame");
	console.log(frame.style.visibility); 
    if (frame.style.visibility == "hidden") {
        frame.style.visibility = "visible";
    } else {
        frame.style.visibility = "hidden";
    }
}

// Function used to convert a string of text
// (seperated by newlines), into an array which 
// can be used in plotly 
function string_to_number(string) {
    let data_array = string.split('\n')
	.map(line => line.trim())
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
	// https://plotly.com/javascript/table/
	const district_table = [
	['A1', 'A15', 'A7', 'B2', 'B3', 'C6', 'C11', 'D4', 'D14', 'E5', 'E13', 'E18'],
	['Downtown', 'Charlestown', 'East Boston', 'Roxbury', 'Mattapan', 'South Boston', 'Dorchester', 'South End', 'Brighton', 'West Roxbury', 'Jamaica Plain', 'Hyde Park']
	];

	const data_table = [{
		type: 'table',
		header: {
			values: [["<b>District Code</b>"], ["<b>District</b>"]],
			align: "center",
			fill: {color: 'gray'}
		},
		cells: {
			values: district_table,
			align: "center",
			font: {
				color: ['black']
			}
		},
		autosize: true
	}];

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
	const district_keys = [];
	const district_vals = [];
	for (const key in District_Count) {
		district_keys.push(key);
		district_vals.push(District_Count[key]);
	}

	const lattitude_array = string_to_number(latText);
    const longitude_array = string_to_number(lonText); 

	// https://plotly.com/javascript/scatter-tile-maps/
    const data_map_chart = [
        {
            type: "scattermapbox",
			mode: "markers",
            lon: longitude_array,
            lat: lattitude_array,
        }
    ];
	
	// https://plotly.com/javascript/bar-charts/
	const data_bar_chart = [
		{
			x: district_keys,
			y: district_vals,
			type: 'bar'
		}
	];
    const layout_map_chart = {
		mapbox: {style: "carto-darkmatter", center: {lat: 42.3, lon: -71.1}, zoom: 10},
		title: {
			text: "Distribution of Crimes in Boston (1k entries)"
		},
		autosize: true,
		width: 800,
		height: 600,
		paper_bgcolor: '#FFFDD0'
    };


	const layout_bar_chart = {
		title:  {
			text: "Distribution of Crimes Within Boston Districts"
		},
		autosize: true,
		width: 800,
		height: 600,
		paper_bgcolor: '#FFFDD0',
		plot_bgcolor: 'black'
	}

	const layout_table = {
		paper_bgcolor: 'black',
		title: {
			text: "District Code Mappings"
		}, 
		font: {
			color: 'white'
		}
	};

    Plotly.newPlot("plot1", data_map_chart, layout_map_chart);
    Plotly.newPlot("plot2", data_bar_chart, layout_bar_chart);
	Plotly.newPlot("plot3", data_table, layout_table); 

}
