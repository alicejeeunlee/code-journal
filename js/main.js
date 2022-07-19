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
