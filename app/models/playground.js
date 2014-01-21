var Playground =  DS.Model.extend({
  date: DS.attr('date'),
  high: DS.attr('number'),
  low: DS.attr('number'),
  label: DS.attr('string')
});

Playground.FIXTURES = [
  {
    id: 1,
    date: "Sat Jun 01 2013 00:00:00 GMT-0700 (PDT)",
    high: 64,
    low: 44,
    label: 'San Francisco'
  },
  {
    id: 2,
    date: "Sat Jun 01 2013 00:00:00 GMT-0700 (PDT)",
    high: 93,
    low: 83,
    label: 'Phoenix'
  },
  {
    id: 3,
    date: "Mon Jul 01 2013 00:00:00 GMT-0700 (PDT)",
    high: 66,
    low: 46,
    label: 'San Francisco'
  },
  {
    id: 4,
    date: "Mon Jul 01 2013 00:00:00 GMT-0700 (PDT)",
    high: 103,
    low: 93,
    label: 'Phoenix'
  }
];

export default Playground
