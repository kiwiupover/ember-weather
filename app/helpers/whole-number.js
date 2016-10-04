import { htmlSafe } from 'ember-string';
import { helper } from 'ember-helper';

export function wholeNumber(value) {
 return htmlSafe(parseInt(value, 10).toFixed(0));
}

export default helper(wholeNumber);
