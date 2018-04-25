function createBubbleChart(){
    //d3 json wasn't working so I did my own fetch
    fetch("twitter.json").then(function(response) {
        if (response.ok){ return response.json() }
        throw new Error ("Could not fetch data");
    }).then(function(data){
        let dataset = data.users;
        //add aparent to every user
        dataset.forEach(function(item){
            item.parent = "root";
        });
        //fudge root node
        dataset.push({id_str:"root", followers_count: 0});

        //TODO dynamically determine users
        let padding = 30;
        let h = window.innerHeight - padding;
        let w = window.innerWidth - padding;

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
                    .size([w-padding,h-padding]);

        var root = d3.stratify()
                        .id( function(d){ return d.id_str; })
                        .parentId( function(d){ return d.parent; })
                        (dataset)
                        .sum(function(d){ return d.followers_count });

        pack(root);
        var tip = d3.tip().html(function(d){ return d.r; });
        svg.call(tip);

        var nodes = svg.selectAll("g")
                        .data(root.descendants())
                        .enter().append("g")
                        .attr("id", function(d, i){ return d.id; })
                        .attr("class", "node")
                        .append("circle")
                        .attr("r", function(d) { return d.r; })
                        .attr("cx", function(d) { return d.x; })
                        .attr("cy", function(d) { return d.y; })
                        .attr("fill", "white")
                        .attr("stroke", "black")
                        .attr("stroke-width", "2")
                        .on("mouseover", handleMouseOver(tip))
                        .on("mouseout", handleMouseOut(tip));

        //hide root
        svg.select("circle")
        .attr("stroke", "white")
        .attr("stroke-width", 0)
    });  
}

function handleMouseOver(tip){
    return function(d,i){
        if (d.id === "root"){ return; }
        this.setAttribute("fill", "orange")
        tip.show(d);
    }
}

function handleMouseOut(tip){
    return function(d,i){
        if (d.id === "root"){ return; }
        this.setAttribute("fill", "white")
        tip.hide(d);
    }
}