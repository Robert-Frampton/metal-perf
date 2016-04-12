'use strict';

window.MetalPerf = { // jshint ignore:line
	results: {},

	run(suite) {
		YUI().use(['List'], function(Y) {
			window.Y = Y;
			suite
				.on('start', function(event) {
					document.querySelector('#' + event.target.name).textContent = 'Running';
				})
				.on('cycle', function(event) {
					var text = String(event.target).substr(event.target.name.length + 3);
					document.querySelector('#' + event.target.name).textContent = text;
					MetalPerf.results[event.target.name] = event.target.hz;
				})
				.on('complete', function() {
					var result = document.querySelector('#result');
					result.textContent = 'Fastest: ' + this.filter('fastest').map('name');
					metal.dom.removeClasses(result, 'hidden');

	        var chartElement = document.querySelector('#chart');
					metal.dom.removeClasses(chartElement, 'hidden');
					var chart = new window.Chart(chartElement, {
	          type: 'bar',
	          data: {
	  			    labels: ['ops/sec'],
	  			    datasets: [
	  			        {
	                    backgroundColor: 'rgba(0,0,256,0.2)',
	  			            label: 'Metal',
	  			            data: [MetalPerf.results.Metal]
	  			        },
	  			        {
	                    backgroundColor: 'rgba(0,256,0,0.2)',
	  			            label: 'React',
	  			            data: [MetalPerf.results.React]
	  			        },
	  			        {
	                    backgroundColor: 'rgba(256,0,0,0.2)',
	  			            label: 'YUI',
	  			            data: [MetalPerf.results.YUI]
	  			        }
	  			    ]
	          },
	          options: {
	            responsive: false,
	            scales: {
	      				yAxes: [{
	      						ticks: {
	      							beginAtZero: true
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
		});
	}
};
