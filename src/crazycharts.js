import * as d3 from "d3";
import {
	TICK_SIZE,
	BAR_INNER_PADDING,
	BAR_OUTER_PADDING,
	TICK_PADDING,
	AXIS_COLOR,
	FONT_FAMILY,
	AXIS_TITLE_FONT_SIZE
} from './constants';

import {Bar} from './bar';
import {computeMargins} from './margins';

export class CrazyChart {
	constructor(options) {
		this.margin = {
			right: 0,
			left: 0,
			bottom: 0,
			top: 0
		};
		for (const prop in options) {
			this[prop] = options[prop];
		}
		this.margin = computeMargins(options);
		this.insertSVG();
		this.createScales();
		this.createYAxis();
		this.createXAxis();
		this.createBars();
	}

	insertSVG() {
		this.svg = d3.select(this.node).append('svg');
		this.svg
		.attr('width', this.width)
		.attr('height', this.height);
	}

	createXScale() {
		const {data, category} = this.series;
		this.xScale = d3.scaleBand();
		this.xScale
			.domain(data.map(d => d[category]))
			.range([this.margin.left, this.width - this.margin.right])
			.paddingInner(BAR_INNER_PADDING)
			.paddingOuter(BAR_OUTER_PADDING);
	}

	createYScale() {
		const {data, value} = this.series;
		const minDomain = Math.min(0, d3.min(data, d => d[value]));
		const maxDomain = d3.max(data, d => d[value]);
		this.yScale = d3.scaleLinear()
			.domain([minDomain, maxDomain])
			.range([this.height - this.margin.bottom, this.margin.top]);
	}

	createYAxis() {
		const {orientation, title} = this.yAxisOptions;
		const axisConstructor = orientation === 'left' ? d3.axisLeft : d3.axisRight;
		this.yAxis = axisConstructor(this.yScale);

		this.yAxis
			.tickSize(TICK_SIZE)
			.tickSizeOuter(0)
			.tickPadding(TICK_PADDING);

		const axisGroup = this.svg.append('g');

		const transform = orientation === 'left' ?
			`translate(${this.margin.left}, 0)` :
			`translate(${this.width - this.margin.right}, 0)`;

		axisGroup
			.attr('class', 'y-axis')
			.attr('transform', transform)
			.call(this.yAxis)
			.call(g => g.select(".domain")
				.attr("stroke", AXIS_COLOR))
			.call(g => g.selectAll("line")
				.attr("stroke", AXIS_COLOR));

		const titleY = orientation === 'left' ? 0 : this.width - AXIS_TITLE_FONT_SIZE;

		if (title) {
			this.svg.append("text")
			.attr('class', 'yaxis-title')
			.attr("transform", `rotate(-90)`)
			.attr("y", titleY)
			.attr("x", 0 - (this.height / 2))
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.style("font-family", FONT_FAMILY)
			.text(this.yAxisOptions.title);
		}
	}

	createXAxis() {
		this.xAxis = d3.axisBottom(this.xScale)
			.tickSize(TICK_SIZE)
			.tickSizeOuter(0)
			.tickPadding(TICK_PADDING);

		this.svg.append('g')
			.attr('class', 'x-axis')
			.attr('transform', `translate(0,${this.height - this.margin.bottom})`)
			.call(this.xAxis)
			.call(g => g.select(".domain")
				.attr("stroke", AXIS_COLOR))
			.call(g => g.selectAll("line")
				.attr("stroke", AXIS_COLOR));
	}

	createScales() {
		this.createXScale();
		this.createYScale();
	}

	createBars() {
		const barBuilder = new Bar({
			svg: this.svg,
			series: this.series,
			xScale: this.xScale,
			yScale: this.yScale,
		});
		barBuilder.render();
	}
}