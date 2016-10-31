'use strict';

window.NestedJSX = {
	addToSuite(suite, opt_suffix) {
		var element;
		function createElement() {
			if (element && element.parentNode) {
				document.body.removeChild(element);
			}
			element = document.createElement('div');
			element.style.opacity = 0;
			document.body.appendChild(element);
		}

		suite.add({
			name: 'Metal' + (opt_suffix || ''),
			fn: function() {
				createElement();
				new metal.NestedJSX({count: 5}, element);
			}
		});

		suite.add({
			name: 'React' + (opt_suffix || ''),
			fn: function() {
				createElement();
				ReactDOM.render(React.createElement(react.Nested, {count: 5}), element);
			}
		});
		return suite;
	}
};
