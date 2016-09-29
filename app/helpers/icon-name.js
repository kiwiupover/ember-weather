import { htmlSafe } from 'ember-string';
import { helper } from 'ember-helper';

export function iconName(type) {
 return htmlSafe(`<i aria-hidden="true" class="icon-${type}"></i>`);
}

export default helper(iconName);
