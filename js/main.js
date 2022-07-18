var $photoURL = document.querySelector('#photoURL');
var $img = document.querySelector('img');

function PhotoURLInput(event) {
  $img.setAttribute('src', event.target.value);
}

$photoURL.addEventListener('input', PhotoURLInput);
