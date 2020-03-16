window.addEventListener("load", async () => {
  const trackID = document.querySelector(".trackID").textContent;

  const response = await await fetch(
    `https://deezerdevs-deezer.p.rapidapi.com/track/${trackID}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "deaa3b41demshe62baacf17b1f37p12378bjsn88fe297726f5"
      }
    }
  );
  const json = await response.json();
  document.querySelector(".trackID").innerHTML = '';
  console.log(json);
  

  const block = document.querySelector(".container");

  const div = document.createElement("div");
    let time =
      Math.floor(json.duration / 60) + ":" + (json.duration % 60);
      if(time.length === 3){
        time = time.split(':').splice(0,1).join('') + ':0' + time.split(':').splice(1,1).join('')
      }
    div.className = "column column-track";
    div.innerHTML += `<h2 class="title">${json.title}</h2>`;
    div.innerHTML += `<a class="column-play" href="#">Play<audio><source src="${json.preview}"</audio></a></span>`;
    div.innerHTML += `<span class="column-time">Длительность: ${time}</span>`;
    div.innerHTML += `<span>Исполнитель: </span> <a class="column-track-artist" href="/artist/${json.artist.id}"> ${json.artist.name}</a>`;
    div.innerHTML += `<span>Альбом: </span> <a class="column-track-album" href="/album/${json.album.id}"> ${json.album.title}</a>`;
    div.innerHTML += `<a href="https://www.deezer.com/track/${json.id}" class="listen">Полная версия</a>`;
    div.innerHTML += `<a class="column-add" href="/personal/track" id="${json.id}">Добавить в плейлист</a>`;
    div.innerHTML += `<span class="release">Дата релиза: ${json.release_date}</span>`;
    block.appendChild(div);

});
