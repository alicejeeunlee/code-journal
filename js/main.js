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
  data.nextEntryId = data.nextEntryId++;
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
  for (var j = 0; j < $allView.length; j++) {
    if ($allView[j].getAttribute('data-view') === data.view) {
      $allView[j].className = 'container view';
    } else {
      $allView[j].className = 'container view hidden';
    }
  }
});

var $nav = document.querySelector('nav');
var $allView = document.querySelectorAll('.view');

$nav.addEventListener('click', function (event) {
  if (event.target.matches('.entries-link')) {
    for (var i = 0; i < $allView.length; i++) {
      if ($allView[i].getAttribute('data-view') === 'entries') {
        $allView[i].className = 'container view';
      } else {
        $allView[i].className = 'container view hidden';
      }
    }
  }
  data.view = 'entries';
});

var $newButton = document.querySelector('.new-button');
$newButton.addEventListener('click', function (event) {
  if (event.target.matches('.new-button')) {
    for (var i = 0; i < $allView.length; i++) {
      if ($allView[i].getAttribute('data-view') === 'entry-form') {
        $allView[i].className = 'container view';
      } else {
        $allView[i].className = 'container view hidden';
      }
    }
  }
  data.view = 'entry-form';
});

var $noEntriesMessage = document.querySelector('.no-entries');
if (data.entries.length > 0) {
  $noEntriesMessage.className = 'no-entries hidden';
}
