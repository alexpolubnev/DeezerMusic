const content = document.querySelector(".content");
const titleDiv = document
  .querySelector(".container")
  .querySelector(".title-div");

document.addEventListener("submit", async event => {
  if (event.target.className === "search") {
    event.preventDefault();
    const title = document.querySelector(".title");
    if (title) {
      titleDiv.removeChild(title);
    }
    const search = event.target.search.value;
    titleDiv.innerHTML += `<h2 class="title" name="title">${search}</h2>`;
    addToDom(search);
  }
});

document.addEventListener("click", event => {
  if (event.target.className === "next" || event.target.className === "prev") {
    event.preventDefault();
    console.log(
      "https://deezerdevs-deezer.p.rapidapi.com/search?q=",
      event.target.href
    );
    const newUrl = event.target.href.split("3000/");
    addToDom(newUrl[1]);
  }
});

async function addToDom(url) {
  content.innerHTML = "";

  let response = await await fetch(
    `https://deezerdevs-deezer.p.rapidapi.com/search?q=${url}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "deaa3b41demshe62baacf17b1f37p12378bjsn88fe297726f5"
      }
    }
  );
  let json = await response.json();

  console.log(json);

  content.innerHTML += `<div class="content-tracks content-type"></div>`;

  const tracks = document.querySelector(".content-tracks");

  json.data.forEach(element => {
    const div = document.createElement("div");
    let time =
      Math.floor(element.duration / 60) + ":" + (element.duration % 60);
    if (time.length === 3) {
      time =
        time
          .split(":")
          .splice(0, 1)
          .join("") +
        ":0" +
        time
          .split(":")
          .splice(1, 1)
          .join("");
    }
    div.className = "column column-track";
    div.innerHTML += `<a href="/track/${element.id}"class="column-title">${element.title_short}</a>`;
    div.innerHTML += `<a class="column-play" href="#">Play<audio><source src="${element.preview}"</audio></a></span>`;
    div.innerHTML += `<span class="column-time">Длительность: ${time}</span>`;
    div.innerHTML += `<span>Исполнитель: </span> <a class="column-track-artist" href="/artist/${element.artist.id}"> ${element.artist.name}</a>`;
    div.innerHTML += `<span>Альбом: </span> <a class="column-track-album" href="/album/${element.album.id}"> ${element.album.title}</a>`;
    div.innerHTML += `<a href="https://www.deezer.com/track/${element.id}" class="listen">Полная версия</a>`;
    div.innerHTML += `<a class="column-add" href="/personal/track" id="${element.id}">Добавить в плейлист</a>`;
    tracks.appendChild(div);
  });
  const firstSearch = document.querySelector(".title").textContent;
  if (url === firstSearch && json.data.length < json.total) {
    content.innerHTML += `<a class="next" href="${firstSearch}&index=25">Следующая страница</a>`;
  } else if (json.data.length < json.total) {
    const numberString = url
      .split("")
      .splice(-2, 2)
      .join("");
    const number = Number(numberString);
    if (number === 25) {
      content.innerHTML += `<a class="prev" href="${firstSearch}">Предыдущая страница</a>`;
      content.innerHTML += `<a class="next" href="${firstSearch}&index=50">Следующая страница</a>`;
    } else {
      content.innerHTML += `<a class="prev" href="${firstSearch}&index=${number -
        25}">Предыдущая страница</a>`;
      content.innerHTML += `<a class="next" href="${firstSearch}&index=${number +
        25}">Следующая страница</a>`;
    }
  }
}

// ДОДЕЛАТЬ ПЛЕЙ ПО НАЖАТИЮ

document.addEventListener("click", event => {
  if (event.target.className === "column-play") {
    event.preventDefault();
    if (event.target.textContent === "Play") {
      event.target.querySelector("audio").play();
      event.target.childNodes[0].textContent = "Stop";
    } else {
      event.target.querySelector("audio").pause();
      event.target.childNodes[0].textContent = "Play";
    }
  } else if (event.target.className === "column-add") {
    event.preventDefault();
    const personal = document.querySelector(".personal");
    if (personal) {
      const trackId = event.target.id;
      fetch(`/personal/${trackId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          console.log(response);
          if (response.error !== 'error'){
            const parent = event.target.parentNode
            parent.innerHTML += '<span class="comlite">Трек добавлен!</span>'
            parent.removeChild(parent.querySelector('.column-add'));
          }else {

          }
        })
    } else {
      window.location = "http://localhost:3000/login";
    }
  }
});








