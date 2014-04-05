SearchForm.RecentSearch = DS.Model.extend({
  title: DS.attr('string'),
  timeframe: DS.attr('string'),
  timestamp: DS.attr('string'),
  found: DS.attr('boolean')
});

// ... additional lines truncated for brevity ...
SearchForm.RecentSearch.FIXTURES = [
 {
   id: 1,
   title: 'aaa',
   timeframe: '24 hours',
   timestamp: '1',
   found: false
 },
 {
   id: 2,
   title: 'bbb',
   timeframe: '24 hours',
   timestamp: '2',
   found: false
 },
 {
   id: 3,
   title: 'ccc',
   timeframe: '24 hours',
   timestamp: '3',
   found: false
 }
];