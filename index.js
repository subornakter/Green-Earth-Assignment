const categoryContainer = document.getElementById("categoryContainer");
const cardContainer = document.getElementById("cardContainer");
const callBtn = document.getElementById("call-btn");
let cart = [];

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

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("cardContainer").classList.add("hidden");
  } else {
    document.getElementById("cardContainer").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};
const showCategory = (categories) => {
  categoryContainer.innerHTML = `
    <li id="all" class=" space-y-6 pt-3 text-[16px] hover:bg-green-400 rounded-sm p-1 cursor-pointer">
      All Trees
    </li>
  `;

  categories.forEach((cat) => {
    categoryContainer.innerHTML += `
      <li id="${cat.id}" class=" space-y-6 pt-3 text-[16px] hover:bg-green-400 rounded-sm p-1 cursor-pointer">
        ${cat.category_name}
      </li>
    `;
  });

  categoryContainer.addEventListener("click", (e) => {
    const allLi = document.querySelectorAll("li");
    allLi.forEach((li) => li.classList.remove("bg-green-600"));

    if (e.target.localName === "li") {
      e.target.classList.add("bg-green-600");

      if (e.target.id === "all") {
        loadAllPlants();
      } else {
        loadPlantByCategory(e.target.id);
      }
    }
  });
};

// Load plants by category
const loadPlantByCategory = (id) => {
  manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.plants && data.plants.length > 0) {
        showPlantByCategory(data.plants);
      } else {
        showError("No plants found in this category.");
        manageSpinner(false);
      }
    })
    .catch((err) => showError("Failed to load plants."));
};

const showPlantByCategory = (plants) => {
  cardContainer.innerHTML = "";

  plants.forEach((plant) => {
    cardContainer.innerHTML += `
    <div class="card bg-white h-[500px] shadow-md" data-id="${plant.id}">
      <figure>
        <img src="${plant.image}" alt="plant" class="rounded-xl w-full h-full" />
      </figure>
      <div class="card-body items-left text-left">
        <h2 onclick="loadWordDetail(${plant.id})">${plant.name}</h2>
        <p class="text-[10px] text-gray-500">${plant.description}</p>
        <div class="mt-2 flex justify-between items-center">
          <div class="bg-[#CFF0DC] rounded-2xl p-2 text-green-500 w-[100px] text-center text-[10px]">
            <p>${plant.category}</p>
          </div>
          <div>
            <p id="plant-price" class="text-xl font-semibold">$ ${plant.price}</p>
          </div>
        </div>
        <div class="card-actions">
          <button id="call_btn" class="btn bg-[#15803D] rounded-3xl text-white w-full">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
  });
  manageSpinner(false);
  return;
};

// Show error message
const showError = (message) => {
  cardContainer.innerHTML = `
    <div class="bg-red-100 text-red-700 p-4 rounded">${message}</div>
  `;
};

const loadAllPlants = () => {
  manageSpinner(true);
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      if (data.plants && data.plants.length > 0) {
        showPlantByCategory(data.plants);
      } else {
        showError("No plants found.");
        manageSpinner(false);
      }
    })
    .catch((err) => showError("Failed to load plants."));
};

// Initial load
loadCategory();
loadAllPlants();

cardContainer.addEventListener("click", (e) => {
  // console.log(e.target)
  // console.log(e.target.innerText)
  if (e.target.innerText === "Add to Cart") {
    handleCart(e);
  }
});

const handleCart = (e) => {
  const category = e.target.parentNode.parentNode.children[0].innerText;
  const price =
    e.target.parentNode.parentNode.children[2].children[1].innerText;
  console.log(price);
  alert(`${category} has been added to the cart`);
  //  console.log(category);

  cart.push({
    category: category,
    price: price,
  });

  showCart(cart);
};

const showCart = (cart) => {
  callBtn.innerHTML = "";
  let total = 0;

  cart.forEach((cartAdd) => {
    const priceNum = parseFloat(cartAdd.price.replace("$", "").trim());
    total += priceNum;

    callBtn.innerHTML += `
      <div class="flex justify-between items-center rounded-sm bg-[#f7fff9] shadow-sm my-2 p-2">
        <div>
          <h1 class="text-[14px] font-bold ">${cartAdd.category}</h1>
          <h1 class="text-gray-500">${cartAdd.price}</h1>
        </div>
        <button onclick="handleDeleteCart('${cartAdd.category}')" class="btn btn-xs"><i class="fa-solid fa-xmark"></i></button>
      </div>
    `;
  });

  if (cart.length > 0) {
    callBtn.innerHTML += `
      <div class="border-t mt-3 pt-2 text-right font-semibold text-lg">
        Total: $${total.toFixed(2)}
      </div>
    `;
  }
};

const handleDeleteCart = (category) => {
  const filteredCart = cart.filter((cartAdd) => cartAdd.category !== category);
  cart = filteredCart;
  showCart(cart);
};

const loadWordDetail = async (id) => {
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.plants);
};

const displayWordDetails = (plant) => {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
 <div class="card " data-id="${plant.id}">
  <h2 class="text-xl font-bold mb-2">${plant.name}</h2>
  <figure class="mb-4">
    <img src="${plant.image}" alt="${plant.name}" class="rounded-xl w-full h-[200px] object-cover" />
  </figure>
  <p class="mb-1 text-gray-600">
    <span class="text-[14px] text-black font-bold">Category:</span> ${plant.category}
  </p>
  <p class="mb-1 text-gray-600">
    <span class="text-[14px] text-black font-bold">Price:</span> $${plant.price}
  </p>
  <p class="text-gray-600 text-[12px]">
    <span class="text-[14px] font-bold text-black">Description:</span> ${plant.description}
  </p>
</div>

  `;
  // modal show
  document.getElementById("word_modal").showModal();
};
