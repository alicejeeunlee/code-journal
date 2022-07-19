/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousJSONData = localStorage.getItem('code-journal-local-storage');
if (previousJSONData !== null) {
  data = JSON.parse(previousJSONData);
}

function addDataToLocalStorage(event) {
  var JSONData = JSON.stringify(data);
  localStorage.setItem('code-journal-local-storage', JSONData);
}

window.addEventListener('beforeunload', addDataToLocalStorage);
