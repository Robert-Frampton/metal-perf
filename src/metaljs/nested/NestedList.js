'use strict';

import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import List from '../List';
import './NestedListItem';
import './NestedList.soy';

class NestedList extends List {};
ComponentRegistry.register('NestedList', NestedList);

export default NestedList;