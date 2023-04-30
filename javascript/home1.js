// to make global array have data
var product = [];
// catsh class of div to push data to html
let item = document.getElementsByClassName("products");
// fetching data from api and make it array of object
async function funcName(url) {
  let response = await fetch(url);
  let data = await response.json();
  // push data from local scope to global scope
  for (var i = 0; i < data.products.length; i++) {
    product.push(data.products[i]);
  }
  callProduct();
}
funcName("https://dummyjson.com/products");

//////////////////////////////////////////////////////////////////////////////////////
//Looping to get items
function callProduct() {
  //  loop for make data in html
  for (let i = 0; i < product.length; i++) {
    for (let j = 0; j < item.length; j++) {
      let description = product[i].description;
      let product_title = product[i].title;
      item[j].innerHTML += `
        <div class="product">
          <img src="${
            product[i].thumbnail
          }" alt="" srcset="" class="product-img" />
          <h2 class="product-title">${
            product_title.length > 15
              ? product_title.substring(0, 15).concat(" ..")
              : product_title
          }</h2>
          <h4 class="product-category">Category: ${product[i].category}</h4>
          <h4 class="product-brand">brand: ${product[i].brand}</h4>
          <p class="product-description">${
            description.length > 54
              ? description.substring(0, 54).concat(" ...more")
              : description
          }</p>
          <h4 class="product-price">Price: ${product[i].price} $</h4>
          <h4 class="product-rating"> ${
            product[i].rating
          }<i class="fas fa-star"></i></h4><br>
          <a href="#!" dataProductId="${
            product[i].id
          }" onclick="addToCart(${i})" class="add-to-cart"><i class="fas fa-cart-arrow-down fa-lg" style="color: #ba1212;"></i></a>
          </div>`;
    }
  }
}
// make array to add data Product to email cart then set it to localstorage
let SignIn = JSON.parse(localStorage.getItem("SignIn"));
let AllUsers = JSON.parse(localStorage.getItem("userData"));
function addToCart(i) {
  //want to get email index then push product[i] as array of object
  pro = product[i];
  let addProducts = JSON.parse(localStorage.getItem("products")) || [];
  for (let i = 0; i < AllUsers.length; i++) {
    if (AllUsers[i].email == SignIn) {
      for (let x = 0; x <= AllUsers[i].products.length; x++) {
        if (!AllUsers[i].products.find((p) => p.id === pro.id)) {
          AllUsers[i].products.push(pro);
        } else {
          console.log("already added");
        }
      }
    }
  }
  localStorage.setItem("userData", JSON.stringify(AllUsers));
}

function goCart() {
  location.assign("addtocart.html");
}
///////////////////////////////////////////////////////////////////
//  for search bar
// function searchName() {
//   let search = document.getElementById("searchInput").value.toLowerCase();
//   let a = [];
//   for (let i = 0; i < product.length; i++) {
//     if (product[i].title.toLowerCase().includes(search)) {
//       a.push(product[i]);
//     } else {
//     }
//   }
//   item.innerHTML = "";
//   for (let i = 0; i < a.length; i++) {
//     for (let j = 0; j < item.length; j++) {
//       item[j].innerHTML = "";
//       let description = a[i].description;
//       let product_title = a[i].title;
//       item[j].innerHTML += `
//         <div class="product">
//           <img src="${a[i].thumbnail}" alt="" srcset="" class="product-img" />
//           <h2 class="product-title">${
//             product_title.length > 15
//               ? product_title.substring(0, 15).concat(" ..")
//               : product_title
//           }</h2>
//           <h4 class="product-category">Category: ${a[i].category}</h4>
//           <h4 class="product-brand">brand: ${a[i].brand}</h4>
//           <p class="product-description">${
//             description.length > 54
//               ? description.substring(0, 54).concat(" ...more")
//               : description
//           }</p>
//           <h4 class="product-price">Price: ${a[i].price} $</h4>
//           <h4 class="product-rating"> ${
//             a[i].rating
//           }<i class="fas fa-star"></i></h4><br>
//           <a href="#!" dataProductId="${
//             a[i].id
//           }" onclick="addToCart(${i})" class="add-to-cart"><i class="fas fa-cart-arrow-down fa-lg" style="color: #ba1212;"></i></a>
//           </div>`;
//     }
//   }
// }

//Variables
const productsView = document.getElementById("products");
const categoriesView = document.getElementById("categories");
const searchByCategory = document.getElementById("searchByCategory");
const categoryPage = document.getElementById("categoryPage");
let searchInput = document.getElementById("searchInput");
let loginForm = document.getElementById("loginForm");
let uriQuery = window.location.search.substring(1);
const API_URI = "https://dummyjson.com/products";
let products = [];
let categories = [];
// ADD Products to HOME PAGE
(async (uri) => {
  const res = await fetch(uri);
  const data = await res.json();
  products = data.products;
  //Categories
  let result = products.map((product) => product.category);
  categories = result.filter((item, index) => result.indexOf(item) === index);

  categories.map((c) => {
    searchByCategory.innerHTML += `
    <option value="${c}">${c}</option>`;
  });
  //
  if (uriQuery.length > 1) {
    categoryPage.innerHTML = `
    <h2 class="text-center">${uriQuery.toUpperCase()}</h2>
    `;
    let categoryList = products.filter(
      (product) => product.category == uriQuery
    );
    displayProducts(categoryList);
  } else {
    // Add the product to the Home Page
    displayProducts(products);
  }
})(API_URI);

//Handle Search bar
searchInput.addEventListener("submit", (event) => {
  console.log("Search");

  event.preventDefault();
  let result = products.filter((product) =>
    product.title.toLowerCase().includes(event.target[0].value.toLowerCase())
  );
  productsView.innerHTML = "";

  displayProducts(result);
});

//Handle Search By Category
searchByCategory.addEventListener("change", (event) => {
  console.log("Search");

  let result = products.filter(
    (product) => product.category === event.target.value
  );

  console.log(result);
  productsView.innerHTML = "";
  displayProducts(result);
});
console;
//DISPLAY PRODUCTS
const displayProducts = (data) => {
  data.map((product, index) => {
    productsView.innerHTML += `
       <div class="col-4 ">
       <div class="card" key="${index}">
          <img  src="${
            product.thumbnail
          }" alt="" srcset="" class="card-img-top" />
          <div class="card-body">
          <h2 class="product-title">${
            product.title.length > 15
              ? product.title.substring(0, 15).concat(" ..")
              : product.title
          }</h2>
          <h4 class="product-category">Category: ${product.category}</h4>
          <h4 class="product-brand">brand: ${product.brand}</h4>
          <p class="product-description">${
            product.description.length > 50
              ? product.description.substring(0, 54).concat(" ...more")
              : product.description
          }</p>
          <h4 class="product-price">Price: ${product.price} $</h4>
          <h4 class="product-rating">Rating: ${product.rating}</h4>
          <a href="#!" dataProductId="${
            product.id
          }" class="add-to-cart"><i class="fas fa-cart-plus fa-lg" style="color: #ba1212;"></i></a>
        </div>
        </div>
      `;
  });
};

//Display Categories
