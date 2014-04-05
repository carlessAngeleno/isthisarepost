SearchForm.timeframe = DS.Model.extend({
  title: DS.attr('string'),
  value: DS.attr('string')
});

// ... additional lines truncated for brevity ...
SearchForm.timeframe.FIXTURES = [
 {
   id: 1,
   title: '24 hours',
   value: '1'
 },
 {
   id: 2,
   title: '2 days',
   value: '2'
 },
 {
   id: 3,
   title: '3 days',
   value: '3'
 },
 {
   id: 4,
   title: '7 days',
   value: '7'
 },
 {
   id: 5,
   title: '30 days',
   value: '30'
 }
];