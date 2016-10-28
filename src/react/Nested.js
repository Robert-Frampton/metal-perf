'use strict';

window.reactNestedCount = 0;
this.react = this.react || {}; // jshint ignore:line
this.react.Nested = React.createClass({ // jshint ignore:line
	componentWillMount: function() {
		window.reactNestedCount++;
	},

	render: function() {
		var children = [];
		for (var i = 0; i < this.props.count; i++) {
			children.push(React.createElement(
				react.Nested,
				{
					count: this.props.count - 1
				}
			));
		}
		return React.createElement('div', null, [
			'Component',
			children
		]);
	}
});
