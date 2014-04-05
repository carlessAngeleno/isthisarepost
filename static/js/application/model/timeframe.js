SearchForm.Timeframe = DS.Model.extend({
  title: DS.attr('string'),
  value: DS.attr('string'),
  selected: DS.attr('boolean')
});

// ... additional lines truncated for brevity ...
SearchForm.Timeframe.FIXTURES = [
 {
   id: 1,
   title: '24 hours',
   value: '1',
   selected: false
 },
 {
   id: 2,
   title: '2 days',
   value: '2',
   selected: false
 },
 {
   id: 3,
   title: '3 days',
   value: '3',
   selected: false
 },
 {
   id: 4,
   title: '7 days',
   value: '7',
   selected: false
 },
 {
   id: 5,
   title: '30 days',
   value: '30',
   selected: false
 }
];