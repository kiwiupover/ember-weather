import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import mirageInitializer from 'ember-weather/initializers/ember-cli-mirage';

moduleForComponent('weather-current-details', 'Integration | Component | weather current details', {
  integration: true,

  beforeEach() {
    mirageInitializer.initialize(this.container);
    this.server = window.server;
  }
});

test('it renders correct date for time zones', function(assert) {
  let time = Math.round(new Date('Tue Oct 17 2016 22:44:31 GMT-0700 (PDT)').getTime()/1000);
  let expectedTime = 'Oct 18';

  let weather = {
    time: time,
    timezone: 'Pacific/Auckland'
  };

  this.set('weather', weather);
  this.render(hbs`{{weather-current-details weather=weather}}`);

  assert.equal(this.$('.current-details').length, 1, 'We are rendering DOM');
  assert.equal(this.$('.display-date').text().trim(), expectedTime, 'display date');
});

test('it renders the current forecast', function(assert){
  let time = Math.round(new Date('Tue Oct 17 2016 22:44:31 GMT-0700 (PDT)').getTime()/1000);
  let expectedTime = 'Oct 18';

  let weather = this.server.create('weather', {
    time: time
  });

  this.set('weather', weather);

  this.render(hbs`{{weather-current-details weather=weather}}`);

  assert.equal(this.$('.speed').text().trim(), '10mph', 'We have the speed');
  assert.equal(this.$('.display-date').text().trim(), expectedTime, 'display date');
});
