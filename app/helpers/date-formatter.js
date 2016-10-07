import { htmlSafe } from 'ember-string';
import { helper } from 'ember-helper';

export function dateFormat([date, timezone]) {
  return htmlSafe(moment.unix(date).tz(timezone).format('ddd MMM DD'));
}

export default helper(dateFormat);
