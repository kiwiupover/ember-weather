var Playground =  DS.Model.extend({
  date: DS.attr('date'),
  high: DS.attr('number'),
  low: DS.attr('number'),
  label: DS.attr('string')
});

Playground.reopenClass({
  FIXTURES: [
    {
      id: 1,
      date: "Sat Jun 01 2013 00:00:00 GMT-0700 (PDT)",
      high: 64,
      low: 44,
      label: 'San Francisco',
      imageUrl: 'http://ppcdn.500px.org/62235387/21f4932067893da39a7b938fcebb70f61aaad920/5.jpg'
    },
    {
      id: 2,
      date: "Sat Jun 01 2013 00:00:00 GMT-0700 (PDT)",
      high: 56,
      low: 38,
      label: 'Banff',
      imageUrl: 'http://ppcdn.500px.org/57237956/5da90ef13c6a27a6ec067954b349e245bacbb31b/5.jpg'
    },
    {
      id: 3,
      date: "Mon Jul 01 2013 00:00:00 GMT-0700 (PDT)",
      high: 93,
      low: 82,
      label: 'Kingston, Jamaica',
      imageUrl: 'http://ppcdn.500px.org/63703557/e180751c1aedd2bc41f9e63dfbc9f9908b051b9d/5.jpg'
    },
    {
      id: 4,
      date: "Mon Jul 01 2013 00:00:00 GMT-0700 (PDT)",
      high: 103,
      low: 93,
      label: 'Christchurch',
      imageUrl: 'http://ppcdn.500px.org/68606903/21b5a63489b9af354e345e29ee2bfacf7bc402c1/5.jpg'
    }
  ]
});


export default Playground;
