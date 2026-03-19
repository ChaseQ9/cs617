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

	const lattitude_array = string_to_number(latText);
    const longitude_array = string_to_number(lonText); 

	console.log(lattitude_array);
	console.log(longitude_array);
    const data = [
        {
            type: "scattermapbox",
			mode: "markers",
            lon: longitude_array,
            lat: lattitude_array,
        }
    ];

    const layout = {
		mapbox: {style: "carto-darkmatter", center: {lat: 42, lon: -71}, zoom: 8},
		autosize: true,
    };

    Plotly.newPlot("plot1", data, layout, {scrollzoom: true});
    Plotly.newPlot("plot2", data, layout, {scrollzoom: true});

}
