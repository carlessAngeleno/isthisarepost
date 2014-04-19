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
   title: 'http://www.google.com',
   timeframe: '24 hours',
   timestamp: '1',
   found: false
 },
 {
   id: 2,
   title: 'http://www.yahoo.com',
   timeframe: '24 hours',
   timestamp: '2',
   found: true
 },
 {
   id: 3,
   title: 'http://www.aol.com',
   timeframe: '24 hours',
   timestamp: '3',
   found: false
 }
];