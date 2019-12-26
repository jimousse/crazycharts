import {CrazyChart} from '../src/index';

	const data = [
		{
			awesomeness: 10,
			name: "Edouard"
		},
		{
			awesomeness: 14,
			name: "Yassine"
		},
		{
			awesomeness: -3,
			name: "Jimmy"
		},
		{
			awesomeness: 16,
			name: "Barthe"
		},
		{
			awesomeness: 16,
			name: "Philou"
		}
	];

const chartContainer = document.getElementById('container');
const options = {
	node: chartContainer,
	height: 600,
	width: 900,
	data,
	xAxisOptions: {
		category: 'name',
	},
	yAxisOptions: {
		value: 'awesomeness',
		title: 'Dick size (cm)',
		orientation: 'rightt'
	}
};
new CrazyChart(options);