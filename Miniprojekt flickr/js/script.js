

// Flickr API: 
const KEY = '54156eed62c1bb8f51a3faae90d2a174';
let searchText = 'jaw s';

//Vi söker endast på 1foto per sida och 1 sida
let url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${searchText}&format=json&nojsoncallback=1&per_page=1&page=1`;


//här ska vi pussla ihop bild-urlen
function getImageUrl(photoObject) {

  let photo = photoObject;
  let size = imageSize.value;

  let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;

  // console.log(imgUrl);
  displayImg(imgUrl);
}

//för att visa bilden
function displayImg(url) {
  let img = document.createElement('img');
  img.src = url;

  // document.body.appendChild(img);
  document.getElementById('flexboxen').appendChild(img)
  console.log('urlen: ', url)
}

////////////

const btn = document.getElementById('submit');

btn.addEventListener('click', function (e) {
  e.preventDefault();


  const removeIt = document.querySelectorAll('img');
  for (let i = 0; i < removeIt.length; i++) {
    const el = removeIt[i];
    el.remove();
  }



  const imageTxtInput = document.getElementById('imageText');
  const imageSize = document.getElementById('imageSize');
  const imageNumber = document.getElementById('imageNmbr');




  console.log(imageTxtInput.value, imageSize.value, imageNumber.value);

  url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${imageTxtInput.value}&format=json&nojsoncallback=1&per_page=${imageNumber.value}&page=1`;

  fetch(url).then(
    function (response) {
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      else {
        throw 'Something went wrong. :(';
      }
    }
  ).then(
    function (data) {
      console.log(imageNumber.length);
      
      for(let i = 0; i<imageNumber.value; i++){
        getImageUrl(data.photos.photo[i]);

      }
      //Vi hämtar första bilden
    }
  ).catch(
    function (error) {
      alert ('Hej kompis, Du fick ett error i texten, testa skriv någonting annat som sökord, kram!')
      console.log(error);
    }
  );


})

// const imageTxtInput = document.getElementById('imageText');
// const imageSize = document.getElementById('imageSize');
// const imageNumber = document.getElementById('imageNmbr');


