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
});

function renderEntry(entry) {
  var $li = document.createElement('li');
  $li.setAttribute('class', 'row entry');
  var $img = document.createElement('img');
  $img.setAttribute('src', entry.photoURL);
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

renderEntry(data.entries[0]);
