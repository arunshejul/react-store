import React from "react";
import * as d3 from "d3";

class Bar extends React.Component {
  constructor() {
    super();
    this.state = {
      csvData: [],
    };
  }
  componentDidMount() {
    this.initData();
  }

  componentDidUpdate() {
    this.barTransition();
  }

  initData() {
    d3.csv("./exercise_sheet.csv").then((rows) => {
      console.log("Total " + rows.length);
      var expensesByName = d3
        .nest()
        .key(function (d) {
          return d.Date.split("/")[2];
        })
        .key(function (d) {
          return d.Sentiment;
        })
        .rollup(function (v) {
          return {
            count: v.length,
            total: d3.sum(v, function (d) {
              return d.Mentions;
            }),
            avg: d3.mean(v, function (d) {
              return d.Mentions;
            }),
          };
        })
        .entries(rows);
      console.log("barTransition>>>>>>>>>>>");
      console.log(expensesByName);

      console.log("setState >>>>>>>>>>>>");
      this.setState({
        csvData: expensesByName,
      });
    });
  }

  barTransition() {
    const { csvData } = this.state;
    var margin = { top: 10, right: 30, bottom: 20, left: 50 };
    // set the dimensions and margins of the graph
    var width = 460 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;
    var data = [];

    var groups = d3
      .map(csvData, function (d) {
        data.push({
          name: d.key,
          Positive: d.values[0].value.avg,
          Neutral: d.values[1].value.avg,
          Negative: d.values[2].value.avg,
        });
        return d.key;
      })
      .keys()
      .sort();
    data = data.sort(function (a, b) {
      return a.name - b.name;
    });

    var subgroups = ["Positive", "Neutral", "Negative"];

    // append the svg object to the body of the page
    var svg = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    var x = d3.scaleBand().domain(groups).range([0, width]).padding([0.2]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(0));

    // Add Y axis
    var y = d3.scaleLinear().domain([0, 40]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Another scale for subgroup position?
    var xSubgroup = d3
      .scaleBand()
      .domain(subgroups)
      .range([0, x.bandwidth()])
      .padding([0.05]);

    // color palette = one color per subgroup
    var color = d3
      .scaleOrdinal()
      .domain(subgroups)
      .range(["green", "purple", "red"]);

    // Show the bars
    svg
      .append("g")
      .selectAll("g")
      // Enter in data = loop group per group
      .data(data)
      .enter()
      .append("g")
      .attr("transform", function (d) {
        return "translate(" + x(d.name) + ",0)";
      })
      .selectAll("rect")
      .data(function (d) {
        return subgroups.map(function (key) {
          return { key: key, value: d[key] };
        });
      })
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return xSubgroup(d.key);
      })
      .attr("y", function (d) {
        return y(d.value);
      })
      .attr("width", xSubgroup.bandwidth())
      .attr("height", function (d) {
        return height - y(d.value);
      })
      .attr("fill", function (d) {
        return color(d.key);
      });
  }

  render() {
    return <div id="my_dataviz" />;
  }
}

export default Bar;
