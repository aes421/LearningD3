var dataset = [ {data: 25}, {data: 15}, {data: 7}, {data: 100}, 
    {data: 5}, {data: 29}, {data: 57}, {data: 43}, {data: 79}, 
    {data: 88}, {data: 11}, {data: 2},  {data: 20}, {data: 60}];

function createBubbleChart(){
    let h = w = 960;
    var svg = d3.select("body")
                .append("svg")
                .attr("height", h)
                .attr("width", w);

    var simulation = d3.forceSimulation()
                        .velocityDecay(0.2)
                        .force("charge", d3.forceManyBody().strength(-20))
                        .force('x', d3.forceX().strength(0.3).x(w/2))
                        .force('y', d3.forceY().strength(0.3).y(h/2))
                        .on("tick", ticked);

    var nodes = svg.selectAll(".node")
                    .data(dataset)
                    .enter()
                    .append("circle")
                    .attr("r", function(d){
                        return d.data;
                    })
                    .attr("fill", "blue");

    simulation.nodes(nodes);

    function ticked() {
        nodes
          .attr('cx', function (d) { return d.x; })
          .attr('cy', function (d) { return d.y; });
      }
}