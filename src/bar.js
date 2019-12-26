import * as d3 from "d3";

export class Bar {
	constructor(config) {
		for (const prop in config) {
			this[prop] = config[prop];
		}
	}

	render() {
		const x = this.xScale;
		const y = this.yScale;
		const {value, category, data, color} = this.series;

		const fill = Array.isArray(color) && color.length > 1 ?
			(d, i) => color[i % color.length] :
			(d) => d3.interpolateWarm(Math.random());

		this.svg.append('g')
		.attr('class', 'bars')
		.selectAll('rect')
		.data(data)
		.join('rect')
		.attr('class', 'bar')
		.attr('fill', fill)
		.attr('width', x.bandwidth())
		.attr('height', d => Math.abs(y(0) - y(d[value])))
		.attr('x', d => x(d[category]))
		.attr('y', d => d[value] >= 0 ? y(d[value]) : y(0));
	}
}