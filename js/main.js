var $photoURL = document.querySelector('#photoURL');
var $img = document.querySelector('img');

$photoURL.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
});

var $form = document.querySelector('form');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var formData = {
    title: $form.elements.title.value,
    photoURL: $form.elements.photoURL.value,
    notes: $form.elements.notes.value
  };
  formData.entryId = data.nextEntryId;
  data.nextEntryId = data.nextEntryId + 1;
  data.entries.unshift(formData);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  $dataViewEntryForm.className = 'container data-form hidden';
  $dataViewEntries.className = 'container data-entries';
});

function renderEntry(entry) {
  var $li = document.createElement('li');
  $li.setAttribute('class', 'row entry');
  var $img = document.createElement('img');
  $img.setAttribute('src', entry.photoURL);
  $img.setAttribute('alt', entry.title);
  $img.setAttribute('class', 'column-half img-half');
  $li.appendChild($img);
  var $div = document.createElement('div');
  $div.setAttribute('class', 'column-half');
  $li.appendChild($div);
  var $h3 = document.createElement('h3');
  var $title = document.createTextNode(entry.title);
  $h3.appendChild($title);
  $div.appendChild($h3);
  var $p = document.createElement('p');
  var $notes = document.createTextNode(entry.notes);
  $p.appendChild($notes);
  $div.appendChild($p);
  return $li;
}

window.addEventListener('DOMContentLoaded', function (event) {
  var $ul = document.querySelector('ul');
  for (var i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
});

var $nav = document.querySelector('nav');
var $dataViewEntryForm = document.querySelector('.data-form');
var $dataViewEntries = document.querySelector('.data-entries');
$nav.addEventListener('click', function (event) {
  if (event.target.matches('.entries-link')) {
    $dataViewEntryForm.className = 'container data-form hidden';
    $dataViewEntries.className = 'container data-entries';
  }
});

var $newButton = document.querySelector('.new-button');
$newButton.addEventListener('click', function (event) {
  if (event.target.matches('.new-button')) {
    $dataViewEntryForm.className = 'container data-form';
    $dataViewEntries.className = 'container data-entries hidden';
  }
});

var $noEntriesMessage = document.querySelector('.no-entries');
if (data.entries.length > 0) {
  $noEntriesMessage.className = 'no-entries hidden';
}
