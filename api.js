let countLabel = document.querySelector(".countLabel");
let personnage = document.querySelector(".personnage");
let perso = document.querySelector(".perso");
let main = document.querySelector(".main");
let nav = document.querySelector(".nav");

//recuperer l'id d'une url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

//fonction tout les personnages
async function displayAllCharacters(url) {
  personnage.innerHTML = "";

  if (!url) url = "https://rickandmortyapi.com/api/character ";

  const reponse = await fetch(url);

  const characters = await reponse.json();

  countLabel.textContent = ` il y  a  ${characters.info.count} personnages`;
  let results = characters.results;

  results.map((result) => {
    const fiche = document.createElement("ul");
    fiche.className = `border p-8 text-center rounded-md flex flex-col `;
    fiche.innerHTML = `
        <li><img src="${result.image}"></li>
        <li>${result.name}</li>
        <li>${result.status}</li>
        <li>${result.species}</li>
        <li>${result.type}</li>
        <li>${result.gender}</li>
        <a href="personnage.html?id=${result.id}" class="bg-slate-800 p-2 rounded-md"> Page du personnage </a>`;
    personnage.append(fiche);
  });
  createNav(characters.info.prev, characters.info.next);
}
// bouton suivant et  precedent pour les personnages
function createNav(prev, next) {
  nav.innerHTML = "";
  let navigation = document.createElement("div");

  navigation.className = "ml-8 mr-8 flex justify-between ";
  navigation.innerHTML = `
  <button class="mr-auto" onclick="displayAllCharacters('${prev}')">Prev</button>
  <button class="mr-auto" onclick="displayAllCharacters('${next}')">Next</button> `;
  nav.append(navigation);
}

/// personage episode//

async function displayCharacter(id) {
  //appelle personnage
  const reponse = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`
  );
  const characters = await reponse.json();

  //personnage
  let fichePerso = document.createElement("div");
  fichePerso.className = `text-center`;
  fichePerso.innerHTML = `<img class="w-1/4 mx-auto" src="${characters.image}">
  <p>${characters.name}</p>
  <p>${characters.species}</p>
  <p>${characters.gender}</p>
  <p> lieu : ${characters.location.name} </p>
  <br>
<h2>Les episodes : </h2>`;

  const episodes = characters.episode;

  for (const episodeUrl of episodes) {
    const episodeResponse = await fetch(episodeUrl);
    const episode = await episodeResponse.json();

    fichePerso.innerHTML += ` <div class="text-left m-8"> 
  
    <a href=""> Episode: ${episode.episode}  ${episode.name} </a>
   </div>`;
  }
  perso.append(fichePerso);
}

if (id) {
  displayCharacter(id);
} else {
  displayAllCharacters();
}
