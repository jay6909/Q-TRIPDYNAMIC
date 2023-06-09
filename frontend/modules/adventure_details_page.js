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
  try {
    let res = await fetch(
      `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
    )
      .then((data) => data.json())
      // .then((data) => arr.push(data))

      .catch((err) => console.log(err));
    return res;
  } catch (error) {
    return null;
  }
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
  // addBootstrapPhotoGallery(images)
  document.getElementById("adventure-content").textContent = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  //photo-gallery
  const imgarray=images
  console.log(imgarray)
  let photoGallery=document.getElementById('photo-gallery');
  photoGallery.innerHTML=""
  // console.log(imgarray[1])

  let carouselInner=document.createElement("div");
  // console.log(imgarray[2])


  photoGallery.className="carousel slide";
  photoGallery.setAttribute('data-bs-ride',"carousel")
  carouselInner.className="carousel-inner";
  for(let i=0;i<images.length;i++){
    let cItem=document.createElement('div');
    if(i==0) cItem.className="carousel-item active";
    else{ 
      cItem.className="carousel-item"
    }
    
    cItem.innerHTML=` <img
    src="${imgarray[i]}"
    class="activity-card-image"
    alt="..."
  />`
  carouselInner.appendChild(cItem);
  }
  let prevButton=document.createElement('button')
  let nextButton=document.createElement('button')
  prevButton.className="carousel-control-prev"
  prevButton.type="button"
  prevButton.setAttribute('data-bs-target','#photo-gallery')
  prevButton.setAttribute('data-bs-slide','prev');
  prevButton.innerHTML=`<span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>`

  nextButton.className="carousel-control-next"
  nextButton.type="button"
  nextButton.setAttribute('data-bs-target','#photo-gallery')
  nextButton.setAttribute('data-bs-slide','next');
  nextButton.innerHTML=`<span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>`
  photoGallery.append(carouselInner,prevButton,nextButton)

//   images.forEach((img)=>{let cItem=document.createElement('div');
// cItem.class})

//   ` <div
//   id="carouselExampleControls"
//   class="carousel slide"
//   data-bs-ride="carousel"
// >
//   <div class="carousel-inner">
//     <div class="carousel-item active">
//       <img
//         src="https://img.freepik.com/free-photo/beautiful-view-greenery-bridge-forest-perfect-background_181624-17827.jpg?w=2000"
//         class="d-block w-100"
//         alt="..."
//       />
//     </div>
   
    
//   </div>
//   <button
//     class="carousel-control-prev"
//     type="button"
//     data-bs-target="#carouselExampleControls"
//     data-bs-slide="prev"
//   >
//     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//     <span class="visually-hidden">Previous</span>
//   </button>
//   <button
//     class="carousel-control-next"
//     type="button"
//     data-bs-target="#carouselExampleControls"
//     data-bs-slide="next"
//   >
//     <span class="carousel-control-next-icon" aria-hidden="true"></span>
//     <span class="visually-hidden">Next</span>
//   </button>
// </div>`
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
