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
window.onload = function() {
	var semesters = ['F17', 'Sp18', 'F18', 'Sp19', 'F19', 'Sp20', 'F20', 'Sp21', 'F21', 'Sp22', 'F22', 'Sp23', 'F23'];
	 
	var s_count = [1085.0, 1005.0, 1145.0, 1042.0, 1171, 1089.0, 1192.0, 1114.0, 1237.0, 1194.0, 1490.0, 1359.0, 1686.0];
	 
	var f_count = [22, 23, 23, 23, 24, 24, 24, 26, 25, 24, 23, 24, 25];
	 
	var students = {
	  x: semesters,
	  y: s_count
	};
	 
	var faculty = {
	  x: semesters,
	  y: f_count
	};
	var data = [students, faculty];	// put code here
	Plotly.newPlot("plot1", data);
	Plotly.newPlot("plot2", data);
}
