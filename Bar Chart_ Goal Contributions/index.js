var plotscale = 750
var margin = {top: plotscale * (14.86/960), 
              right: plotscale * (20/960), 
              bottom: plotscale * (24/960) + 60, 
              left: plotscale * (40/960) + 30},
    width = plotscale - margin.left - margin.right,
    height = plotscale * (68/105) - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg2 = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("https://gist.githubusercontent.com/Simon6HH/c15473ea2662122df2eceb7a60d57dd3/raw/7cc8a14ce1406f1456423b3e568eb859fbedc2c5/data.csv", function(data) {

    // X axis
  var x2 = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d.Name; }))
    .padding(0.2);
  svg2.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x2))
    .selectAll("text")
  		.attr('fill', 'black')
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Add Y axis
  var y2 = d3.scaleLinear()
    .domain([0, 1200])
    .range([ height, 0]);
  svg2.append("g")
    .call(d3.axisLeft(y2));

  svg2.append("text")
    .attr('y', -40)
    .attr('x', -300)
    .attr('fill', 'black')
    .attr('transform', 'rotate(270 0 0)')
    .text('Total Career Goals and Assists');

  // Bars
  svg2.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x2(d.Name); })
      .attr("width", x2.bandwidth())
  		// .attr("fill", function(d) {
  		// if (d = 41) {
  		// return "red";
  		// } else if (d != 41) {
  		// return "green";
  		// }
  		// return "green";
  		// })
      //.attr("fill", "#69b3a2")
  		.attr("fill", "green")
      // no bar at the beginning thus:
      .attr("height", function(d) { return height - y2(0); }) // always equal to 0
      .attr("y", function(d) { return y2(0); })

  // Animation
  svg2.selectAll("rect")
    .transition()
    .duration(800)
    .attr("y", function(d) { return y2(d.GoalsNAssists); })
    .attr("height", function(d) { return height - y2(d.GoalsNAssists); })
    .delay(function(d,i){console.log(i) ; return(i*100)})
  
  // FOOTBALL FIELD CODE BELOW THIS
  
  var x = d3.scale.linear()
    .domain([0, 100])
    .range([0, width]);

  var y = d3.scale.linear()
    .domain([0, 100])
    .range([height, 0]);

  svg2.append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("class", "mesh")
    .attr("width", width)
    .attr("height", height);

  ///////////////////////
  // add lines 

  // field outline    
    svg2.append("rect")
       .attr("id","outline")
       .attr("x", 0)
       .attr("y", 0)
       .attr("width", width)
       .attr("height", height)
       .attr("fill", "none")
       .attr("stroke", "black")
       .style("stroke-width", 0.5);
  // right penalty area 
    svg2.append("rect")
       .attr("id","six")
       .attr("x", x(83))
       .attr("y", y(78.9))
       .attr("width", x(100) - x(83))
       .attr("height", y(21.1) - y(78.9))
       .attr("fill", "none")
       .attr("stroke", "black")
  		 .style("stroke-width", 0.5);
  // right six yard box
    svg2.append("rect")
      .attr("id","penarea")
      .attr("x", x(94.2))
      .attr("y", y(63.2))
      .attr("width", x(100) - x(94.2))
      .attr("height", y(36.8) - y(63.2))
      .attr("fill", "none")
      .attr("stroke", "black")
  		.style("stroke-width", 0.5);
  // right goal
    svg2.append("rect")
      .attr("id","penarea")
      .attr("x", x(100))
      .attr("y", y(54.8))
      .attr("width", margin.right)
      .attr("height", y(45.2) - y(54.8))
      .attr("fill", "none")
      .attr("stroke", "black")
  		.style("stroke-width", 0.5);

  // left penalty area 
    svg2.append("rect")
       .attr("id","six")
       .attr("x", x(0))
       .attr("y", y(78.9))
       .attr("width", x(100) - x(83))
       .attr("height", y(21.1) - y(78.9))
       .attr("fill", "none")
       .attr("stroke", "black")
  		 .style("stroke-width", 0.5);
  // six yard box
    svg2.append("rect")
      .attr("id","penarea")
      .attr("x", x(0))
      .attr("y", y(63.2))
      .attr("width", x(100) - x(94.2))
      .attr("height", y(36.8) - y(63.2))
      .attr("fill", "none")
      .attr("stroke", "black")
  		.style("stroke-width", 0.5);

  // 50 yd line
     svg2.append("line")
      .attr("id","half")
      .attr("x1", x(50))
      .attr("x2", x(50))
      .attr("y1", y(0))
      .attr("y2", y(100))
      .attr("stroke", "black")
  		.style("stroke-width", 0.5);

  // center circle
    svg2.append("circle")
       .attr("cx", x(50))
       .attr("cy", y(50))
       .attr("r", x(10))
       .attr("fill", "none")
       .attr("stroke", "black")
  		 .style("stroke-width", 0.5);
})