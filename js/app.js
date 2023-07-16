const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url) {
    return fetch(url)
      .then(checkStatus)
      .then(response => response.json())
      .catch(error => console.log('Looks like there was a problem', error))
  
  }
  
Promise.all([
    fetchData('https://dog.ceo/api/breeds/list'),
    fetchData('https://dog.ceo/api/breeds/image/random')
])
//.then(data => console.log(data)) //This will return an array of two objects, each with a separate message property containing the data we want
  .then(data => {
    const breedList = data[0].message;
    const randomImage = data[1].message;

    generateOptions(breedList);
    generateImage(randomImage);
  })


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response) {
    if(response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function generateOptions(data) {
    const options = data.map(item => `
      <option value='${item}'>${item}</option>
  `).join(''); //used join to get rid of the commas that were in the array
    select.innerHTML = options; 
  }


function generateImage(data) { //create a template literal and insert the value of the data using interpolation
    const html = ` 
          <img src="${data}" alt>
          <p>Click to view images of ${select.value}s</p>
      `;
    card.innerHTML = html;
  }

  function fetchBreedImage() {
    const breed = select.value;
    const img = card.querySelector('img');
    const p = card.querySelector('p');

    fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(data => {
            img.src = data.message;
            img.alt = breed;
            p.textContent = `Click to view more ${breed}s`;
        })
  }

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

select.addEventListener('change', fetchBreedImage);
card.addEventListener('click', fetchBreedImage);
form.addEventListener('submit', postData);

// ------------------------------------------
//  POST DATA
// ------------------------------------------

function postData(e) {
    e.preventDefault();//cancels the browser's default submit behavior
    const name = document.getElementById('name').value;
    const comment = document.getElementById ('comment').value;

    fetch('https://jsonplaceholder.typicode.com/comments', {
        method: 'POST', //the type of request, not case sensitive but best practice
        headers: {
            'Content-Type': 'application/json'//communicates that the data has been coded with json
        },
        body: JSON.stringify({name: name, comment: comment}) //ES6 can shorten key/values when they are the same {name, comment}
    })
        .then(checkStatus)
        .then(response => response.json())
        .then(data => console.log(data)) //This will get us all of the comments from the server, instead of posting because fetch's default method is "get"

}