'use strict';

import JSXComponent from 'metal-jsx';

window.metalNestedCount = 0;

class NestedJSX extends JSXComponent {
	created() {
		window.metalNestedCount++;
	}

	render() {
		var children = [];
		for (var i = 0; i < this.props.count; i++) {
			children.push(
				<NestedJSX count={this.props.count - 1} />
			);
		}
		return <div>Component {children}</div>;
	}
}

export default NestedJSX;
