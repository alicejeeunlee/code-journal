/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousJSONEntries = localStorage.getItem('javascript-local-storage');
if (previousJSONEntries !== null) {
  data.entries = JSON.parse(previousJSONEntries);
}

function addEntriesToLocalStorage(event) {
  var JSONEntries = JSON.stringify(data.entries);
  localStorage.setItem('javascript-local-storage', JSONEntries);
}

window.addEventListener('beforeunload', addEntriesToLocalStorage);
