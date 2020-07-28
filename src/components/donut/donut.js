import React from "react";
import * as d3 from "d3";

class Donut extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      csvData: [],
    };
  }
  componentDidMount() {
    this.initData();
  }

  componentDidUpdate() {
    console.log("componentDidUpdate>>>>>>>>>>>>>>>>>");
    if (this.state.isLoading) {
      this.donutTransition();
      this.setState({
        isLoading: false,
      });
    }
  }

  initData() {
    d3.csv("./exercise_sheet.csv").then((rows) => {
      console.log("Total " + rows.length);
      var expensesByName = d3
        .nest()
        // .key(function (d) {
        //   return d.Date.split("/")[2];
        //   //return d.Date;
        // })
        .key(function (d) {
          return d.Brand;
        })
        .key(function (d) {
          return d.Franchise;
        })
        .rollup(function (v) {
          return {
            count: v.length,
          };
        })
        .entries(rows);
      console.log("donutTransition>>>>>>>>>>>");
      console.log(expensesByName);

      console.log("setState >>>>>>>>>>>>");
      this.setState({
        isLoading: true,
        csvData: expensesByName,
      });
    });
  }

  donutTransition() {
    const { csvData } = this.state;

    // Create  data
    var groupValues = [];
    var data = [];
    var groups = d3
      .map(csvData, function (d) {
        groupValues.push(d.values[0].value.count);
        data.push({ name: d.key, value: d.values[0].value.count });
        //data[d.key] = d.values[0].value.count;
        return d.key;
      })
      .keys();

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 40, left: 100 };
    var width = 460 - margin.left - margin.right;
    var height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    var x = d3.scaleLinear().domain([0, 13000]).range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Y axis
    var y = d3
      .scaleBand()
      .range([0, height])
      .domain(
        groups.map(function (d) {
          return d;
        })
      )
      .padding(1);
    svg.append("g").call(d3.axisLeft(y));

    // Lines
    svg
      .selectAll("myline")
      .data(data)
      .enter()
      .append("line")
      .attr("x1", function (d) {
        return x(d.value);
      })
      .attr("x2", x(0))
      .attr("y1", function (d) {
        return y(d.name);
      })
      .attr("y2", function (d) {
        return y(d.name);
      })
      .attr("stroke", "grey");

    // Circles
    svg
      .selectAll("mycircle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return x(d.value);
      })
      .attr("cy", function (d) {
        return y(d.name);
      })
      .attr("r", "4")
      .style("fill", "#69b3a2")
      .attr("stroke", "black");
  }

  render() {
    return (
      <div>
        <div id="my_dataviz" />
      </div>
    );
  }
}

export default Donut;
