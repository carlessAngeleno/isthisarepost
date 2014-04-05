App.Form = DS.Model.extend({
  title: DS.attr('string'),
  active: DS.attr('boolean')
});

App.Form.FIXTURES = [
  {
    id: 1,
    title: 'Learn Ember.js',
    active: true,
    timeframes: [
      '24 hours',
      '2 days',
      '3 days',
      '7 days',
      '30 days'
    ]
  },
  {
    id: 2,
    title: '...',
    active: false,
    timeframes: [
      '7 days',
      '30 days'
    ]    
  }
];