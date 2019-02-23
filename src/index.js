// import axios from "babel";
import axios from "axios";

const ALBUMS_LINK = "https://jsonplaceholder.typicode.com/albums",
  ALBUMS_ID_LINK = "https://jsonplaceholder.typicode.com/photos?albumId=",
  LIST_CONTENT = document.querySelector(".list__content");

let albumList = document.querySelector(".list"),
  listGrid = document.querySelector(".list__grid");

//addEventListener("load", getData);

/**
 * Get All albums
 * @param {Array} data
 */
function displayAlbumList(data) {
  if (data && data.length !== 0) {
    data.forEach(el => {
      albumList.innerHTML += `
        <li class="list__item" data-id="${el.id}">${el.title}</li>
    `;
    });
  }
}


// Get data after load
function getData() {
  let hasLoad = false;
  axios
    .get(ALBUMS_LINK)
    .then(res => {
      if (res.status === 200 && !hasLoad) {
        hasLoad = true;
        return displayAlbumList(res.data);
      } else {
        LIST_CONTENT.textContent = "იტვირთება მონაცემები";
      }
    })
    .then(_ => {
      document
        .querySelectorAll(".list__item")
        .forEach(el => el.addEventListener("click", getAlbums));
    });
}


function displayAlbumThumbnail(data) {
  if (data && data.length !== 0) {
    data.forEach(el => {
      listGrid.innerHTML += `
        <li class="list__grid__item" data-id="${el.id}">
           <a href="${el.thumbnailUrl}" target="_blank">
            <img src="${el.thumbnailUrl}" />
            </a>
        </li>
    `;
    });
  }
}
// Get Thumbnail Albums
function getAlbums(e) {
  let target = e.target,
    id = target.getAttribute("data-id");

  if (id) {
    axios.get(ALBUMS_ID_LINK + id).then(res => {
      return displayAlbumThumbnail(res.data);
    });
  }
}

function* generator() {
  let i = 0;
  while(true){
    yield i;
    i += 2;
  }

}

let gn = generator();

for (let i = 0; i <= 10; i++) {
  gn.next().value;
}
