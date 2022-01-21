
// set the global dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 300 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

$(window).on('scroll',function() {
  if (checkVisible($('#participants'))) {
    participants()
    $(window).off('scroll');
  } else {
    // do nothing
  }

});

function checkVisible( elm, eval ) {
  eval = eval || "object visible";
  let viewportHeight = $(window).height(), // Viewport Height
      scrolltop = $(window).scrollTop(), // Scroll Top
      y = $(elm).offset().top,
      elementHeight = $(elm).height();

  if (eval == "object visible") return ((y < (viewportHeight + scrolltop)) && (y > (scrolltop - elementHeight)));
  if (eval == "above") return ((y < (viewportHeight + scrolltop)));
}

function participants(){
  const data = [
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
      .attr("width", 300 + margin.left + margin.right)
      .attr("height", 200 + margin.top + margin.bottom)
  const chart = svg.append("g").attr("transform", `translate(40, -10)`);
  var width = +svg.attr("width") - margin.left - margin.right;
  if ( $( window ).width()<380) {
    width = $( window ).width()-100;
  }

  const height = +svg.attr("height") + margin.top - margin.bottom;
  const grp = chart
      .append("g")
      .attr("transform", `translate(-${margin.left},-${margin.top})`);

// Create scales
  const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([750, 2200])
      .nice();


  const xScale = d3
      .scaleLinear()
      .range([0, width])
      .domain(d3.extent(data, dataPoint => dataPoint.year)).nice();

  const line = d3
      .line()
      .x(dataPoint => xScale(dataPoint.year))
      .y(dataPoint => yScale(dataPoint.popularity));

  grp
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .selectAll(".circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class","circle")
      .attr("r", 3.5)
      .attr("cx", function(d) {return xScale(d.year)})
      .attr("cy", function(d) {return yScale(d.popularity)})
      .style("fill", "orange")
      .style("opacity", 0)


// Add path
  const path = grp
      .append("path")
      .attr("transform", `translate(${margin.left},0)`)
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 2)
      .attr("d", line);


  const pathLength = path.node().getTotalLength();
  d3.selectAll(".circle")
      .transition(d3.transition().ease(d3.easeSin).duration(pathLength))
      .style("opacity",0.8)
      .delay(function(d){ return (d.year-2012)*500})


// D3 provides lots of transition options, have a play around here:
// https://github.com/d3/d3-transition
  const transitionPath = d3
      .transition()
      .ease(d3.easeSin)
      .duration(5000);

  path
      .attr("stroke-dashoffset", pathLength)
      .attr("stroke-dasharray", pathLength)
      .transition(transitionPath)
      .attr("stroke-dashoffset", 0)

// Add the X Axis
  chart
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(function(d){ return d+'년'}));
// Add the Y Axis
  chart
      .append("g")
      .attr("transform", `translate(0, 0)`)
      .call(d3.axisLeft(yScale).tickFormat(function (d){return d+ "명"}));


}

gender_age()
function gender_age(){
  var exampleData = [{ age: '23세 이하', male: 25, female: 15 }, { age: '24-26세', male: 349, female: 224 }, { age: '27-29세', male: 546, female: 153 }, { age: '30-32세', male: 172, female: 54 }, { age: '33-35세', male: 48, female: 13 }, {age: '36-38세', male: 19, female: 2 }, { age: '39세 이상', male: 16, female: 3}, ];

  var options = {
    height: 400,
    width: 410,
    style: {
      leftBarColor: "#00C4AA",
      rightBarColor: "#8601F9"
    }
  }
  pyramidBuilder(exampleData, '#pyramid', options);

}

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
  var width = 350,
      height = 400;
// append the svg object to the body of the page
  const svg = d3.select("#salaryChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(25,${margin.top})`);

// get the data
  d3.csv("salary.csv").then( function(data) {

    // X axis: scale and draw:
    const x = d3.scaleLinear()
        .domain([1,500])
        .range([ 0, width ]);
    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([ height, 0 ]);

    svg.append("g")
        .attr("transform", `translate(0, 0)`)
        .call(d3.axisLeft(y));


    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));




    // Bars
    svg.selectAll("bar")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.salary))
        .attr("y", d => y(d.index))
        .attr("width", 30)
        .attr("height", d => height - y(d.index))
        .style("fill", function (d){
          return "#00C4AA"
        })
        .style("opacity",0.5)
    svg.selectAll("bar")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.salary))
        .attr("y", d => y(d.index))
        .attr("width", 30)
        .attr("height", d => height - y(d.index))
        .style("fill", function (d){
          if(d.salary==closest){
            return "#8601F9"
          }
          else {
            return "transparent"
          }
        })
        .style("opacity", 0.5)


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
        "name": "행복도",
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
  var width = 300,
      height = 300;
  var svg = d3.select("#happy").append("svg")
      .attr("width", width + margin.right + margin.left+100)
      .attr("height", height + margin.top + margin.bottom+300)
      .append("g")
      .attr("transform", "translate("
          + (margin.left-15) + "," + margin.top + ")");

  var i = 0,
      duration = 750,
      root;

// declares a tree layout and assigns the size
  var treemap = d3.tree().size([height*2, width*2]);

// Assigns parent, children, height, depth
  root = d3.hierarchy(treeData, function(d) { return d.children; });
  root.x0 = height;
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
  svg.append("circle").attr("cx",-20).attr("cy",0).attr("r", 6).style("fill", "#91C483").style("stroke-width",1.5).style("stroke",'#777777')
  svg.append("circle").attr("cx",-20).attr("cy",15).attr("r", 6).style("fill", "#EEEEEE").style("stroke-width",1.5).style("stroke",'#777777')
  svg.append("circle").attr("cx",-20).attr("cy",30).attr("r", 6).style("fill", "#FF6464").style("stroke-width",1.5).style("stroke",'#777777')
  svg.append("circle").attr("cx",-20).attr("cy",45).attr("r", 6).style("fill", "#FFE162").style("stroke-width",1.5).style("stroke",'#777777')
  svg.append("text").attr("x", 0).attr("y", 0).text("유의(+)").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 0).attr("y", 15).text("무의").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 0).attr("y", 30).text("유의(-)").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 0).attr("y", 45).text("클릭").style("font-size", "15px").attr("alignment-baseline","middle")


  function update(source) {

    // Assigns the x and y position for the nodes
    var treeData = treemap(root);

    // Compute the new tree layout.
    var nodes = treeData.descendants(),
        links = treeData.descendants().slice(1);

    // Normalize for fixed-depth.
    nodes.forEach(function(d){ d.y = d.depth * 90});

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
            return d._children ? "#FFE162" : "#fff";
          }
          else{

            if(d.effect==1){
              //green
              return "#91C483"
            }
            else if(d.effect==0){
              return "#EEEEEE"
            }
            else {
              //red
              return "#FF6464"
            }
          }
        });

    // Add labels for the nodes
    var textNode = nodeEnter.append('text');
    textNode.attr("dy", function(d) {
      return d.children || d._children ? "0.35em" : "1.5em";
    })
        .attr("x", function(d) {
          return d.children || d._children ? -13 : -30;
        })
        .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
        })
        .text(function(d) { return d.data.name; })
    // textNode.append("span").text(function(d) { return d.data.name; })

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
            return d._children ? "#FFE162" : "#fff";
          }
          else{
            if(d.data.effect==1){

              return "#91C483"
            }
            else if(d.data.effect==0){
              return "#EEEEEE"
            }
            else {
              return "#FF6464"
            }
          }
        })
        .attr('cursor', 'pointer');


    // Remove any exiting nodes
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function() {
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
        .attr('d', function(){
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
        .attr('d', function( ) {
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



career();
function career() {
  // create the svg area


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

  const colors = ["#51addf", "#c582aa", "#005b9d", "#35a993", "#cc373c", "#f7d783", "#F47340"];

  const names = ["[비연구직] 공공 기관", "[비연구직] 대학", "[비연구직] 민간 기업", "[연구직] 공공 기관", "[연구직] 대학", "[연구직] 민간 기업", "프리랜서 또는 창업",]

  const res = d3.chord()
      .padAngle(0.1)
      .sortSubgroups(d3.descending)
      (matrix)

  var WW = $(window).width()
  var outerRadius
  if (480>WW) {
    outerRadius = 125
  }
  else{
    outerRadius = 140
  }


  var innerRadius = outerRadius + 20;
  const svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", 400)
      .attr("height", 400)
      .style("display","block")
      // .style("margin","auto")
      .append("g")
      .attr("transform", "translate("+(innerRadius+margin.left-20)+","+(innerRadius+margin.top+20)+")")


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
      .attr("transform", function(d) { return `rotate(${(d.startAngle + d.endAngle)/2 * 180 / Math.PI - 90}) translate(`+(innerRadius)+`,0)`})
      .append("text")
      .style("font-size",10)
      .attr("font-weight", 700)
  // .text(d=>names[d.index])


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
      .data(d => groupTicks(d, 50))
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

  function getGradID(d){ return "linkGrad-" + d.source.index + "-" + d.target.index; }
  var color = d3.scaleOrdinal()
      .domain(d3.range(6))
      .range(colors)
  var grads = svg.append("defs")
      .selectAll("linearGradient")
      .data(res)
      .enter()
      .append("linearGradient")
      .attr("id", getGradID)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", function(d,){ return innerRadius * Math.cos((d.source.endAngle-d.source.startAngle) / 2 + d.source.startAngle - Math.PI/2); })
      .attr("y1", function(d, ){ return innerRadius * Math.sin((d.source.endAngle-d.source.startAngle) / 2 + d.source.startAngle - Math.PI/2); })
      .attr("x2", function(d,){ return innerRadius * Math.cos((d.target.endAngle-d.target.startAngle) / 2 + d.target.startAngle - Math.PI/2); })
      .attr("y2", function(d,){ return innerRadius * Math.sin((d.target.endAngle-d.target.startAngle) / 2 + d.target.startAngle - Math.PI/2); })

  // set the starting color (at 0%)

  grads.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", function(d){ return color(d.source.index)})

  //set the ending color (at 100%)
  grads.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", function(d){ return color(d.target.index)})

  svg.select("g")
      .selectAll("path")
      .data(res)
      .enter()
      .append("path")
      .attr("class", function(d) {
        return "chord chord-" + d.source.index + " chord-" + d.target.index // The first chord allows us to select all of them. The second chord allows us to select each individual one.
      })
      .style("fill", function(d){ return "url(#" + getGradID(d) + ")"; })
      .attr("d", d3.ribbon().radius(innerRadius))
  // .style("stroke", function(d){ return d3.rgb(color(d.target.index)).darker(); })


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
      .attr("class", "center")
      .style("float","none")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("width","100%")

  const showTooltip = function(event, d) {
    const si = d.toElement.__data__.source.index
    const sv = d.toElement.__data__.source.value
    const ti = d.toElement.__data__.target.index
    const tv = d.toElement.__data__.target.value
    tooltip
        .style("opacity", 1)
        .html("입학 시점 <strong>"+names[si]+"</strong>을 희망하였으나 현재는 <strong>"+names[ti]+"</strong>을 희망하는 학우는 <strong>"+sv+"</strong>명이고,<br>"
            +"입학 시점 <strong>"+names[ti]+"</strong>을 희망하였으나 현재는 <strong>"+names[si]+"</strong>을 희망하는 학우는 <strong>"+tv+"</strong>명입니다.")
        .style("left", (event.x)/2+400 + "px")
        .style("top", (event.y)/2+500 + "px")
  }


  svg
      .datum(res)
      .append("g")
      .selectAll("path")
      .data(d=>d)
      .join("path")
      .attr("d", d3.ribbon().radius(innerRadius))
      .style("fill", d=> colors[d.source.index])
      .style("stroke", "black")
      .style("opacity", 0.1)
      .on("mouseover", function(d){
        d3.select(this)
            .style('opacity',1)
        showTooltip('mouseover',d)
      })
      .on("mouseout", function(){
        d3.select(this)
            .style('opacity',0.1)
        // tooltip.transition(1000)
        //     .style("opacity",0)
      })


}