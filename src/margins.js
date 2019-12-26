import {
	TICK_SIZE,
	TICK_PADDING,
	FONT_SIZE,
	AXIS_TITLE_PADDING,
} from './constants';

import {getLongestLabel} from './utils';

export const computeMargins = (options) => {
	const {series, yAxisOptions} = options;
	const longestLabelLength = getLongestLabel(series);
	const margin = {
		right: 0,
		left: 0,
		bottom: 0,
		top: 0
	};

	// y axis
	if (yAxisOptions.orientation === 'left') {
		margin.left += longestLabelLength + TICK_SIZE + TICK_PADDING;
		if (yAxisOptions.title) margin.left += FONT_SIZE + AXIS_TITLE_PADDING;
	} else {
		margin.right += longestLabelLength + TICK_SIZE + TICK_PADDING;
		if (yAxisOptions.title) margin.right += FONT_SIZE + AXIS_TITLE_PADDING;
	}
	margin.top += FONT_SIZE;

	// xaxis
	margin.bottom += TICK_SIZE + TICK_PADDING + FONT_SIZE;

	return margin;
}