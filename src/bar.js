import * as d3 from "d3";

export class Bar {
	constructor(config) {
		for (const prop in config) {
			this[prop] = config[prop];
		}
	}

	getFill(d, i, colorPalette) {
		if (Array.isArray(colorPalette) && colorPalette.length > 1)
			return (d, i) => colorPalette[i % colorPalette.length];

		return d3.interpolateWarm(Math.random());
	}

	render() {
		const x = this.xScale;
		const y = this.yScale;
		const {value, category, data, color} = this.series;
		const tooltip = this.tooltip;

		this.svg.append('g')
		.attr('class', 'bars')
		.selectAll('rect')
		.data(data)
		.join('rect')
		.attr('class', 'bar')
		.attr('fill', (d, i) => { return this.getFill(d, i, color)})
		.attr('width', x.bandwidth())
		.attr('height', d => Math.abs(y(0) - y(d[value])))
		.attr('x', d => x(d[category]))
		.attr('y', d => d[value] >= 0 ? y(d[value]) : y(0))
		.on('mouseover', function(d,i) {
			tooltip.show();
			const currentCategory = d[category];
			d3.selectAll('rect.bar').style('opacity', (d) => {
				return currentCategory === d[category] ? 1 : 0.5;
			});
		})
		.on('mouseout', function() {
			d3.selectAll('rect.bar').style('opacity', '1');
			tooltip.hide();
		})
		.on('mousemove', function(d) {
			const mouse = d3.mouse(this);

			tooltip.setContent({
				category: d[category],
				value: d[value],
				color: this.getAttribute('fill')
			});

			tooltip.setPosition({
				left: mouse[0],
				top: mouse[1] - 28
			});
		})
		;
	}
}