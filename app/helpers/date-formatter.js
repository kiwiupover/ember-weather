import moment from 'moment';
import { helper } from 'ember-helper';
import { htmlSafe } from 'ember-string';

export function dateFormat([date, timezone]) {
  return htmlSafe(moment.unix(date).tz(timezone).format('ddd MMM DD'));
}

export default helper(dateFormat);
