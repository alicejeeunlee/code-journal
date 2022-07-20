/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousJSONData = localStorage.getItem('code-journal-entries');
if (previousJSONData !== null) {
  data = JSON.parse(previousJSONData);
}

function addDataToLocalStorage(event) {
  var JSONData = JSON.stringify(data);
  localStorage.setItem('code-journal-entries', JSONData);
}

window.addEventListener('beforeunload', addDataToLocalStorage);
