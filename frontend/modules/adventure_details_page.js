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
    const res = await fetch(
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
  const content=adventure.content
  const subtitle=adventure.subtitle;
  document.getElementById("adventure-name").textContent = adventureName;
  document.getElementById("adventure-subtitle").textContent = subtitle;
  images.forEach((image) => {
    const img = document.createElement("img");
    img.src = image;
    img.className = "activity-card-image";
    document.getElementById("photo-gallery").appendChild(img);
  });
  // addBootstrapPhotoGallery(images)
  document.getElementById("adventure-content").textContent = content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  //photo-gallery
  const photoGallery=document.getElementById('photo-gallery');
  photoGallery.innerHTML=""

  const carouselInner=document.createElement("div");
  const carouselIndicator=document.createElement("div");

  carouselIndicator.className='carousel-indicators';
  photoGallery.setAttribute('data-bs-ride',"carousel")


  photoGallery.className="carousel slide";
  carouselInner.className="carousel-inner";

  for(let i=0;i<images.length;i++){
    const cItem=document.createElement('div');
    const slideButton=document.createElement('button')
    slideButton.setAttribute("data-bs-target","#photo-gallery");
    slideButton.setAttribute("data-bs-slide-to",`${i}`);

    if(i==0) {
      slideButton.setAttribute("class","active");
      slideButton.setAttribute("aria-current","true");
      slideButton.setAttribute("aria-label",`Slide ${i+1}`);
      cItem.className="carousel-item active";
    }
  else{ 
      slideButton.setAttribute("aria-label",`Slide ${i+1}`);
      cItem.className="carousel-item"
    }
    
    cItem.innerHTML=` <img
    src="${images[i]}"
    class="activity-card-image"
    alt="..."
  />`
  carouselInner.appendChild(cItem);
  carouselIndicator.appendChild(slideButton);
  }

  const prevButton=document.createElement('button')
  const nextButton=document.createElement('button')

  prevButton.setAttribute('data-bs-target','#photo-gallery')
  prevButton.setAttribute('data-bs-slide','prev');

  nextButton.setAttribute('data-bs-target','#photo-gallery')
  nextButton.setAttribute('data-bs-slide','next');

  prevButton.className="carousel-control-prev"
  nextButton.className="carousel-control-next"

  prevButton.type="button"
  nextButton.type="button"

  prevButton.innerHTML=`<span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>`
  
  nextButton.innerHTML=`<span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>`

  
  // .innerHTML=`<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  // <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
  // <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>`

  photoGallery.append(carouselIndicator,carouselInner,prevButton,nextButton)


}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const soldOutPanel=document.getElementById('reservation-panel-sold-out');
  const reservationPanel=document.getElementById('reservation-panel-available');
  

soldOutPanel.style.display="block";
reservationPanel.style.display="block";

    if(!adventure.reserved){
      
      soldOutPanel.style.display="none";
      reservationPanel.style.display="block";
      document.getElementById('reservation-person-cost').textContent=adventure.costPerHead


    } 

    if(!adventure.available){
      reservationPanel.style.display="none";
      soldOutPanel.style.display="block";

    }
    // else{

    // }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const perHeadCost=adventure.costPerHead;

  const price=perHeadCost*persons;

  document.getElementById('reservation-person-cost').textContent=perHeadCost

  document.getElementById('reservation-cost').textContent=price
  
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
    // const form=document.getElementById("myForm");
    let reserveObj={}
   

    document.getElementById("myForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const params = new URLSearchParams(new FormData(e.target));
// console.log()
     reserveObj={
      name:params.get('name'),
      date:params.get('date'),
      person:params.get('person'),
      adventure:adventure.id,
    };

   
      // console.log(reserveObj)

      const options={
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      body: JSON.stringify(reserveObj), // body data type must match "Content-Type" header
      }
      const responseFromServer= fetch(`${config.backendEndpoint}/reservations/new`, options).then((data)=> {
        if(!data.ok){
          // return null;
          alert("Failed!")
        }
        else{
          alert("Success!")
          return data.json();
        }
        
    });
    console.log(responseFromServer)
        return responseFromServer;
      
      
    });

 
  // const data=newReservation.json();
  
  }

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display="block"
  }
  else{
    document.getElementById("reserved-banner").style.display="none"

  }
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
