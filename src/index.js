let breeds = [];

document.addEventListener('DOMContentLoaded', function () {
  loadImages();
  loadBreedOptions();
});

function loadImages() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  fetch(imgUrl)
    .then(res=> res.json())
    .then(results => {
      results.message.forEach(image => addImage(image))
    });
}

function addImage(dogPicUrl) {
  let container = document.querySelector('#dog-image-container');
  let newImageEl = document.createElement('img');
  newImageEl.src = dogPicUrl;
  container.appendChild(newImageEl);
}

function loadBreedOptions() {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  fetch(breedUrl)
    .then(res => res.json())
    .then(results => {
      // this adds all of the keys from the object to the variable at the top of the file
      //results.message is essentially a value that is another object filled with key/value pairs where the breed is the key and the value is an empty array
      breeds = Object.keys(results.message);
      // the newly updated breeds variable is then passed as a argument to the updateBreedList function which will remove the children from the unordered list of dog breeds on the DOM and for each object the breed is picked out and added to the DOM
      updateBreedList(breeds);
      // the event listener is invoked at the end 
      addBreedSelectListener();
    });
}

function updateBreedList(breeds) {
  let ul = document.querySelector('#dog-breeds');
  removeChildren(ul);
  breeds.forEach(breed => addBreed(breed));
}

// I am confused by this function...are we removing every breed and then add new breeds based on the API?? I think that is what is happening...and I guess that would make sense given
function removeChildren(element) {
  //element = ul#dog-breeds
  //remove the children of the dog breeds
  let child = element.lastElementChild;
  while (child) {
    console.log('line 47:', child)
    element.removeChild(child);
    child = element.lastElementChild;
  }
}

function selectBreedsStartingWith(letter) {
  //The filter() method creates a new array with all elements that pass the test implemented by the provided function (callback func).
  updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectListener() {
  let breedDropdown = document.querySelector('#breed-dropdown');
  breedDropdown.addEventListener('change', function (event) {
    selectBreedsStartingWith(event.target.value);
  });
}

function addBreed(breed) {
  let ul = document.querySelector('#dog-breeds');
  let li = document.createElement('li');
  li.innerText = breed;
  li.style.cursor = 'pointer';
  ul.appendChild(li);
  li.addEventListener('click', updateColor);
}

function updateColor(event) {
  event.target.style.color = 'palevioletred';
}