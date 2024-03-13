const detailCountry=document.querySelector(".country");
const backtorest=document.querySelector(".backtorest");
console.log(backtorest);
backtorest.addEventListener("click",function(){
 window.history.back();

})
let query=window.location.search;
let countryName = new URLSearchParams(query).get("name");
console.log(countryName);
function getCountry() {
  fetch("https://restcountries.com/v3.1/name/" +countryName)
    .then((res) => res.json())
    .then((olke) => {
      repeatdetailcountry(olke);
    });
}
getCountry();
function repeatdetailcountry(olke){
    console.log(olke);
    detailCountry.innerHTML="";
    const arr = [];

    olke.forEach(function(item){
      console.log(item);
      if(item.borders){
      item.borders.map(border=>{
        console.log(border);
        fetch("https://restcountries.com/v3.1/alpha/"+border)
          .then((res)=>res.json())
          .then(data=>{
            arr.push(data[0].name.common);
          }) .then(()=>{
            if(arr.length==item.borders.length)
            getBorders(item,arr)
          })
        
      })}else {
        getBorders(item,arr);
      }
       

      
    });
}

const getBorders = (item,arr)=>{        console.log(arr);
  detailCountry.innerHTML += ` 
  <div class="country_flag">
    <img src="${item.flags.png}" />
  </div>
  <div class="country_details">
    <p class="country_name">${item.name.common}</p>
    <div class="details_container">
      <div class="country_detail">
        <p class="country_details_text">
          Native Name:
          <span class="country_details_text_span">${item.name.official}</span>
        </p>
        <p class="country_details_text">
          Population:
          <span class="country_details_text_span">${item.population}</span>
        </p>
        <p class="country_details_text">
          Region: <span class="country_details_text_span">${item.region}</span>
        </p>
        <p class="country_details_text">
          Sub Region:
          <span class="country_details_text_span">${item.subregion}</span>
        </p>
        <p class="country_details_text">
          Capital: <span class="country_details_text_span">${item.capital}</span>
        </p>
      </div>

      <div class="country_detail top">
        <p class="country_details_text">
          Top Level Domain:
          <span class="country_details_text_span">${item.tld}</span>
        </p>
        <p class="country_details_text">
          Currencies: <span class="country_details_text_span">Euro</span>
        </p>
        <p class="country_details_text">
          Languages:
          <span class="country_details_text_span"
            >Dutch, French, German</span
          >
        </p>
      </div>
    </div>
    <div class="border">
      <p class="border_text">Border Countries:</p>
      ${arr.map(item=>{
        return `<a href="./Details.html?name=${item}"><button class="border_country">${item}</button></a>`
      })}
    </div>
  </div>
  `;
}

  /*Dark Theme */
  const body = document.querySelector("body");
  const Icon = document.querySelector(".lightimage");
  const root = document.querySelector(":root");
  Icon.addEventListener("click", function () {
    document.body.classList.toggle("active");
    if (document.body.classList.contains("active")) {
    Icon.src = "images/Group 3 (1).png";
      
    } else {
    Icon.src = "images/Group 3.png";
     
    }
  });




