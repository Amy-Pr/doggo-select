const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------


fetch('https://dog.ceo/api/breeds/image/random')
    //.then(response=>console.log(response)) //returns a response object that lets us know the status (pass = 200). The actual content is in the body property. To access the data, need to parse to JSON
    .then(response => response.json())//returns raw data in json format; returns a promise
    .then(data => generateImage(data.message)) //console logged just "data" first to take a look at the shape of the object. It has a "message" property with the value of the url I want as a string. 


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function generateImage(data) { //create a template literal and insert the value of the data using interpolation
    const html = ` 
          <img src="${data}" alt>
          <p>Click to view images of ${select.value}s</p>
      `;
    card.innerHTML = html;
  }

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------



// ------------------------------------------
//  POST DATA
// ------------------------------------------
