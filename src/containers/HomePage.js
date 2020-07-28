import React, { Component } from "react";
import * as d3 from "d3";
import XYAxis from "./../components/axis/xy-axis";
import Line from "./../components/line/line";
import { Container, Row, Col } from "react-bootstrap";

const containerStyles = {
  width: "100%",
  height: "100vh",
  margin: 10,
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csvData: [
        {
          name: "Positive",
          groupData: [
            { key: "2012", value: { count: 10, total: 10 } },
            { key: "2013", value: { count: 10, total: 30 } },
            { key: "2014", value: { count: 10, total: 20 } },
            { key: "2015", value: { count: 10, total: 50 } },
            { key: "2016", value: { count: 10, total: 60 } },
            { key: "2017", value: { count: 10, total: 40 } },
            { key: "2018", value: { count: 10, total: 50 } },
            { key: "2019", value: { count: 10, total: 40 } },
            { key: "2020", value: { count: 10, total: 10 } },
          ],
        },
        {
          name: "Negative",
          groupData: [],
        },
        {
          name: "Neutral",
          groupData: [],
        },
      ],
    };
  }

  componentDidMount() {
    console.log("componentDidMount >>>>>>>>>>>>>>>>");
    this.initData();
  }

  componentDidUpdate() {
    console.log("componentWillUnmount >>>>>>>>>>>>>>>>");
    //this.lineTransition();
  }

  initData() {
    d3.csv("./exercise_sheet.csv").then((rows) => {
      // console.log("Total " + rows.length);
      // console.log(JSON.stringify(rows[0]));

      // var positiveArray = rows.filter(function (item) {
      //   return item.Sentiment === "Positive";
      // });

      // var negativeArray = rows.filter(function (item) {
      //   return item.Sentiment === "Negative";
      // });

      // var neutralArray = rows.filter(function (item) {
      //   return item.Sentiment === "Neutral";
      // });

      // console.log("Positive " + positiveArray.length);
      // console.log("Negative " + negativeArray.length);
      // console.log("Neutral " + neutralArray.length);

      var expensesByName = d3
        .nest()
        .key(function (d) {
          return d.Sentiment;
        })
        .key(function (d) {
          return d.Date.split("/")[2];
          //return d.Date;
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

      // console.log("lineTransition>>>>>>>>>>>");
      // console.log(expensesByName);

      var positiveArray = expensesByName.filter(function (item) {
        return item.key === "Positive";
      });

      var negativeArray = expensesByName.filter(function (item) {
        return item.key === "Negative";
      });

      var neutralArray = expensesByName.filter(function (item) {
        return item.key === "Neutral";
      });

      // console.log("setState >>>>>>>>>>>>");
      this.setState({
        csvData: [
          {
            name: "Positive",
            groupData: positiveArray[0].values.sort(function (a, b) {
              return a.key - b.key;
            }),
          },
          {
            name: "Negative",
            groupData: negativeArray[0].values.sort(function (a, b) {
              return a.key - b.key;
            }),
          },
          {
            name: "Neutral",
            groupData: neutralArray[0].values.sort(function (a, b) {
              return a.key - b.key;
            }),
          },
        ],
      });
    });
  }

  lineTransition() {
    //Line
  }

  render() {
    const { csvData } = this.state;
    console.log(
      "render >> csvData " + JSON.stringify(csvData[0].groupData.length)
    );
    console.log(
      "render >> csvData " + JSON.stringify(csvData[1].groupData.length)
    );
    console.log("render >> csvData " + JSON.stringify(csvData[0].groupData));
    //Code here
    const parentWidth = 600;
    const margins = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    };
    const width = parentWidth - margins.left - margins.right;
    const height = 300 - margins.top - margins.bottom;
    const ticks = 20;
    const t = d3.transition().duration(1000);

    //Positive
    const xScale = d3
      .scalePoint()
      .domain(csvData[0].groupData.map((d) => d.key))
      .rangeRound([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(csvData[0].groupData, (d) => d.value.total))
      .range([height, 0])
      .nice();

    const lineGenerator0 = d3
      .line()
      .x((d) => xScale(d.key))
      .y((d) => yScale(d.value.total))
      .curve(d3.curveMonotoneX);

    //Negative
    const xScale1 = d3
      .scaleBand()
      .domain(csvData[1].groupData.map((d) => d.key))
      .rangeRound([0, width])
      .padding(0.1);

    const yScale1 = d3
      .scaleLinear()
      .domain(d3.extent(csvData[1].groupData, (d) => d.value.total))
      .range([height, 0])
      .nice();

    const lineGenerator1 = d3
      .line()
      .x((d) => xScale1(d.key))
      .y((d) => yScale1(d.value.total))
      .curve(d3.curveMonotoneX);

    //Neutral
    const xScale2 = d3
      .scaleBand()
      .domain(csvData[2].groupData.map((d) => d.key))
      .rangeRound([0, width])
      .padding(0.1);

    const yScale2 = d3
      .scaleLinear()
      .domain(d3.extent(csvData[2].groupData, (d) => d.value.total))
      .range([height, 0])
      .nice();

    const lineGenerator2 = d3
      .line()
      .x((d) => xScale2(d.key))
      .y((d) => yScale2(d.value.total))
      .curve(d3.curveMonotoneX);

    return (
      <Container
        style={containerStyles}
        ref={(tc) => (this.treeContainer = tc)}
      >
        <Row>
          <Col xs={6} sm={6} md={6} lg={6}>
            <h4>Line Chart in d3</h4>
            <svg
              className="lineChartSvg"
              width={width + margins.left + margins.right}
              height={height + margins.top + margins.bottom}
            >
              <g transform={`translate(${margins.left}, ${margins.top})`}>
                <XYAxis {...{ xScale, yScale, height, ticks, t }} />
                <Line
                  data={csvData[0].groupData}
                  xScale={xScale}
                  yScale={yScale}
                  lineGenerator={lineGenerator0}
                  width={width}
                  height={height}
                  lineId="Positive"
                  lineColor="green"
                />
                <Line
                  data={csvData[1].groupData}
                  xScale={xScale1}
                  yScale={yScale1}
                  lineGenerator={lineGenerator1}
                  width={width}
                  height={height}
                  lineId="Negative"
                  lineColor="red"
                />
                <Line
                  data={csvData[2].groupData}
                  xScale={xScale2}
                  yScale={yScale2}
                  lineGenerator={lineGenerator2}
                  width={width}
                  height={height}
                  lineId="Neutral"
                  lineColor="purple"
                />
              </g>
            </svg>
            <dl>
              <svg height="10" width="10">
                <circle
                  cx="5"
                  cy="5"
                  r="5"
                  stroke="green"
                  stroke-width="3"
                  fill="green"
                />
              </svg>
              <dd> - Positive </dd>

              <svg height="10" width="10">
                <circle
                  cx="5"
                  cy="5"
                  r="5"
                  stroke="red"
                  stroke-width="3"
                  fill="red"
                />
              </svg>
              <dd> - Negative </dd>

              <svg height="10" width="10">
                <circle
                  cx="5"
                  cy="5"
                  r="5"
                  stroke="purple"
                  stroke-width="3"
                  fill="purple"
                />
              </svg>
              <dd> - Neutral </dd>
            </dl>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HomePage;
