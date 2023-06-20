import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // console.log(`${config.backendEndpoint}/cities`)
  // 1. Fetch cities using the Backend API and return the data
   let res=await fetch(`${config.backendEndpoint}/cities`).then((res)=>{
    return res.json();
   }).catch((err)=>{return null})
  return res;
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  let divCityCard= document.createElement("div");
  let divTileElem= document.createElement("div");
  let divTileTextElem= document.createElement("div");
  let linkElem=document.createElement("a");
  let imgElem= document.createElement("img");

  divCityCard.className="col-sm-6 col-lg-3 mb-4"
  divTileElem.classList.add("tile")
  divTileTextElem.classList.add("tile-text")

  divTileTextElem.innerHTML=` <h5>${city}</h5><p>${description}</p>`;
  
  linkElem.href=`pages/adventures/?city=${id}`
  linkElem.id=city.toLowerCase()
  imgElem.src=image
  divTileElem.append(divTileTextElem,imgElem);
  linkElem.append(divTileElem)
  divCityCard.append(linkElem)

  // 1. Populate the City details and insert those details into the DOM
  document.getElementById("data").append(divCityCard)


}

export { init, fetchCities, addCityToDOM };
