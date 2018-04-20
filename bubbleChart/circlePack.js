var dataset = [ {data: 1}, {data: 25, parent: 1}, {data: 15, parent: 1}, {data: 7, parent: 1}, {data: 100, parent: 1}, 
    {data: 5, parent: 1}, {data: 29, parent: 1}, {data: 57, parent: 1}, {data: 43, parent: 1}, {data: 79, parent: 1}, 
    {data: 88, parent: 1}, {data: 11, parent: 1}, {data: 2, parent: 1},  {data: 20, parent: 1}, {data: 80, parent: 1}];


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

    var pack = d3.pack()
                .size([w-5,h-5]);

    var root = d3.stratify()
                    .id( function(d){ return d.data; })
                    .parentId( function(d){ return d.parent; })
                    (dataset)
                    .sum(function(d){ return d.data });

    pack(root);

    var node = svg.selectAll("g")
    .data(root.descendants())
    .enter().append("g")
    .attr("transform", function(d) { 
        return "translate(" + d.x + "," + d.y + ")"; })
    .append("circle")
    .attr("r", function(d) { return d.r; })
    .attr("stroke", "blue")
    .attr("stroke-width", "2");
                    
}