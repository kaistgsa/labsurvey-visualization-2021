// set the global dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 60},
  width = 300 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

// salary visualization
$("#cl").click(function () {
  $('#salaryChart').empty();
  salary()
})

function salary(){
    var salary = $('#salaryInput').val()
  var res =  [0, 0, 0, 0, 0, 0, 1, 22, 30, 43, 53, 69, 72, 80, 85, 89, 90, 91, 94, 98, 100, 100, 100, 102, 106, 109, 110, 113, 115, 117, 120, 120, 120, 124, 126, 127, 130, 130, 132, 135, 136, 138, 140, 140, 143, 145, 145, 147, 150, 150, 150, 153, 155, 159, 160, 160, 162, 164, 164, 165, 169, 170, 173, 176, 178, 180, 180, 180, 185, 186, 190, 190, 191, 195, 200, 200, 200, 205, 209, 210, 215, 220, 222, 225, 228, 230, 235, 240, 245, 250, 251, 260, 269, 273, 285, 300, 314, 322, 360, 431,]

  const closest = res.reduce((a, b) => {
    return Math.abs(b - salary) < Math.abs(a - salary) ? b : a;
  });
  var n = 100-res.indexOf(closest)
// append the svg object to the body of the page
  const svg = d3.select("#salaryChart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// get the data
  d3.csv("salary.csv").then( function(data) {

    // X axis: scale and draw:
    const x = d3.scaleLinear()
      .domain([1,500])
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Bars
    svg.selectAll("bar")
      .data(data)
      .join("rect")
      .attr("x", d => x(d.salary))
      .attr("y", d => y(d.index))
      .attr("width", 30)
      .attr("height", d => height - y(d.index))
      .style("fill", function (d){
        if(d.salary==closest){
          return "orange"
        }
        else {
          return "#69b3a2"
        }
      })





    // append the bar rectangles to the svg element
    // svg.selectAll("rect")
    //   .data(data)
    //   .join("rect")
    //   .attr("x", 1)
    //   .attr("transform", function(d) { return `translate(${x(d.x0)}, ${y(d.length)})`})
    //   .attr("width", function(d) { return x(d.x1) - x(d.x0)-1})
    //   .attr("height", function(d) { return height - y(d.length); })
    //   .style("fill", function(d){ if(d.x0 < 100-n){return "orange"} else {return "#69b3a2"}})

    // Append a vertical line to highlight the separation
    svg
      .append("line")
      .attr("x1", 0 )
      .attr("x2", x(closest))
      .attr("y1", y(100-n))
      .attr("y2",y(100-n))
      .attr("stroke", "black")
      .attr("stroke-dasharray", "3")
      .attr("stroke-width","2")
    svg
      .append("text")
      .attr("x", x(closest))
      .attr("y", y(100-n))
      .text((n)+"번째")
      .style("font-size", "15px")
      .style("fill","red")

  });
}



happiness();


function happiness(){
  var treeData =
    {
      "name": "대학원 생활 행복도",
      "children": [
        {
          "name": "연구 지도",
          "children": [
            { "name": "학위 지도를 위한 지도 교수의 시간 할애", "effect":1  },
            { "name": "학위 연구에 대한 지도 교수의 이해도", "effect":0  },
            { "name": "학위 연구 방향에 대한 의견 존중", "effect":1 },
            { "name": "학계 트렌드에 대한 정보", "effect":0 }
          ]
        },
        { "name": "진로 지도",
          "children": [
            { "name": "졸업 후 진로에 대한 지도 교수의 적절한 조언", "effect":1  },
            { "name": "진로 방향에 대한 나의 의사 존중", "effect":1  },
          ]
        },
        { "name": "지도 방식",
          "children": [
            { "name": "연구 윤리 부족", "effect":0  },
            { "name": "연구실 실적에 필요 이상으로 집착", "effect":-1  },
            { "name": "연구실 실적에 필요 이하로 무관심", "effect":0  },
            { "name": "차별적인 지도", "effect":-1  },
          ]
        },
        { "name": "연구실 체류 시간",
          "children": [
            { "name": "주중(월~금) 체류 시간", "effect":0  },
            { "name": "주말(토~일) 및 공휴일 체류 시간", "effect":-1  },
          ]
        },
        { "name":"연구실 환경",
          "children": [
            { "name": "잘 갖춰진 실험 장비", "effect":0  },
            { "name": "잘 갖춰진 사무용 전자 기기", "effect":1  },
            { "name": "잘 갖춰진 사무 기구", "effect":0  },
            { "name": "개인 활용 공간", "effect":-1  },
          ]
        },
        { "name": "연구실 조직 문화",
          "children": [
            { "name": "지나친 관심", "effect":0 },
            { "name": "지나친 무관심", "effect":-1  },
            { "name": "사적인 업무 동원", "effect":0  },
            { "name": "일과 후 업무 연락", "effect":-1  },
            { "name": "잦은 회식 등 친목 행사", "effect":1  },
            { "name": "수직적 자세/태도", "effect":-1  },
          ]
        },

      ]
    };

  var svg = d3.select("#happy").append("svg")
    .attr("width", width + margin.right + margin.left+400)
    .attr("height", height + margin.top + margin.bottom+400)
    .append("g")
    .attr("transform", "translate("
      + (margin.left+50) + "," + margin.top + ")");

  var i = 0,
    duration = 750,
    root;

// declares a tree layout and assigns the size
  var treemap = d3.tree().size([height*2, width]);

// Assigns parent, children, height, depth
  root = d3.hierarchy(treeData, function(d) { return d.children; });
  root.x0 = height/2;
  root.y0 = 0;

// Collapse after the second level
  root.children.forEach(collapse);

  update(root);

// Collapse the node and all it's children
  function collapse(d) {
    if(d.children) {
      d._children = d.children
      d._children.forEach(collapse)
      d.children = null
    }
  }
  svg.append("circle").attr("cx",-20).attr("cy",0).attr("r", 6).style("fill", "#69b3a2")
  svg.append("circle").attr("cx",-20).attr("cy",15).attr("r", 6).style("fill", "#404080")
  svg.append("circle").attr("cx",-20).attr("cy",30).attr("r", 6).style("fill", "#404080")
  svg.append("text").attr("x", 0).attr("y", 0).text("variable A").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 0).attr("y", 15).text("variable A").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 0).attr("y", 30).text("variable B").style("font-size", "15px").attr("alignment-baseline","middle")


  function update(source) {

    // Assigns the x and y position for the nodes
    var treeData = treemap(root);

    // Compute the new tree layout.
    var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

    // Normalize for fixed-depth.
    nodes.forEach(function(d){ d.y = d.depth * 120});

    // ****************** Nodes section ***************************

    // Update the nodes...
    var node = svg.selectAll('g.node')
      .data(nodes, function(d) {return d.id || (d.id = ++i); });

    // Enter any new modes at the parent's previous position.
    var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
      })
      .on('click', click);

    // Add Circle for the nodes
    nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style("fill", function(d) {
        if(d.effect===undefined){
          return d._children ? "lightsteelblue" : "#fff";

        }
        else{

          if(d.effect==1){
            return "green"
          }
          else if(d.effect==0){
            return "grey"
          }
          else {
            return "red"
          }
        }
      });

    // Add labels for the nodes
    nodeEnter.append('text')
      .attr("dy", ".35em")
      .attr("x", function(d) {
        return d.children || d._children ? -13 : 13;
      })
      .attr("text-anchor", function(d) {
        return d.children || d._children ? "end" : "start";
      })
      .text(function(d) { return d.data.name; })

    // UPDATE
    var nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position for the node
    nodeUpdate.transition()
      .duration(duration)
      .attr("transform", function(d) {
        return "translate(" + d.y + "," + d.x+ ")";
      });

    // Update the node attributes and style
    nodeUpdate.select('circle.node')
      .attr('r',8)
      .style("fill", function(d) {
        if(d.data.effect===undefined){
          return d._children ? "lightsteelblue" : "#fff";
        }
        else{
          if(d.data.effect==1){

            return "green"
          }
          else if(d.data.effect==0){
            return "grey"
          }
          else {
            return "red"
          }
        }
      })
      .attr('cursor', 'pointer');


    // Remove any exiting nodes
    var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) {
        return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

    // On exit reduce the node circles size to 0
    nodeExit.select('circle')
      .attr('r', 1e-6);

    // On exit reduce the opacity of text labels
    nodeExit.select('text')
      .style('fill-opacity', 1e-6);

    // ****************** links section ***************************
    // Update the links...
    var link = svg.selectAll('path.link')
      .data(links, function(d) { return d.id; });

    // Enter any new links at the parent's previous position.
    var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      });

    // UPDATE
    var linkUpdate = linkEnter.merge(link);

    // Transition back to the parent element position
    linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

    // Remove any exiting links
    var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();

    // Store the old positions for transition.
    nodes.forEach(function(d){
      d.x0 = d.x;
      d.y0 = d.y;
    });

    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s, d) {

      path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

      return path
    }

    // Toggle children on click.
    function click(event, d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }
  }
}



cloud();
function cloud(){
  var myWords = [{word: "Running", size: "10"}, {word: "Surfing", size: "20"}, {word: "Climbing", size: "50"}, {word: "Kiting", size: "30"}, {word: "Sailing", size: "20"}, {word: "Snowboarding", size: "60"} ]

// append the svg object to the body of the page
  var svg = d3.select("#cloud").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

// Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
// Wordcloud features that are different from one word to the other must be here
  var layout = d3.layout.cloud()
    .size([width, height])
    .words(myWords.map(function(d) { return {text: d.word, size:d.size}; }))
    .padding(5)        //space between words
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .fontSize(function(d) { return d.size; })      // font size of words
    .on("end", draw);
  layout.start();

// This function takes the output of 'layout' above and draw the words
// Wordcloud features that are THE SAME from one word to the other can be here
  function draw(words) {
    svg
      .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
      .data(words)
      .enter().append("text")
      .style("font-size", function(d) { return d.size; })
      .style("fill", "#69b3a2")
      .attr("text-anchor", "middle")
      .style("font-family", "Impact")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });
  }
}

// $("#participants").scroll( function(){
//   console.log(event)
//   participants();
// });
participants()
function participants(){
  var data = [
    {
      year: 2012,
      popularity: 770
    },
    {
      year: 2013,
      popularity: 1337
    },
    {
      year: 2014,
      popularity: 1155
    },
    {
      year: 2015,
      popularity: 1622
    },
    {
      year: 2016,
      popularity: 1474
    },
    {
      year: 2017,
      popularity: 1913,
    },
    {
      year: 2018,
      popularity: 1216,
    },
    {
      year: 2019,
      popularity: 1231,
    },
    {
      year: 2020,
      popularity: 2002,
    },
    {
      year: 2021,
      popularity: 1648,
    }

  ];

// Create SVG and padding for the chart

  const svg = d3
    .select("#participants")
    .append("svg")
    .attr("height", 200)
    .attr("width", 400);
  const margin = { top: 0, bottom: 20, left: 40, right: 20 };
  const chart = svg.append("g").attr("transform", `translate(${margin.left},0)`);
  const width = +svg.attr("width") - margin.left - margin.right;
  const height = +svg.attr("height") + margin.top - margin.bottom;
  const grp = chart
    .append("g")
    .attr("transform", `translate(-${margin.left},-${margin.top})`);

// Create scales
  const yScale = d3
    .scaleLinear()
    .range([height, 0])
    .domain([750, d3.max(data, dataPoint => dataPoint.popularity)]).nice();


  const xScale = d3
    .scaleLinear()
    .range([0, width])
    .domain(d3.extent(data, dataPoint => dataPoint.year)).nice();

  const line = d3
    .line()
    .x(dataPoint => xScale(dataPoint.year))
    .y(dataPoint => yScale(dataPoint.popularity));

// Add path
  const path = grp
    .append("path")
    .attr("transform", `translate(${margin.left},0)`)
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 3)
    .attr("d", line);


  // const selectCircle = svg.selectAll(".circle")
  //   .data(data)
  // selectCircle.enter().append("circle").transition().ease(d3.easeSin)
  //   .duration(2500)
  //   .attr("transform", `translate(${margin.left},0)`)
  //   .attr("class", "circle")
  //   .attr("r", 5)
  //   .attr("cx", function(d) {
  //     return xScale(d.year)
  //   })
  //   .attr("cy", function(d) {
  //     return yScale(d.popularity)
  //   })



  const pathLength = path.node().getTotalLength();
// D3 provides lots of transition options, have a play around here:
// https://github.com/d3/d3-transition
  const transitionPath = d3
    .transition()
    .ease(d3.easeSin)
    .duration(2500);

  path
    .attr("stroke-dashoffset", pathLength)
    .attr("stroke-dasharray", pathLength)
    .transition(transitionPath)
    .attr("stroke-dashoffset", 0);


// Add the X Axis
  chart
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale).tickFormat(d3.format("")));
// Add the Y Axis
  chart
    .append("g")
    .attr("transform", `translate(0, 0)`)
    .call(d3.axisLeft(yScale));
}







married();
function married(){

// Read data
  const svg = d3.select("#married")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      `translate(${margin.left}, ${margin.top})`);

// Read data
  d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_hierarchy_1level.csv').then(function(data) {

    // stratify the data: reformatting for d3.js
    const root = d3.stratify()
      .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
      .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
      (data);
    root.sum(function(d) { return +d.value })   // Compute the numeric value for each entity

    // Then d3.treemap computes the position of each element of the hierarchy
    // The coordinates are added to the root object above
    d3.treemap()
      .size([width, height])
      .padding(4)
      (root)

    // use this information to add rectangles:
    svg
      .selectAll("rect")
      .data(root.leaves())
      .join("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      // .style("stroke", "black")
      .style("fill", "#69b3a2");

    // and to add the text labels
    svg
      .selectAll("text")
      .data(root.leaves())
      .join("text")
      .attr("x", function(d){ return d.x0+10})    // +10 to adjust position (more right)
      .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
      .text(function(d){ return d.data.name})
      .attr("font-size", "15px")
      .attr("fill", "white")
  })
}

gender_age()
function gender_age(){
  var exampleData = [{ age: '23 이하', male: 25, female: 15 }, { age: '24-26', male: 349, female: 224 }, { age: '27-29', male: 546, female: 153 }, { age: '30-32', male: 172, female: 54 }, { age: '33-35', male: 48, female: 13 }, {age: '36-38', male: 19, female: 2 }, { age: '39 이상', male: 16, female: 3}, ];

  var options = {
    height: 300,
    width: 400,
    style: {
      leftBarColor: "#00C4AA",
      rightBarColor: "#8601F9"
    }
  }
  pyramidBuilder(exampleData, '#pyramid', options);


}
career();
function career() {
  // create the svg area
  const svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", 800)
      .attr("height", 800)
      .append("g")
      .attr("transform", "translate(260,260)")

// create a matrix
  const matrix = [
    [50, 4, 32, 53, 22, 34, 10, ],
    [3, 18, 4, 14, 24, 16, 4, ],
    [35, 8, 171, 94, 84, 149, 64, ],
    [75, 25, 152, 896, 555, 827, 114, ],
    [53, 25, 137, 745, 750, 785, 158, ],
    [54, 16, 171, 708, 483, 993, 159, ],
    [6, 4, 44, 53, 76, 104, 135, ],
  ];

  const colors = [ "#440154ff", "#31668dff", "#37b578ff", "#fde725ff","orange","yellow","green"];

  const names = ["[비연구직] 공공기관", "[비연구직] 대학", "[비연구직] 민간기업", "[연구직] 공공기관", "[연구직] 대학", "[연구직] 민간기업", "프리랜서 또는 창업",]

  const res = d3.chord()
      .padAngle(0.1)
      .sortSubgroups(d3.descending)
      (matrix)

  var outerRadius = 180,
      innerRadius = outerRadius + 20;

  const group = svg
      .datum(res)
      .append("g")
      .selectAll("g")
      .data(function(d) { return d.groups; })
      .enter()

  group.append("g")
      .append("path")
      .style("fill", "grey")
      .style("stroke", "black")
      .attr("d", d3.arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius)
      )

  group.append("g")
      .attr("transform", function(d) { return `rotate(${(d.startAngle + d.endAngle)/2 * 180 / Math.PI - 90}) translate(`+(innerRadius+30)+`,0)`})
      .append("text")
      .style("font-size",10)
      .attr("font-weight", 700)
      .text(d=>names[d.index])


// Add the ticks
  group
      .selectAll(".group-tick")
      .data(d => groupTicks(d, 100))    // Controls the number of ticks: one tick each 25 here.
      .join("g")
      .attr("transform", d => `rotate(${d.angle * 180 / Math.PI - 90}) translate(`+innerRadius+`,0)`)
      .append("line")               // By default, x1 = y1 = y2 = 0, so no need to specify it.
      .attr("x2", 6)
      .attr("stroke", "black")


// Add the labels of a few ticks:
  group
      .selectAll(".group-tick-label")
      .data(d => groupTicks(d, 100))
      .enter()
      .filter(d => d.value % 100 === 0)
      .append("g")
      .attr("transform", d => `rotate(${d.angle * 180 / Math.PI - 90}) translate(`+innerRadius+`,0)`)
      .append("text")
      .attr("x", 8)
      .attr("dy", ".35em")
      .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180) translate(-16)" : null; })
      .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
      .text(d => d.value)
      .style("font-size", 9)





  // Returns an array of tick angles and values for a given group and step.
  function groupTicks(d, step) {
    const k = (d.endAngle - d.startAngle) / d.value;
    return d3.range(0, d.value, step).map(function(value) {
      return {value: value, angle: value * k + d.startAngle};
    });
  }

  svg
      .datum(res)
      .append("g")
      .selectAll("g")
      .data(function(d){return d.groups;})
      .join("g")
      .append("path")
      .style("fill", (d,i) => colors[i])
      .style("stroke","black")
      .attr("d", d3.arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius))

  const tooltip = d3.select("#my_dataviz")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px")

  const showTooltip = function(event, d) {
    const si = d.toElement.__data__.source.index
    const ti = d.toElement.__data__.target.index
    tooltip
        .style("opacity", 1)
        .html("Source: " + names[si] + "<br>Target: " + names[ti])
        .style("left", (event.x)/2+300 + "px")
        .style("top", (event.y)/2+500 + "px")
  }

// A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
  var hideTooltip = function(event, d) {
    tooltip
        .transition()
        //.duration(1000)
        .style("opacity", 0)
  }
  svg
      .datum(res)
      .append("g")
      .selectAll("path")
      .data(d=>d)
      .join("path")
      .attr("d", d3.ribbon().radius(200))
      .style("fill", d=> colors[d.source.index])
      .style("stroke", "black")
      .style("opacity", 0.1)
      .on("mouseover", function(d){
        d3.select(this)
            .style('opacity',1)
        showTooltip('mouseover',d)
      })
      .on("mouseout", function(d){
        d3.select(this)
            .style('opacity',0.1)
      })


}