const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = "qgaFemBA2ib2b6yqn3NQphuuiu8sC22yA0BfdInkCBE";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// get photos from unspalsh API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

getPhotos();
