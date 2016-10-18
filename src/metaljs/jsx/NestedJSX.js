'use strict';

import JSXComponent from 'metal-jsx';

window.nestedCount = 0;

class NestedJSX extends JSXComponent {
	created() {
		window.nestedCount++;
	}

	render() {
		var children = [];
		for (var i = 0; i < this.props.count; i++) {
			children.push(
				<NestedJSX count={this.props.count - 1} />
			);
		}
		return <div>{children}</div>;
	}
}

export default NestedJSX;
