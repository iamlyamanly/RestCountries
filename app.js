const cards=document.querySelector(".cards");
const list=document.querySelector(".selection_box");
const searchInput=document.querySelector(".search_input");
let AllDatas;





function getCountries() {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
       repeatCountry(data);
       AllDatas=data;
      });
  }
  getCountries();

  function repeatCountry(countries) {
    cards.innerHTML = "";
    countries.forEach(function (country) {
      const { flags, population, region, capital, name } = country;
      cards.innerHTML += `
      <a href="Details.html?name=${name.common}" class="country_card">
      <div class="country_card_flag">
        <img src="${flags.png}" />
      </div>
      <div class="country_card_information">
        <p class="country_card_name">${name.common}</p>
        <div class="country_card_desc">
          <p class="country_card_desc_item">
            Population: <span class="population">${population.toLocaleString()}</span>
          </p>
          <p class="country_card_desc_item">Region: <span class="region">${region}</span></p>
          <p class="country_card_desc_item">
            Capital: <span class="capital">${capital}</span>
          </p>
        </div>
      </div>
    </a>
        `;
    });
  }
 list.addEventListener("click", function (e) {
    const selectedRegion = e.target.value;
    if (selectedRegion !== "") {
      fetch("https://restcountries.com/v3.1/region/" + selectedRegion)
        .then((res) => res.json())
        .then((data) => {
          AllDatas = data;
          console.log(AllDatas);
          repeatCountry(data);
        });
    } else {
      getCountries();
    }
  });

  searchInput.addEventListener("input",function(e){
   let returnData=AllDatas.filter(function(country){
    let countryName=country.name.common.toLowerCase();
    let searchCountryName = e.target.value.toLowerCase();
    return countryName.includes(searchCountryName);
   });
 repeatCountry(returnData);
  });

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

