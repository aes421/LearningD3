var dataset = [ {data: 25}, {data: 15}, {data: 7}, {data: 100}, 
    {data: 5}, {data: 29}, {data: 57}, {data: 43}, {data: 79}, 
    {data: 88}, {data: 11}, {data: 2},  {data: 20}, {data: 60}];

function createBubbleChart(){
    let h = w = 900;
    var svg = d3.select("body")
                .append("svg")
                .attr("height", h)
                .attr("width", w)
                .attr("border", 1);

    var borderPath = svg.append("rect")
                        .attr("x", 0)
                        .attr("y", 0)
                        .attr("height", h)
                        .attr("width", w)
                        .style("stroke", "black")
                        .style("fill", "none")
                        .style("stroke-width", 1);

    var simulation = d3.forceSimulation(dataset)
                        .force("charge", d3.forceManyBody().strength(function(d){
                            return -d.data;
                        }))
                        .force("center", d3.forceCenter(w/2, h/2))
                        .on("tick", ticked);

    var node = svg.append("g")
                    .attr("class", "node")
                    .selectAll("circle")
                    .data(dataset)
                    .enter()
                    .append("circle")
                    .attr("r", function(d){
                        return d.data;
                    })
                    .attr("fill", "blue");

    function ticked(){
        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    }
}