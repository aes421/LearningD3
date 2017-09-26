
function drawColoredCircles(){
	var circleRadii = [40, 20, 10];

	var svgContainer = d3.select("body").append("svg").attr("width", 600).attr("height", 100);

	var circles = svgContainer.selectAll("circle").data(circleRadii).enter().append("circle");

	var circleAttributes = circles.attr("cx", 50)
	.attr("cy", 50)
	.attr("r", function (d){ return d; })
	.style("fill", function (d){
		if (d === 40){ return "green"; }
		else if (d === 20){ return "red"; }
		else { return "blue"; }
	});
}

function svgCoordinateSpace(){
	var spaceCircles = [30, 70, 110];

	var svgContainer = d3.select("body").append("svg").attr("width", 200).attr("height", 200).style("border", "1px solid black");

	var circles = svgContainer.selectAll("circle").data(spaceCircles).enter().append("circle");

	var circleAttributes = circles.attr("cx", function(d) { return d; })
	.attr("cy", function(d) { return d; })
	.attr("r", 20)
	.style("fill", function (d){
		if (d === 30){ return "green"; }
		else if (d === 70){ return "red"; }
		else { return "blue"; }
	});
}

function JSONModelCircles(){
	var jsonCircles = [ 
		{ "x": 30,
			"y": 20,
			"r": 20,
			"color": "green" },
		{ "x": 70,
			"y": 70,
			"r": 20,
			"color": "purple" },
		{ "x": 110,
			"y": 100,
			"r": 20,
			"color": "red" }
	];

	var svgContainer = d3.select("body").append("svg").attr("width", 200).attr("height", 200).style("border", "1px solid black");

	var circles = svgContainer.selectAll("circle").data(jsonCircles).enter().append("circle");

	var circleAttributes = circles.attr("cx", function(d) { return d.x; })
	.attr("cy", function(d) { return d.y; })
	.attr("r", function(d) { return d.r; })
	.style("fill", function (d){ return d.color; }
	);
}

function SVGPath(){
	var lineData = [ { "x": 10,   "y": 25},  { "x": 10,  "y": 75},
		{ "x": 60,  "y": 75}, { "x": 10,  "y": 25}];

	var lineFunction = d3.line()
		.x(function(d) { return d.x; })
		.y(function(d) { return d.y; })
		.curve(d3.curveLinear);

	var svgContainer = d3.select("body").append("svg").attr("width", 200).attr("height", 200).style("border", "1px solid black");

	var lineGraph = svgContainer.append("path")
								.attr("d", lineFunction(lineData))
								.attr("stroke", "blue")
								.attr("stroke-width", 2)
								.attr("fill", none);


}

function dynamicSVGSpace(){
	var jsonRects = [ 
		{   "x": 10,
			"y": 10,
			"h": 20,
			"w": 20,
			"color": "green" },
		{ 	"x": 160,
			"y": 40,
			"h": 20,
			"w": 20,
			"color": "purple" },
		{ 	"x": 70,
			"y": 70,
			"h": 20,
			"w": 20,
			"color": "red" }
	];

	var max_x = 0;
	var max_y = 0;
	for (var i = 0; i < jsonRects.length; i++){
		curr_x = jsonRects[i].x + jsonRects[i].w;
		curr_y = jsonRects[i].y + jsonRects[i].h;
		if ( curr_x > max_x) { max_x = curr_x; }
		if ( curr_y > max_y) { max_y = curr_y; } 
	}

	var svgContainer = d3.select("body").append("svg").attr("width", max_x + 20).attr("height", max_y + 20).style("border", "1px solid black");

	var rects = svgContainer.selectAll("rect").data(jsonRects).enter().append("rect");

	var rectAttributes = rects.attr("x", function(d) { return d.x; })
	.attr("y", function(d) { return d.y; })
	.attr("width", function(d) { return d.w; })
	.attr("height", function(d) { return d.h; })
	.style("fill", function (d){ return d.color; }
	);
}