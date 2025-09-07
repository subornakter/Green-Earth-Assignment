const categoryContainer = document.getElementById("categoryContainer");
const cardContainer = document.getElementById("cardContainer");

// Load all categories

const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      //   console.log(categories)
      showCategory(categories);
    })
    .catch((err) => {
      console.log(err);
    });
};
const showCategory = (categories) => {
  categories.forEach((cat) => {
    categoryContainer.innerHTML += `
            <li id="${cat.id}" class=" space-y-6 pt-3 text-[16px] hover:bg-green-600 rounded-sm p-1 cursor-pointer
            ">${cat.category_name}</li>
        `;
  });
    categoryContainer.addEventListener("click", (e) => {
     const allLi = document.querySelectorAll("li");
         allLi.forEach((li) => {
      li.classList.remove("bg-green-600");
    });
    //console.log(e.target);
    if(e.target.localName === "li"){
          
      e.target.classList.add('bg-green-600')
      loadPlantByCategory(e.target.id);
    }
    
    });
};

// Load plants by category
const loadPlantByCategory = (id) => {
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.plants && data.plants.length > 0) {
        showPlantByCategory(data.plants); 
      } else {
        showError("No plants found in this category.");
      }
    })
    .catch((err) => showError("Failed to load plants."));
};

const showPlantByCategory = (plants) => {
  cardContainer.innerHTML = ""; 

  plants.forEach((plant) => {
    cardContainer.innerHTML += `
      <div class="card bg-white h-[500px] shadow-sm">
        <figure class="">
           <img src="${plant.image}" alt="plant" class="rounded-xl w-full h-full" />
        </figure>
        <div class="card-body items-left text-left">
          <h2 class="card-title">${plant.name}</h2>
          <p class="text-[10px] text-gray-500">${plant.description}</p>
          <div class="mt-2 flex justify-between items-center ">
            <div class="bg-[#CFF0DC] rounded-2xl p-2 text-green-500 w-[100px] text-center text-[10px]>
                        <p ">${plant.category}</p>
            </div>
            <div>
             <p class="text-xl font-semibold">$ ${plant.price}</p>
            </div>
           
          </div>
          <div class="card-actions">
            <button class="btn bg-[#15803D] rounded-3xl text-white w-full">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  });
};

// Show error message
const showError = (message) => {
  cardContainer.innerHTML = `
    <div class="bg-red-100 text-red-700 p-4 rounded">${message}</div>
  `;
};

// Initial load
loadCategory();



