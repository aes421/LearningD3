var dataset = [ 25, 7, 5, 26, 11, 8, 25, 14, 23, 19,
    14, 11, 22, 29, 11, 13, 12, 17, 18, 10,
    24, 18, 25, 9, 3];

var dataset2 = [
    [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
    [410, 12], [475, 44], [25, 67], [85, 21], [220, 88],
    [600, 150]
  ];

function addP(){
    d3.select("body").append("p").text("New paragraph!");
}

function createParagraphsFromDataset(){
    d3.select("body")
        .selectAll("p")
        .data(dataset)
        .enter()
        .append("p")
        .text(function(d) { return d; })
        .style("color", function(d){
            if (d > 15){
                return "red";
            }
            return "black";
        });
}

function createBarChartFromDataset(){
    d3.select("body")
        .selectAll("div")
        .data(dataset)
        .enter()
        .append("div")
        .attr("class", "bar")
        .style("height", function(d){
            let barHeight = d * 5 //scale by a factor of 5
            return barHeight + "px";
        });
}

function createSVGElementsFromDataset(){
    let w = 1500;
    let h = 500;
    svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    var circle = svg.selectAll("circle")
                    .data(dataset)
                    .enter()
                    .append("circle")
                    .attr("cx", function(d, i){
                        return (i*50) + 25;
                    })
                    .attr("cy", h/2)
                    .attr("r", function(d){
                        return d;
                    })
                    .attr("stroke", "rgba(56, 0, 0, .75)")
                    .attr("stroke-width", function(d){
                        return d/4;
                    })
                    .attr("fill", "teal");

}

function createSVGBarChartFromDataset(){
    let w = 600;
    let h = 200;
    let barPadding = 1;
    svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h)

    //draw rects
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i){
            return i * (w / dataset.length ); //space them out
        })
        .attr("y", function(d){
            return h - (d*5);
        })
        .attr("width", w / dataset.length - barPadding)
        .attr("height", function(d){
            return d * 5;
        })
        .attr("fill", function(d){
            return "rgb(0, 0, " + d * 10 + ")";
        });

    //add labels
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d){
            return d;
        })
        .attr("x", function(d, i){
            return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2; 
        })
        .attr("y", function(d){
            return h - (d*5) + 11;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white")
        .attr("text-anchor", "middle");
}

function createAScatterPlot(){
    let w = 600;
    let h = 200;
    let padding = 30;

    var xScale = d3.scaleLinear()
                .domain([0, d3.max(dataset2, function(d){
                        return d[0];
                    })
                ])
                .range([padding, w-padding*2]);
    
    var yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset2, function(d){
                        return d[1];
                    })
                ])
                .range([h-padding,padding]);

    var svg = d3.select("body")
                .append("svg")
                .attr("height", h)
                .attr("width", w);

    //CHART
    svg.selectAll("circle")
        .data(dataset2)
        .enter()
        .append("circle")
        .attr("cx", function(d){
            return xScale(d[0]);
        })
        .attr("cy", function(d){
            return  yScale(d[1]);
        })
        .attr("r", 5);

    //LABELS
    svg.selectAll("text")
    .data(dataset2)
    .enter()
    .append("text")
    .text(function(d){
        return d[0] + "," + d[1];
    })
    .attr("x", function(d){
        return  xScale(d[0]);
    })
    .attr("y", function(d){
        return  yScale(d[1]);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "red");

    //AXIS
    var xAxis = d3.axisBottom()
                    .scale(xScale)
                    .ticks(5);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h-padding) + ")")
        .call(xAxis);

    var yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(5);
        
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);
}