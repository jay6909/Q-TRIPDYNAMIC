import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const reservations=await fetch(`${config.backendEndpoint}/reservations`).then((response)=>{
      if(!response.ok){
        return null
      }
      
    return response.json();
    });
    return reservations;

  } catch (error) {
    return null
  }
 

  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  // console.log(reservations)
  const noReserveBanner=document.getElementById("no-reservation-banner");
  const tBody=document.getElementById("reservation-table");
  const tableParent=document.getElementById("reservation-table-parent");
  noReserveBanner.style.display="block"
  tableParent.style.display="none"

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length>0){
    noReserveBanner.style.display="none"
    tableParent.style.display="block"

    
    reservations.forEach((data)=>{
      // let row=`<a hre>`
      let row=document.createElement('tr')
      // console.log(data)
      
      let link=`${location.origin}/frontend/pages/adventures/detail/?adventure=${data.adventure}`
      // let linkA=document.createElement('a')
      // a.href=`${location.origin}/frontend/pages/adventures/detail/?adventure=${data.adventure}`;
      // row.appendChild(lin)
      let dateArr=data.date.split("-")
      let timeStamp= Date.parse(data.time)
      let dateVal = new Date(timeStamp);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };

      let bookingTimeString=dateVal.toLocaleTimeString().toLowerCase()
      let bookingDate=dateVal.toLocaleDateString('en-IN',options)
      // console.log()
      // console.log(dtString.toLocaleString("en-IN"))
      // let bdate=dtString.toLocaleString("en-IN")
      row.innerHTML=`
      <td><a href="${link}">${data.id}</a></td>
      <td>${data.name}</td>
      <td>${data.adventureName}</td>
      <td>${data.person}</td>
      <td>${parseInt(dateArr[2])}/${parseInt(dateArr[1])}/${parseInt(dateArr[0])}</td>
      <td>${data.price}</td>
      <td>${bookingDate}, ${bookingTimeString}</td>
      <td id="${data.id}"><a href="${link}"><button class="reservation-visit-button" > Visit Adventure</button></a></td>`
      // <a href="${location.origin}/frontend/pages/adventures/detail/?adventure=${data.adventure}">
      // row.href=`${location.origin}/frontend/pages/adventures/detail/?adventure=${data.adventure}`
      // row.innerHTML=`<a href="${location.origin}/frontend/pages/adventures/detail/?adventure=${data.adventure}"</a>`
      // let transID=row.insertCell()
      // let bookingName=row.insertCell()
      // let adventure=row.insertCell()
      // let persons=row.insertCell()
      // let dateCell=row.insertCell()
      // let price=row.insertCell()

      // let bookingTime=row.insertCell()
      // let action=row.insertCell()

      // let date=new Date()
      // let dateLocalString=date.toLocaleDateString("en-IN");
      
      // transID.innerHTML=data.id;
      // bookingName.innerHTML=data.name
      // adventure.innerHTML=data.adventureName
      // persons.innerHTML=data.person
      // dateCell.innerHTML=dateLocalString
      // price.innerHTML=data.price
      // bookingTime.innerHTML=data.time
      // action.innerHTML=`<button class="reservation-visit-button" > Visit Adventure</button>`

      tBody.appendChild(row)
    })
  }
  else{
    noReserveBanner.style.display="block"
    tableParent.style.display="none"

  }
 
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
 

}

export { fetchReservations, addReservationToTable };
