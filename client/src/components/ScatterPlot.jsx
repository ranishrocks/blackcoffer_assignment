// ScatterPlot.jsx
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const ScatterPlot = ({ serverData }) => {
  const svgRef = useRef();

  useEffect(() => {
    const data = serverData.filter(d => d.intensity); // Filter for entries with intensity

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear svg

    const margin = { top: 40, right: 30, bottom: 60, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)]) // X-axis based on intensity
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.likelihood)]) // Y-axis based on likelihood
      .range([height, 0]);

    svg.attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    // Add X-axis
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Add Y-axis
    svg.append('g')
      .call(d3.axisLeft(y));

    // Add X-axis label
    svg.append('text')
      .attr('class', 'x axis-label')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${width / 2 + margin.left}, ${height + margin.top + 40})`)
      .style('font-size', '14px')
      .text('Intensity');

    // Add Y-axis label
    svg.append('text')
      .attr('class', 'y axis-label')
      .attr('text-anchor', 'middle')
      .attr('transform', `rotate(-90) translate(${-height / 2 - margin.top}, ${margin.left / 4})`)
      .style('font-size', '14px')
      .text('Likelihood');

    // Add chart title
    svg.append('text')
      .attr('class', 'chart-title')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${width / 2 + margin.left}, ${margin.top / 2})`)
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Scatter Plot of Intensity vs. Likelihood');

    // Add grid lines
    svg.append('g')
      .attr('class', 'grid')
      .selectAll('line')
      .data(x.ticks(10))
      .enter()
      .append('line')
      .attr('x1', d => x(d))
      .attr('x2', d => x(d))
      .attr('y1', 0)
      .attr('y2', height)
      .attr('stroke', '#ccc')
      .attr('stroke-width', 0.5)
      .attr('stroke-dasharray', '2,2');

    svg.append('g')
      .attr('class', 'grid')
      .selectAll('line')
      .data(y.ticks(10))
      .enter()
      .append('line')
      .attr('y1', d => y(d))
      .attr('y2', d => y(d))
      .attr('x1', 0)
      .attr('x2', width)
      .attr('stroke', '#ccc')
      .attr('stroke-width', 0.5)
      .attr('stroke-dasharray', '2,2');

    // Draw the dots
    svg.selectAll('.dot')
      .data(data)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', d => x(d.intensity))
      .attr('cy', d => y(d.likelihood))
      .attr('r', 5) // Adjust the radius as needed
      .attr('fill', '#69b3a2') // Change color for better visibility
      .attr('opacity', 0.7); // Add slight transparency for better overlap visibility

  }, [serverData]);

  return <svg ref={svgRef}></svg>;
};

ScatterPlot.propTypes = {
  serverData: PropTypes.array.isRequired,
};

export default ScatterPlot;
