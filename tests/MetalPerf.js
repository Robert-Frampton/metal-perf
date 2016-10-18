'use strict';

window.MetalPerf = { // jshint ignore:line
	results: {},

	labels: [],

	run(suite) {
		if (window.YUI) {
			YUI().use(['List'], function(Y) {
				window.Y = Y;
				MetalPerf.runSuite_(suite);
			});
		} else {
			MetalPerf.runSuite_(suite);
		}
	},

	runSuite_(suite) {
		suite
			.on('cycle', function(event) {
				var text = String(event.target).substr(event.target.name.length + 3);
				document.querySelector('#' + event.target.name).textContent = text;

				var split = event.target.name.split('-');
				var mainName = split[0];
				if (!MetalPerf.results[mainName]) {
					MetalPerf.results[mainName] = [];
				}
				MetalPerf.results[mainName].push(event.target.hz);

				if (split[1]) {
					if (MetalPerf.labels[0] === 'ops/sec') {
						MetalPerf.labels = [];
					}
					if (MetalPerf.labels.indexOf(split[1]) === -1) {
						MetalPerf.labels.push(split[1]);
					}
				}
			})
			.on('complete', function() {
				var result = document.querySelector('#result');
				result.textContent = 'Fastest: ' + this.filter('fastest').map('name');
				metal.dom.removeClasses(result, 'hidden');

				var chartElement = document.querySelector('#chart');
				metal.dom.removeClasses(chartElement, 'hidden');

				var datasets = [];
				var keys = Object.keys(MetalPerf.results);
				for (var i = 0; i < keys.length; i++) {
					datasets.push({
						backgroundColor: labelToColor[keys[i]],
						data: MetalPerf.results[keys[i]],
						label: keys[i]
					});
				}

				var chart = new window.Chart(chartElement, {
					type: 'bar',
					data: {
						labels: MetalPerf.labels,
						datasets: datasets
					},
					options: {
						responsive: false,
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero: true
								},
								scaleLabel: {
									display: true,
									labelString: 'ops/sec'
								}
							}]
						},
						animation: false
					}
				});


				var downloadButton = document.querySelector('#download');
				metal.dom.removeClasses(downloadButton, 'hidden');
				downloadButton.download = 'chart.png';
				downloadButton.href = chart.toBase64Image();
			})
			.run({async: true});
	}
};

var labelToColor = {
	Metal: 'rgba(0,0,256,0.2)',
	React: 'rgba(0,256,0,0.2)',
	YUI: 'rgba(256,0,0,0.2)'
};
