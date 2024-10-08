async function likeButton(id) {
  const url = `https://openapi.programming-hero.com/api/peddy/pet/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  const likeContainer = document.getElementById("like-container");
  const img = document.createElement("img");
  img.className = "rounded-xl w-full border-2 p-2";
  img.src = `${data.petData.image}`;

  likeContainer.appendChild(img);
}
function removeActiveButton() {
  const categoryButton = document.getElementsByClassName("category-btn");
  for (let category of categoryButton) {
    category.classList.remove("rounded-full", "border-cyan-700", "bg-cyan-50");
  }
}

function displayCategoryByName(categoryName) {
  fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  )
    .then((res) => res.json())
    .then((data) => {
      removeActiveButton();
      const activeButton = document.getElementById(`btn-${categoryName}`);
      activeButton.classList.add(
        "rounded-full",
        "border-cyan-700",
        "bg-cyan-50"
      );
      const petsContainer = document.getElementById("petsContainer");
      petsContainer.classList.remove("grid");
      petsContainer.innerHTML = `  <div class="flex justify-center">
                    <span id="spinner" class=" block loading loading-bars loading-lg"></span>
                </div>`;
      setTimeout(function () {
        displayCards(data.data);
      }, 3000);
    });
}

const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((Response) => Response.json())
    .then((data) => displayCategories(data.categories));
};

const displayCategories = (categories) => {
  const categoryContainer = document.querySelector("#categoryContainer");
  categories.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `<button id="btn-${item.category}" onclick="displayCategoryByName('${item.category}')"  class="flex justify-center category-btn gap-2 items-center border-2 w-full py-3 px-14"><img
                    class="w-10 h-10" src="${item.category_icon}"
                    alt=""><span class=" text-xl font-bold text-neutral-950">${item.category}</span></button>`;
    categoryContainer.appendChild(div);
  });
};

const loadDetails = async (detail) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${detail}`
  );
  const data = await response.json();
  const modalContent = document.querySelector("#modal-content");
  document.getElementById("detailsModal").showModal();
  modalContent.innerHTML = `<figure>
                        <img class="w-full rounded-xl" src="${
                          data.petData.image
                        }" />
                    </figure>
                    <div class="mt-6 border-b-2 pb-3">
                        <h2 class=" text-xl font-bold text-neutral-950">${
                          data.petData.pet_name
                        }</h2>
                        <div class="flex gap-20">
                        <div>
                            <p class=" text-neutral-600"><i class="fa-solid fa-shapes"></i> <span
                                class="ml-2 text-base">Breed:
                                ${
                                  data.petData.breed === null ||
                                  data.petData.breed === undefined
                                    ? "Not available"
                                    : `${data.petData.breed}`
                                }</span></p>
                        <p class=" text-neutral-600"><i class="fa-solid fa-calendar-days"></i> <span
                                class="ml-2 text-base">Birth: ${
                                  data.petData.date_of_birth === null ||
                                  data.petData.date_of_birth === undefined
                                    ? "Not available"
                                    : `${data.petData.date_of_birth}`
                                }</span></p>
                                 </div>
                                 <div>
                        <p class=" text-neutral-600"><i class="fa-solid fa-venus"></i> <span
                                class="ml-2 text-base">Gender:
                                ${
                                  data.petData.gender === null ||
                                  data.petData.gender === undefined
                                    ? "Not available"
                                    : `${data.petData.gender}`
                                }</span></p>
                           
                            
                        <p class=" text-neutral-600"><i class="fa-solid fa-dollar-sign"></i> <span
                                class="ml-2 text-base">Price : ${
                                  data.petData.price === null ||
                                  data.petData.price === undefined
                                    ? "Not available"
                                    : `${data.petData.price}$`
                                }</span></p>
                                </div>
                        </div>
                    </div>
                    <div class="my-2">
                    <h3 class=" text-xl font-bold text-neutral-950">Detail information:</h3>
                    <p class="text-neutral-600">${data.petData.pet_details}</p>
                    </div>`;
};

function adoptButton(event) {
  const countdownEl = document.getElementById("countdown");
  const modal = document.getElementById("adoptButton");
  //   document.getElementById("adoptButton").showModal();
  event.setAttribute("disabled", "true");
  event.innerText = "Adopted";
  modal.classList.add("modal-open");
  let count = 3;
  const countdown = setInterval(() => {
    if (count > 1) {
      count--;
      countdownEl.innerHTML = count;
    } else {
      clearInterval(countdown);
      const modal = document.getElementById("adoptButton");
      modal.classList.remove("modal-open");
    }
  }, 1000);
}

const loadCards = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((Response) => Response.json())
    .then((data) => {
      const petsContainer = document.getElementById("petsContainer");
      petsContainer.classList.remove("grid");
      petsContainer.innerHTML = `  <div class="flex justify-center">
                    <span id="spinner" class=" block loading loading-bars loading-lg"></span>
                </div>`;
      setTimeout(function () {
        displayCards(data.pets);
      }, 3000);
    });
};
//
function sortByPrice() {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((Response) => Response.json())
    .then((data) => {
      const sortedPets = data.pets.sort((a, b) => b.price - a.price);
      displayCards(sortedPets);
    });
}
const displayCards = (pets) => {
  const petsContainer = document.getElementById("petsContainer");
  petsContainer.innerHTML = " ";
  if (pets.length === 0) {
    petsContainer.classList.remove("grid", "border-2");
    petsContainer.innerHTML = `<div class="bg-neutral-50 text-center flex flex-col pt-24 items-center rounded-xl w-full min-h-screen">
        <img src ="./images/error.webp" />
        <p class=" my-3 text-3xl text-neutral-900 font-bold">No Information Available</p>
        <p class=" text-neutral-600" >It is a long established fact that a reader will be distracted by the readable content of a page when looking at<br> its layout. The point of using Lorem Ipsum is that it has a.</p>
        </div>`;
  } else {
    petsContainer.classList.add("grid", "border-2");
  }
  pets.forEach((item) => {
    const div = document.createElement("div");
    div.className = "card card-compact border-2 p-4";
    div.innerHTML = `<figure>
                        <img class="w-full h-[200px] object-cover rounded-xl" src="${
                          item.image
                        }"
                            alt="Shoes" />
                    </figure>
                    <div class="mt-6 border-b-2 pb-3">
                        <h2 class=" text-xl font-bold text-neutral-950">${
                          item.pet_name
                        }</h2>
                        <p class=" text-neutral-600"><i class="fa-solid fa-shapes"></i> <span
                                class="ml-2 text-base">Breed:
                                ${
                                  item.breed === null ||
                                  item.breed === undefined
                                    ? "Not available"
                                    : `${item.breed}`
                                }</span></p>
                        <p class=" text-neutral-600"><i class="fa-solid fa-calendar-days"></i> <span
                                class="ml-2 text-base">Birth: ${
                                  item.date_of_birth === null ||
                                  item.date_of_birth === undefined
                                    ? "Not available"
                                    : `${item.date_of_birth}`
                                }</span></p>
                        <p class=" text-neutral-600"><i class="fa-solid fa-venus"></i> <span
                                class="ml-2 text-base">Gender:
                                ${
                                  item.gender === null ||
                                  item.gender === undefined
                                    ? "Not available"
                                    : `${item.gender}`
                                }</span></p>
                        <p class=" text-neutral-600"><i class="fa-solid fa-dollar-sign"></i> <span
                                class="ml-2 text-base">Price : ${
                                  item.price === null ||
                                  item.price === undefined
                                    ? "Not available"
                                    : `${item.price}$`
                                }</span></p>
                    </div>
                    <!-- buttons -->
                    <div class="flex justify-around mt-4">
                        <button onclick="likeButton(${
                          item.petId
                        })" class="btn px-6 bg-transparent border-2 "><i
                                class="fa-solid text-xl fa-thumbs-up"></i></button>
                        <button onclick="adoptButton(this)" class="btn bg-transparent border-2 text-cyan-600">Adopt</button>
                        <button onclick="loadDetails(${
                          item.petId
                        })" class="btn bg-transparent border-2 text-cyan-600">Details</button>
                    </div>`;
    petsContainer.appendChild(div);
  });
};
loadCategory();
loadCards();
