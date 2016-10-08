import { helper } from 'ember-helper';
import { htmlSafe } from 'ember-string';

export function photographerLink([photographer]) {
  if (photographer) {
    return htmlSafe(`&copy; <a href="https://500px.com/${photographer.username}" target="_blank">${photographer.fullname}</a>`);
  }
}

export default helper(photographerLink);
