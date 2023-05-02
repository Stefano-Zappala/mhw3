

function onResponse(response) {
    return response.json();
  }
  
  function onJson(json) {
    console.log(json);
    const ris_ricerca = document.querySelector("#ris_ricerca");
    ris_ricerca.innerHTML = "";
    //processa risultati
   
    for (let i = 0; i < 10; i++) {
      const film = json.Search[i];
      const title = film.Title;
      const year = film.Year;
      const poster = film.Poster;
      const f = document.createElement("div");
      f.classList.add("film");
      const img = document.createElement("img");
      img.src = poster;
      const caption1 = document.createElement("span1");
      const caption2 = document.createElement("span2");
      caption1.textContent = "" + title ;
      caption2.textContent = "Anno uscita: " + year;
      f.appendChild(img);
      f.appendChild(caption1);
      f.appendChild(caption2);
      ris_ricerca.appendChild(f);
    }
  }

  function search_f(event) {
    event.preventDefault(); //impedisce il submit del form
    //leggi valore del campo di testo
    const film_input = document.querySelector("#barra");
    const film_value = encodeURIComponent(film_input.value);
    rest_url = "http://www.omdbapi.com/?apikey=ae2d3f84&s=" + film_value;
    //esegui fetch
    fetch(rest_url).then(onResponse).then(onJson);
  }

  const form_f = document.querySelector("#films");
  form_f.addEventListener("submit", search_f);
  
//=======================================================================================================

function onTokenJson(json) {
  token_data = json;
}

function onTokenResponse(response) {
  return response.json();
}

function onJson_a(json) {
  console.log(json);
  const ris_ricerca_album = document.querySelector("#ris_ricerca_album");
  ris_ricerca_album.innerHTML = "";
  //processa risultati
  const h = document.createElement("h1");
  ris_ricerca_album.appendChild(h);
  const results = json.albums.items;
  for (let i = 0; i < 10; i++) {
    if (results[i].album_type === "album") {
      const album_data = results[i];
      const name = album_data.name;
      const release_date = album_data.release_date;
      const total_tracks = album_data.total_tracks;
      const image_url = album_data.images[0].url;
      const album = document.createElement("div");
      album.classList.add("album");
      const img = document.createElement("img");
      img.src = image_url;
      const caption = document.createElement("span");
      caption.textContent =
        "Titolo: " + name +
        " - Data uscita: " +
        release_date +
        " - Num. Tracce: " +
        total_tracks;

      album.appendChild(img);
      album.appendChild(caption);
      ris_ricerca_album.appendChild(album);
    }
  }
}

function search_a(event) {
  event.preventDefault();
  //leggi valore del campo di testo
  const film_input_album = document.querySelector("#barra");
  const film_album_value = encodeURIComponent(film_input_album.value);
  //esegui fetch
  fetch("https://api.spotify.com/v1/search?type=album&q=" + film_album_value, {
    headers: {
      Authorization: "Bearer " + token_data.access_token,
    },
  })
    .then(onResponse)
    .then(onJson_a);
}


let token_data;
const client_id = "b75d757963414e9089f3ca0649df20d8";
const client_secret = "4ebdb1c193424f5094a8bf0327ef1a43";


fetch("https://accounts.spotify.com/api/token", {
  method: "post",
  body: "grant_type=client_credentials",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic " + btoa(client_id + ":" + client_secret),
  },
})
  .then(onTokenResponse)
  .then(onTokenJson);

 

  const form_a = document.querySelector("#films");
  form_a.addEventListener("submit", search_a);
  



