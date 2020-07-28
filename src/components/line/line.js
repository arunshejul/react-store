import React from "react";
import * as d3 from "d3";

class Line extends React.Component {
  constructor() {
    super();
    this.ref = React.createRef();
  }
  componentDidMount() {
    const node = this.ref.current;
    const {
      xScale,
      yScale,
      data,
      lineGenerator,
      lineId,
      lineColor,
    } = this.props;

    const initialData = data.map((d) => ({
      name: d.key,
      value: 0,
    }));

    d3.select(node)
      .append("path")
      .datum(initialData)
      .attr("id", lineId)
      .attr("stroke", lineColor)
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .attr("d", lineGenerator);

    this.updateChart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  updateChart() {
    // var allGroup = ["Positive", "Negative", "Neutral"];
    const { lineGenerator, xScale, yScale, data, lineId } = this.props;
    const t = d3.transition().duration(1000);
    const line = d3.select("#" + lineId);
    line.datum(data).transition(t).attr("d", lineGenerator);
  }

  render() {
    return <g className="line-group" ref={this.ref} />;
  }
}

export default Line;
