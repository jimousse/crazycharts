import {CrazyChart} from '../src/index';

	const data = [
		{
			awesomeness: 8,
			name: "Edouard"
		},
		{
			awesomeness: 10,
			name: "Yassine"
		},
		{
			awesomeness: 20,
			name: "Jimmy"
		},
		{
			awesomeness: 13,
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
		orientation: 'left',
		title: 'Dick size (cm)'
	}
};
new CrazyChart(options);