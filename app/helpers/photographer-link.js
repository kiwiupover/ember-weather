import { htmlSafe } from 'ember-string';
import { helper } from 'ember-helper';

export function photographerLink(photographer) {
  if (photographer) {
    return htmlSafe(`&copy; <a href="http://500px.com/${photographer.username}" target="_blank">${photographer.fullname}</a>`);
  }
}

export default helper(photographerLink);
