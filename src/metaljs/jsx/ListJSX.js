'use strict';

import JSXComponent from 'metal-jsx';

class ListItem extends JSXComponent {
	render() {
		return <div class="row">
			<div class="col-md-12">
				<span>{this.props.text}</span>
			</div>
		</div>
	}
}

class ListJSX extends JSXComponent {
	render() {
		var children = [];
		var items = this.props.items;
		for (var i = 0; i < items.length; i++) {
			children.push(<ListItem text={items[i]} />);
		}
		return <div class="list">{children}</div>
	}
}

export default ListJSX;
