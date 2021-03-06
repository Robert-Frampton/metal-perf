'use strict';

window.Decorate = {
	addToSuite(suite, opt_suffix) {
		var data = {items: []};
		for (var i = 0; i < 1000; i++) {
			data.items.push('Item ' + (i + 1));
		}

		var element;
		function createElement() {
			if (element && element.parentNode) {
				document.body.removeChild(element);
			}

			element = document.createElement('div');
			element.style.opacity = 0;
			document.body.appendChild(element);

			IncrementalDOM.patch(element, function() {
				metalNamed.List.List.TEMPLATE(data);
			});
		}

		suite.add({
			name: 'Metal' + (opt_suffix || ''),
			fn: function() {
				createElement();
				new metalNamed.List.List({
					element: element.childNodes[0],
					items: data.items
				});
			}
		});

		suite.add({
			name: 'React' + (opt_suffix || ''),
			fn: function() {
				createElement();
				ReactDOM.render(React.createElement(react.List, data), element);
			}
		});

		suite.add({
			name: 'YUI' + (opt_suffix || ''),
			fn: function() {
				createElement();
				new Y.List({
					contentBox: element.childNodes[0],
					items: data.items
				}).render();
			}
		});

		return suite;
	}
};
