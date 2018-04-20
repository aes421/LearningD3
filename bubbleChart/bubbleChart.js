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

    var weight = d3.scaleLinear()
                        .domain([0,d3.max(dataset, function(d){
                            return d.data;
                        //anything lower than 15 is too small
                        //Math.sqrt((w*h)/(dataset.length * Math.PI))
                        })]).range([15,100]);

    var simulation = d3.forceSimulation(dataset)
                        .force("collision", d3.forceCollide(function(d){
                            return weight(d.data);
                        }))
                        .force("center", d3.forceCenter(w/2, h/2))
                        .force("attraction", d3.forceManyBody().strength(100))
                        .on("tick", ticked);

    var node = svg.append("g")
                    .attr("class", "node")
                    .selectAll("circle")
                    .data(dataset)
                    .enter()
                    .append("circle")
                    .attr("r", function(d){
                        return weight(d.data);
                    })
                    .attr("fill", "blue")
                    .attr("stroke", "white")
                    .attr("stroke-width", "1")
                    .call(d3.drag()
                            .on("start", dragstarted)
                            .on("drag", dragged)
                            .on("end", dragended));

    function ticked(){
        node.attr("cx", function(d) { return d.x = Math.max(weight(d.data), Math.min(w - weight(d.data), d.x)); })
        .attr("cy", function(d) { return d.y = Math.max(weight(d.data), Math.min(h - weight(d.data), d.y)); });
    }

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    
    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }
    
    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    } 
}