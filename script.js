const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// ? Unsplash API, filter random en parameter count toegevoegd
const count = 30;
const apiKey = config.My_API_Key;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// ? Check if all images loaded
function imageLoaded() {
  imagesLoaded++;
  console.log("images loaded");
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log("ready =", ready);
  }
}

// ? Elements for links & photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("total images", totalImages);

  // ? Run function for each object in photosArray
  photosArray.forEach((photo) => {
    //* Create <a> anker element to link to Unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");
    //* Create <img> to display photo
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);
    // ? Check when each is finished loading with event listener
    img.addEventListener("load", imageLoaded);
    //* Put <img> in <a> and both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// ? Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    //const data = await response.json();
    //console.log(data);
    photosArray = await response.json();
    //console.log(photosArray);
    displayPhotos();
  } catch (error) {
    alert("Oops, something went wrong...");
    //console.log(error);
  }
}

// ? When almost eaching bottom page scrolling, load more photos
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// ? On load
getPhotos();
