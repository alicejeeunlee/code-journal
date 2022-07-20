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
  var $ul = document.querySelector('ul');
  $ul.prepend(renderEntry(formData));
  var $entryForm = document.querySelector('#form');
  var $entries = document.querySelector('#entries');
  $entryForm.className = 'container data-form hidden';
  $entries.className = 'container data-entries';
  var $entriesDataView = $entries.getAttribute('data-view');
  data.view = $entriesDataView;
  var $noEntriesMessage = document.querySelector('.no-entries');
  $noEntriesMessage.className = 'no-entries hidden';
});

function renderEntry(entry) {
  var $li = document.createElement('li');
  $li.setAttribute('class', 'row entry');
  $li.setAttribute('data-entry-id', entry.entryId);
  var $img = document.createElement('img');
  $img.setAttribute('src', entry.photoURL);
  $img.setAttribute('alt', entry.title);
  $img.setAttribute('class', 'column-half img-half');
  $li.appendChild($img);
  var $div = document.createElement('div');
  $div.setAttribute('class', 'column-half');
  $li.appendChild($div);
  var $h3 = document.createElement('h3');
  $h3.setAttribute('class', 'icon-align');
  var $title = document.createTextNode(entry.title);
  $h3.appendChild($title);
  var $i = document.createElement('i');
  $i.setAttribute('class', 'fa-solid fa-pen');
  $h3.appendChild($i);
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
  viewSwap(data.view);
});

var $allView = document.querySelectorAll('.view');

function viewSwap(view) {
  for (var j = 0; j < $allView.length; j++) {
    if ($allView[j].getAttribute('data-view') === view) {
      $allView[j].className = 'container view';
    } else {
      $allView[j].className = 'container view hidden';
    }
  }
}

var $nav = document.querySelector('nav');

$nav.addEventListener('click', function (event) {
  if (event.target.matches('.entries-link')) {
    data.view = 'entries';
    viewSwap(data.view);
  }
});

var $newButton = document.querySelector('.new-button');

$newButton.addEventListener('click', function (event) {
  data.view = 'entry-form';
  viewSwap(data.view);
});

var $noEntriesMessage = document.querySelector('.no-entries');

if (data.entries.length > 0) {
  $noEntriesMessage.className = 'no-entries hidden';
}

var $ul = document.querySelector('ul');
$ul.addEventListener('click', function (event) {
  if (event.target.matches('.fa-pen')) {
    data.view = 'entry-form';
    viewSwap(data.view);
    var $selectedEntry = event.target.closest('li');
    var entryId = Number($selectedEntry.getAttribute('data-entry-id'));
    data.editing = matchEntries(entryId);
    document.querySelector('img').setAttribute('src', data.editing.photoURL);
    document.querySelector('#title').setAttribute('value', data.editing.title);
    document.querySelector('#photoURL').setAttribute('value', data.editing.photoURL);
    document.querySelector('#notes').value = data.editing.notes;
  }
});

function matchEntries(id) {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === id) {
      return data.entries[i];
    }
  }
}
