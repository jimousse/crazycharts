import * as d3 from "d3";
import {
	TICK_SIZE,
	BAR_INNER_PADDING,
	BAR_OUTER_PADDING,
	TICK_PADDING,
	FONT_SIZE,
	CHARACTER_WIDTH,
	AXIS_COLOR,
	AXIS_TITLE_PADDING,
	FONT_FAMILY,
	AXIS_TITLE_FONT_SIZE
} from './constants';

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
		this.computeMargins();
		this.insertSVG();
		this.createScales();
		this.createYAxis();
		this.createXAxis();
		this.createBars();
	}

	computeMargins() {
		// yaxis
		if (this.yAxisOptions.orientation === 'left') {
			this.margin.left += this.getLongestLabel() + TICK_SIZE + TICK_PADDING;
			// title
			this.margin.left += FONT_SIZE + AXIS_TITLE_PADDING;
		} else {
			this.margin.right += this.getLongestLabel() + TICK_SIZE + TICK_PADDING;
			// title
			this.margin.right += FONT_SIZE + AXIS_TITLE_PADDING;
		}
		this.margin.top += FONT_SIZE;

		// xaxis
		this.margin.bottom += TICK_SIZE + TICK_PADDING + FONT_SIZE;
	}

	getLongestLabel() {
		const labelLengths = this.data.map(d => `${d[this.yAxisOptions.value]}`.length);
		return Math.max(...labelLengths)*CHARACTER_WIDTH;
	}

	insertSVG() {
		this.svg = d3.select(this.node).append('svg');
		this.svg
		.attr('width', this.width)
		.attr('height', this.height);
	}

	createXScale() {
		this.xScale = d3.scaleBand();
		this.xScale
			.domain(this.data.map(d => d[this.xAxisOptions.category]))
			.range([this.margin.left, this.width - this.margin.right])
			.paddingInner(BAR_INNER_PADDING)
			.paddingOuter(BAR_OUTER_PADDING);
	}

	createYScale() {
		const minDomain = Math.min(0, d3.min(this.data, d => d[this.yAxisOptions.value]));
		const maxDomain = d3.max(this.data, d => d[this.yAxisOptions.value]);
		this.yScale = d3.scaleLinear()
			.domain([minDomain, maxDomain])
			.range([this.height - this.margin.bottom, this.margin.top]);
	}

	createYAxis() {
		const {orientation} = this.yAxisOptions;
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

		// axis title
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
		const x = this.xScale;
		const y = this.yScale;
		const {category} = this.xAxisOptions;
		const {value} = this.yAxisOptions;
		const data = this.data;

		this.svg.append('g')
			.attr('class', 'bars')
			.selectAll('rect')
			.data(data)
			.join('rect')
			.attr('class', 'bar')
			.attr('fill', d => d3.interpolateWarm(Math.random()))
			.attr('width', x.bandwidth())
			.attr('height', d => Math.abs(y(0) - y(d[value])))
			.attr('x', d => x(d[category]))
			.attr('y', d => d[value] >= 0 ? y(d[value]) : y(0));
	}
}