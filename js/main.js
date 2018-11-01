let width = 500,
  height = 0,
  filter = 'none',
  streaming = false;

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const photoButton = document.getElementById('photo-button');
const clearButton = document.getElementById('clear-button');
const photoFilter = document.getElementById('photo-filter');

navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then(function(stream) {
    video.srcObject = stream;
    video.play();
  })
  .catch(function(err) {
    console.log(`Error: ${err}`);
  });

video.addEventListener(
  'canplay',
  function(e) {
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth / width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);

      streaming = true;
    }
  },
  false
);

photoButton.addEventListener(
  'click',
  function(e) {
    takePicture();

    e.preventDefault();
  },
  false
);

photoFilter.addEventListener('change', function(e) {
  filter = e.target.value;
  e.preventDefault();
  video.style.filter = filter;
});

clearButton.addEventListener('click', function(e) {
  //clear images
  photos.innerHTML = '';
  //reset filter
  filter = 'none';
  video.style.filter = filter;
  photoFilter.selectedIndex = 0;
  e.preventDefault();
});

function takePicture() {
  //create canvas
  const context = canvas.getContext('2d');
  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    //take a snapshot of video and add to canvas
    context.drawImage(video, 0, 0, width, height);
    //Create image from the canvas
    const imgUrl = canvas.toDataURL();
    //Create img element and add to the dom
    const img = document.createElement('img');
    img.setAttribute('src', imgUrl);
    //set image filter
    img.style.filter = filter;
    photos.appendChild(img);
  }
}
