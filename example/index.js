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
			awesomeness: 3,
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
	series: {
		data,
		name: 'Awesomeness',
		category: 'name',
		value: 'awesomeness',
	},
	yAxisOptions: {
		orientation: 'right'
	}
};
new CrazyChart(options);