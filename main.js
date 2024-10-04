// Select the necessary elements
const section1 = document.querySelector(".section1");
const modal = document.querySelector(".modal");
const openmodal = document.querySelector("#open");
const navbar = document.querySelector(".mini");
let basket = JSON.parse(localStorage.getItem("data")) || []; // Make sure to use 'let' for reassignment
const deleteIcon = "./icon/icons8-delete-100 (1).png";
const cartIcon = "./icon/icons8-cart-100.png";

const tostify  = document.querySelector('.tostify')

// Product data array
const data = [
  {
    img: "./jsimage/Rectangle 58.png",
    count: 1,
    id: 1,
    name: "Daisy",
    price: 5,
  },
  {
    img: "./jsimage/Rectangle 58 (1).png",
    count: 1,
    id: 2,
    name: "Sun flower",
    price: 5,
  },
  {
    img: "./jsimage/Rectangle 58 (2).png",
    count: 1,
    id: 3,
    name: "White Rose",
    price: 5,
  },
  {
    img: "./jsimage/Rectangle 58 (3).png",
    count: 1,
    id: 4,
    name: "Periwinkle",
    price: 5,
  },
  {
    img: "./jsimage/Rectangle 58.png",
    count: 1,
    id: 5,
    name: "Daisy",
    price: 5,
  },
  {
    img: "./jsimage/Rectangle 58 (1).png",
    count: 1,
    id: 6,
    name: "Sun flower",
    price: 5,
  },
  {
    img: "./jsimage/Rectangle 58 (2).png",
    count: 1,
    id: 7,
    name: "White Rose",
    price: 5,
  },
  {
    img: "./jsimage/Rectangle 58 (3).png",
    count: 1,
    id: 8,
    name: "Periwinkle",
    price: 5,
  },
];

// Keep track of modal state
let isModalOpen = false;

// Toggle modal open/close
openmodal.addEventListener("click", () => {
  if (isModalOpen) {
    modal.style.transform = "translateX(330px)";
  } else {
    modal.style.transform = "translateX(0px)";
  }
  isModalOpen = !isModalOpen; // Toggle state
});

// Plus function to increase item count
function plus(id) {
  basket = basket.map((item) => {
    if (item.id === id) {
      item.count += 1;
    }
    return item;
  });
  localStorage.setItem("data", JSON.stringify(basket)); // Update localStorage
  renderBasket(); // Re-render the modal content
}

// Minus function to decrease item count
function minus(id) {
  basket = basket.map((item) => {
    if (item.id === id && item.count > 1) {
      item.count -= 1;
    }
    return item;
  });
  localStorage.setItem("data", JSON.stringify(basket)); // Update localStorage
  renderBasket(); // Re-render the modal content
}

// Маҳсулотни саватдан ўчириш функцияси
function deleteProduct(id) {
  if (confirm("Маҳсулотни ўчиришга ишончингиз комилми?")) {
    basket = basket.filter((item) => item.id !== id);
    localStorage.setItem("data", JSON.stringify(basket)); // Локал хотирани янгилаш
    renderBasket();
  }
  window.location.reload();

}

// Function to calculate and display the total price

const totalPrice = basket.reduce(
  (total, item) => total + item.count * item.price,
  0
);

// Function to render basket items in modal
function renderBasket() {
  modal.innerHTML = ""; // Clear previous content

  if (basket.length === 0) {
    modal.innerHTML = `<div class="basketIcon"><p>Your cart is empty</p> <img src="${cartIcon}" alt="cart icon"></div>`;
    return;
  }

  basket.map((item) => {
    modal.innerHTML += `
    <p>${totalPrice}</p>
      <div class="modal_card">
        <img src="${item.img}" alt="${item.name}">
        <p>${item.name}</p>
        <span>${item.count * item.price} $</span>
        <div class="dable">
          <button onclick="minus(${item.id})">-</button>
          <span>${item.count}</span>
          <button onclick="plus(${item.id})">+</button>
          <button onclick="deleteProduct(${item.id})">
            <img src="${deleteIcon}" alt="delete icon" width="30px">
          </button>
             
        </div>

    
      </div>
       
    `;
  });
}

function test() {
  const basketcount = basket.length;

  navbar.innerHTML = basketcount;

  console.log(basketcount);
}

test();

// Call the function to render the basket initially
renderBasket();

// Function to handle adding items to the cart
function addbasket(index) {
  const itemToAdd = data[index];
  const existingItem = basket.find((item) => item.id === itemToAdd.id);
   tostify.style.zIndex="3"
  if (existingItem) {
    existingItem.count += 1; // If item already exists, increase the count
  } else {
    basket.push(itemToAdd); // Otherwise, add new item to basket
  }

  localStorage.setItem("data", JSON.stringify(basket)); // Update localStorage
  renderBasket();
  test(); // Re-render the modal content
  setTimeout(()=>{
    tostify.style.zIndex="-1"
 },1000)
}

// basketni ochirish 



// Dynamically render the products on the page
data.map((item, index) => {
  section1.innerHTML += `
    <div class="images">
      <img src="${item.img}" alt="${item.name}">
      <p>${item.name}</p>
      <div class="dev">
        <span>${item.price} $</span>
        <button onclick="addbasket(${index})">Add to cart</button>
      </div>
    </div>
  `;
});
