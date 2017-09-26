
function drawColoredCircles(){
	var circleRadii = [40, 20, 10];

	var svgContainer = d3.select("body").append("svg").attr("width", 600).attr("height", 100);

	var circles = svgContainer.selectAll("circle").data(circleRadii).enter().append("circle");

	var circleAttributes = circles.attr("cx", 50)
	.attr("cy", 50)
	.attr("r", function (d){ return d; })
	.style("fill", function (d){
		if (d === 40){ return "green" }
		else if (d === 20){ return "red" }
		else { return "blue" }
	});
}