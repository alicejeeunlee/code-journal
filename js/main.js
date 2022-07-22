var $photoURL = document.querySelector('#photoURL');
var $img = document.querySelector('img');

$photoURL.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
});

var $form = document.querySelector('form');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  if (data.editing !== null) {
    data.editing.title = $form.elements.title.value;
    data.editing.photoURL = $form.elements.photoURL.value;
    data.editing.notes = $form.elements.notes.value;
    var entryId = data.editing.entryId;
    var $allLi = document.querySelectorAll('li');
    for (var i = 0; i < $allLi.length; i++) {
      if (Number($allLi[i].dataset.entryId) === entryId) {
        $allLi[i].replaceWith(renderEntry(data.editing));
      }
    }
  } else {
    var formData = {
      title: $form.elements.title.value,
      photoURL: $form.elements.photoURL.value,
      notes: $form.elements.notes.value
    };
    formData.entryId = data.nextEntryId;
    data.nextEntryId = data.nextEntryId + 1;
    data.entries.unshift(formData);
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
    var $ul = document.querySelector('ul');
    $ul.prepend(renderEntry(formData));
  }
  $form.reset();
  var $entryForm = document.querySelector('#form');
  var $entries = document.querySelector('#entries');
  $entryForm.className = 'container data-form hidden';
  $entries.className = 'container data-entries';
  var $entriesDataView = $entries.getAttribute('data-view');
  data.view = $entriesDataView;
  var $noEntriesMessage = document.querySelector('.no-entries');
  $noEntriesMessage.className = 'no-entries hidden';
  document.querySelector('img').setAttribute('src', 'images/placeholder-image-square.jpg');
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
    $form.reset();
    document.querySelector('img').setAttribute('src', 'images/placeholder-image-square.jpg');
    data.editing = null;
    data.view = 'entries';
    viewSwap(data.view);
    showAllEntries();
  }
});

var $newButton = document.querySelector('.new-button');

$newButton.addEventListener('click', function (event) {
  $form.reset();
  document.querySelector('img').setAttribute('src', 'images/placeholder-image-square.jpg');
  data.view = 'entry-form';
  data.editing = null;
  viewSwap(data.view);
  document.querySelector('h2').textContent = 'New Entry';
  $modalWindow.className = 'backdrop hidden';
  var $deleteButton = document.querySelector('.delete-button');
  $deleteButton.className = 'delete-button hidden';
  var $buttonDiv = document.querySelector('.button-align');
  $buttonDiv.className = 'button-align flex-end';
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
    document.querySelector('h2').textContent = 'Edit Entry';
    $modalWindow.className = 'backdrop hidden';
    var $deleteButton = document.querySelector('.delete-button');
    $deleteButton.className = 'delete-button';
    var $buttonDiv = document.querySelector('.button-align');
    $buttonDiv.className = 'button-align space-between';
    var $selectedEntry = event.target.closest('li');
    var entryId = Number($selectedEntry.getAttribute('data-entry-id'));
    data.editing = matchEntries(entryId);
    document.querySelector('img').setAttribute('src', data.editing.photoURL);
    document.querySelector('#title').value = data.editing.title;
    document.querySelector('#photoURL').value = data.editing.photoURL;
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

var $deleteButton = document.querySelector('.delete-button');
var $modalWindow = document.querySelector('.backdrop');

$deleteButton.addEventListener('click', function (event) {
  if (event.target.matches('.delete-button')) {
    $modalWindow.className = 'backdrop';
  }
});

var $cancelButton = document.querySelector('.cancel-button');

$cancelButton.addEventListener('click', function (event) {
  if (event.target.matches('.cancel-button')) {
    $modalWindow.className = 'backdrop hidden';
  }
});

var $confirmButton = document.querySelector('.confirm-button');
$confirmButton.addEventListener('click', function (event) {
  var entryId = data.editing.entryId;
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === entryId) {
      data.entries.splice(i, 1);
    }
  }
  var $allEntry = document.querySelectorAll('.entry');
  for (var k = 0; k < $allEntry.length; k++) {
    if (Number($allEntry[k].getAttribute('data-entry-id')) === entryId) {
      $allEntry[k].remove();
    }
  }
  if (data.entries.length === 0) {
    var $noEntriesMessage = document.querySelector('.no-entries');
    $noEntriesMessage.className = 'no-entries';
  }
  data.view = 'entries';
  viewSwap(data.view);
});

var $searchButton = document.querySelector('.search-button');
var $searchInput = document.querySelector('#search');
$searchButton.addEventListener('click', function (event) {
  var $input = document.querySelector('#search').value.toLowerCase();
  var $allEntry = document.querySelectorAll('.entry');
  for (var i = 0; i < $allEntry.length; i++) {
    if (!$allEntry[i].textContent.toLowerCase().includes($input)) {
      $allEntry[i].className = 'row entry hidden';
    } else {
      $allEntry[i].className = 'row entry';
    }
  }
  $searchInput.value = null;
});

function showAllEntries() {
  var $allEntry = document.querySelectorAll('.entry');
  for (var i = 0; i < $allEntry.length; i++) {
    $allEntry[i].className = 'row entry';
  }
}

$searchInput.addEventListener('focus', function (event) {
  showAllEntries();
});
