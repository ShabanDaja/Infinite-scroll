const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = "qgaFemBA2ib2b6yqn3NQphuuiu8sC22yA0BfdInkCBE";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Event Listener, check when each is finished loading
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper Function
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  //For Each method
  photosArray.forEach((photo) => {
    //Create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for pohoto
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener("load", imgageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// get photos from unspalsh API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

//Check to see if scrolling, load more Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + windows.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
