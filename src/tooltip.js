import * as d3 from "d3";

export class Tooltip {
	constructor(node) {
		this.init(node);
		this.isHidden = true;
	}

	init(node) {
		this.tooltipElement = d3.select(node).append('div');
		this.tooltipElement
			.attr('class', 'tooltip')
			.style('opacity', 0)
			.style('position', 'absolute')
			.style('min-width', '60px')
			.style('min-height', '30px')
			.style('border', '1px solid lightgray')
			.style('box-sizing', 'content-box')
			.style('text-align', 'center')
			.style('pointer-events', 'none')
			.style('font-family', 'sans-serif')
			.style('font-size', '13px')
			.style('background', 'white');
	}

	formatTooltipLine(category, value, color) {
		return `<div style="margin: 10px">
		<span style="height: 8px;
			width: 8px;
			background: ${color};
			border-radius: 50%;
			display: inline-block;
			margin-right: 3px;"></span>
		<span> ${category}:</span>
		<span> <b>${value}</b> </span>
		</div>
		`;
	}

	setContent({value, color, category}) {
		this.tooltipElement
			.html(this.formatTooltipLine(category, value, color));
	}

	setPosition({top, left}) {
		this.tooltipElement
		.style('left', `${left}px`)
		.style("top", `${top}px`);
	}

	show() {
		if (!this.isHidden) return;
		this.tooltipElement
			.style("opacity", 1);
		this.isHidden = false;
	}

	hide() {
		this.tooltipElement
			.style("opacity", 0);
		this.isHidden = true;
	}
}