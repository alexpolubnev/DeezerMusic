window.addEventListener("load", async () => {
  const artistID = document.querySelector(".artistID").textContent;

  const response1 = await await fetch(
    `https://deezerdevs-deezer.p.rapidapi.com/artist/${artistID}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "deaa3b41demshe62baacf17b1f37p12378bjsn88fe297726f5"
      }
    }
  );
  const json1 = await response1.json();
  document.querySelector(".artistID").innerHTML = '';
  console.log(json1);
  

  const block = document.querySelector(".container");
  block.innerHTML += `<h2 class="title">${json1.name}</h2>
  <div class="image-artist"><img src="${json1.picture_big}"></div>
                          <div class="content"></div>`;
  const content = document.querySelector(".content");

  const response = await await fetch(
    `https://deezerdevs-deezer.p.rapidapi.com/artist/${artistID}/top?limit=50`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "deaa3b41demshe62baacf17b1f37p12378bjsn88fe297726f5"
      }
    }
  );
  const json = await response.json();
  console.log(json);


    json.data.forEach(element => {
      const div = document.createElement("div");
      let time =
        Math.floor(element.duration / 60) + ":" + (element.duration % 60);
        if(time.length === 3){
          time = time.split(':').splice(0,1).join('') + ':0' + time.split(':').splice(1,1).join('')
        }
      div.className = "column column-track";
      div.innerHTML += `<a href="/track/${element.id}"class="column-title">${element.title_short}</a>`;
      div.innerHTML += `<a class="column-play" href="#">Play<audio><source src="${element.preview}"</audio></a></span>`;
      div.innerHTML += `<span class="column-time">Длительность: ${time}</span>`;
      div.innerHTML += `<span>Исполнитель: </span> <a class="column-track-artist" href="/artist/${element.artist.id}"> ${element.artist.name}</a>`;
      div.innerHTML += `<a href="https://www.deezer.com/track/${element.id}" class="listen">Полная версия</a>`;
      div.innerHTML += `<a class="column-add" href="/personal/track" id="${element.id}">Добавить в плейлист</a>`;
      content.appendChild(div);
    });
});
