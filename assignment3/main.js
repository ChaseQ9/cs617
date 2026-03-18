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
window.onload = async function() {
    // Fetch both files
    const latText = await (await fetch('./lat.txt?v=' + Date.now())).text();
    const lonText = await (await fetch('./long.txt')).text();

    // Convert text → arrays (IMPORTANT)
    const lattitude_array = latText.split('\n')
	.map(line => line.trim())
	.filter(line => line !== "")
	.map(Number);

	latText.split('\n').forEach((line, i) => {
	  console.log(i, JSON.stringify(line), Number(line.trim()));
	});

    const longitude_array = lonText.split('\n')
	.map(line => line.trim())
	.filter(line => line !== "")
	.map(Number);

	console.log(lattitude_array);
	console.log(longitude_array);
    const data = [
        {
            type: "densitymap",
            lon: longitude_array,
            lat: lattitude_array,
            radius: 10,
            colorscale: "Viridis"
        }
    ];

    const layout = {
		map: {style: "light", center: {lat: 42, lon: -71}},
        width: 600,
        height: 400
    };

    Plotly.newPlot("plot1", data, layout);
}
