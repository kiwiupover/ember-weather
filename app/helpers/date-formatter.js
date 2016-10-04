import { htmlSafe } from 'ember-string';
import { helper } from 'ember-helper';

export function dateFormat(date) {
 return htmlSafe(moment.unix(date).format('ddd MMM DD'));
}

export default helper(dateFormat);
