import config from "../conf/index.js";

//Implementation to extract city from query params

function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  return params.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  let res = await fetch(`${config.backendEndpoint}/adventures?city=${city}`)
    .then((res) => {
      let data = res.json();
      return data;
    })
    .catch((err) => {
      return null;
    });
  return res;
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((data) => {
    let id = data.id;
    let adventureName = data.name;
    let category = data.category;
    let costPerHead = data.costPerHead;
    let currency = data.currency;
    let duration = data.duration;
    let image = data.image;

    let adventureCont = document.createElement("div");
    // let linkElem=document.createElement('a')
    // let adventureCard=document.createElement('div');
    // let categoryBanner=document.createElement('div');
    // categoryBanner.innerHTML=`<h6>${category}</h6>`
    // if(adventureName.length>10){
    //   adventureName=adventureName.slice(0,10)
    // }
    adventureCont.className = "col-12 col-lg-3 col-md-6 p-3 mb-3";
    adventureCont.innerHTML = `<a href="detail/?adventure=${id}" id="${id}">
        <div class="activity-card">
          <img src="${image}">
          <div class="category-banner">
            <h6>${category}</h6>
          </div>
          <div class="activity-info">
            <div style=" 
            display: flex;
            flex-direction: row;
            justify-content: space-between;"><h6 style="width:50%;">${adventureName}</h6>
            <h6>₹${costPerHead}</h6></div>
            <div style="  
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            "><h6>Duration</h6>
            <h6>${duration} Hours</h6></div>
          
          </div>
        </div>
      </a>`;
    // let activityImg=document.createElement('img')
    // linkElem.href=`detail/?adventure=${id}`;
    // linkElem.id=id
    adventureCont.className = "col-12 col-lg-3 col-md-6 p-3 mb-3";
    // adventureCard.className='activity-card';
    // categoryBanner.className='category-banner';
    // activityImg.src=image

    // adventureCard.append(activityImg,categoryBanner)
    // linkElem.append(adventureCard)
    // adventureCont.append(linkElem)
    document.getElementById("data").append(adventureCont);
    // `<div class="col-12 col-lg-3 col-md-6 p-3 mb-3">
    // <a href="resort/index.html">
    //   <div class="adventure-card">
    //     <img src="../../assets/adventures/resort.jpg" alt="find your adventures in best resorts">

    //     <div class="adventure-card-text d-block d-lg-flex"><h5>Resort</h5>
    //       <p>₹ 1200</p></div>
    //    </div>
    // </a>`
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  

  // let newArr=[];
  list=list.filter((data)=>{if(data.duration>=low &&data.duration<=high){
    return data;
  };});
  return list;
// console.log(newArr)
  // 1. Filter adventures based on Duration and return filtered list
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  if(categoryList.length === undefined || categoryList.length == 0){
    return list
  }
  let newArr=[];
  categoryList.forEach((cat)=>{
    list.filter((dd)=> {if( dd.category==cat){newArr.push(dd);}})
  })
  return newArr;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  let noFilter=filters.category.length<1&&filters.duration.length===0;
    if(noFilter){
    console.log("no filter")
    return list
  }

  else{
    let filteredArray=[];
    let filteredCategory = filterByCategory(list, filters.category);
    let hours=filters.duration.split('-');
    let filteredDuration=filterByDuration(filteredCategory, hours[0],hours[1])
    filteredArray=filterByCategory(filteredDuration,filters.category)
   
    return filteredArray;
  }
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  let stringJson=JSON.stringify(filters);
  localStorage.setItem("filters",stringJson)

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let stringJson=localStorage.getItem("filters");
  let array=JSON.parse(stringJson)
  // Place holder for functionality to work in the Stubs
  return array;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoriesFilter=filters.category;
  let durationFilter=filters.duration;
  const categoryList=document.getElementById('category-list')
  const durationSelector=document.getElementById("duration-select")
  
  let selectedIndex=durationSelector.options["selectedIndex"]
  for (let i=0;i<durationSelector.childElementCount;i++){
    if(durationSelector.children[i].value===durationFilter){
      durationSelector.options["selectedIndex"]=i;
      
    }
    
  }
  // duration.children.forEach((d)=>{
  //   console.log(d)
  // })
  ;

  categoriesFilter.forEach((category)=>{
    let filterPill=document.createElement("div");
    filterPill.textContent=category;
    filterPill.className="category-filter";
    categoryList.appendChild(filterPill)
  })
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
