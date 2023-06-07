import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);

  // Place holder for functionality to work in the Stubs
  return params.get("adventure");
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  // fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`)
  //       .then(res => res.json())
  //       .then((data) => {

  //           console.log(data);
  //       }).catch(err => console.error(err));
  let res=await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
  let data= res.json();
  if(res.status!==200) return null;
  else{
    return data
  }
  // if(data.status==200){
    return data;
  // }
  return null;
  // let res = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`).then((res)=>{
  //   let data=res.json();
  //   return data;
  // }).catch((err)=>{
  //   return null
  // })
  // console.log(res)
  // Place holder for functionality to work in the Stubs
  return res;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const adventureName = adventure.name;
  const images = adventure.images;
  document.getElementById("adventure-name").textContent = adventureName;
  document.getElementById("adventure-subtitle").textContent =
    adventure.subtitle;
  images.forEach((image) => {
    let img = document.createElement("img");
    img.src = image;
    img.className = "activity-card-image";
    document.getElementById("photo-gallery").appendChild(img);
  });
  document.getElementById("adventure-content").textContent = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
