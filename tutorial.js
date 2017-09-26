
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

function scales(){
	var initialScaleData = [0, 1000, 3000, 2000, 5000, 4000, 7000, 6000, 9000, 8000, 10000];
	var newScaledData=[];
	var min = d3.min(initialScaleData);
	var max = d3.max(initialScaleData);
	
	var linearScale = d3.scaleLinear().domain([min, max]).range([0,100]);

	for (var i = 0; i < initialScaleData.length; i++){
		newScaledData[i] = linearScale(initialScaleData[i]);
	}
}

function transformations(){
	var circleData = [{ "cx": 20, "cy": 20, "radius": 20, "color" : "green" },
 					  { "cx": 70, "cy": 70, "radius": 20, "color" : "purple" }];
 	var rectangleData = [{ "rx": 110, "ry": 110, "height": 30, "width": 30, "color" : "blue" },
 						 { "rx": 160, "ry": 160, "height": 30, "width": 30, "color" : "red" }];

 	var svgContainer = d3.select("body").append("svg").attr("width", 200).attr("height", 200);

 	var circleGroup = svgContainer.append("g")
 						.attr("transform", "translate(80,0)");

 	var circles = circleGroup
 		.selectAll("circle")
 		.data(circleData)
 		.enter()
 		.append("circle");

 	var circleAttributes = circles
                        .attr("cx", function (d) { return d.cx; })
                        .attr("cy", function (d) { return d.cy; })
                        .attr("r", function (d) { return d.radius; })
                        .style("fill", function (d) { return d.color; });

	var rectangles = svgContainer.selectAll("rect")
                             .data(rectangleData)
                             .enter()
                             .append("rect");

	var rectangleAttributes = rectangles
                           .attr("x", function (d) { return d.rx; })
                           .attr("y", function (d) { return d.ry; })
                           .attr("height", function (d) { return d.height; })
                           .attr("width", function (d) { return d.width; })
                           .style("fill", function(d) { return d.color; });
}

function text(){
	var circleData = [{ "cx": 20, "cy": 20, "radius": 20, "color" : "green" },
 					  { "cx": 70, "cy": 70, "radius": 20, "color" : "purple" }];

 	var svgContainer = d3.select("body").append("svg").attr("width", 200).attr("height", 200);

 	var circles = svgContainer
 		.selectAll("circle")
 		.data(circleData)
 		.enter()
 		.append("circle");

 	var circleAttributes = circles
                        .attr("cx", function (d) { return d.cx; })
                        .attr("cy", function (d) { return d.cy; })
                        .attr("r", function (d) { return d.radius; })
                        .style("fill", function (d) { return d.color; });


    var text = svgContainer
 		.selectAll("text")
 		.data(circleData)
 		.enter()
 		.append("text");
 		
    var textLabels = text
    				.attr("x", function(d) { return d.cx; })
    				.attr("y", function(d) { return d.cy; })
    				.text( function(d) { return "(" + d.cx + ", " + d.cy + ")"; })
    				.attr("font-family", "sans-serif")
    				.attr("font-size", "20px")
    				.attr("fill", "red")
}