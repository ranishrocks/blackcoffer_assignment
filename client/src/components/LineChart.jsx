// src/components/LineChart.jsx
import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

const LineChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 400;
    const height = 300;

    svg.attr("width", width).attr("height", height);

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, d => new Date(d.date)))
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([height, 0]);

    const line = d3
      .line()
      .x(d => xScale(new Date(d.date)))
      .y(d => yScale(d.value));

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", d => xScale(new Date(d.date)))
      .attr("cy", d => yScale(d.value))
      .attr("r", 3)
      .attr("fill", "#69b3a2");
  }, [data]);

  return <svg ref={svgRef} />;
};
LineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default LineChart;

