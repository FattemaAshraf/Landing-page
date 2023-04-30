// let adding = JSON.parse(localStorage.getItem("userData"));
let SignIn = JSON.parse(localStorage.getItem("SignIn"));
let AllUsers = JSON.parse(localStorage.getItem("userData"));
let item = document.getElementsByClassName("products");
function cart() {
  // console.log(adding);
  for (let i = 0; i < AllUsers.length; i++) {
    if (AllUsers[i].email == SignIn) {
      for (let x = 0; x < AllUsers[i].products.length; x++) {
        for (let j = 0; j < item.length; j++) {
          let description = AllUsers[i].products[x].description;
          let product_title = AllUsers[i].products[x].title;
          item[j].innerHTML += `
        <div class="product">
          <img src="${
            AllUsers[i].products[x].thumbnail
          }" alt="" srcset="" class="product-img" />
          <h2 class="product-title">${
            product_title.length > 15
              ? product_title.substring(0, 15).concat(" ..")
              : product_title
          }</h2>
          <h4 class="product-category">Category: ${
            AllUsers[i].products[x].category
          }</h4>
          <h4 class="product-brand">brand: ${AllUsers[i].products[x].brand}</h4>
          <p class="product-description">${
            description.length > 54
              ? description.substring(0, 54).concat(" ...more")
              : description
          }</p>
          <h4 class="product-price">Price: ${
            AllUsers[i].products[x].price
          } $</h4>
          <h4 class="product-rating"> ${
            AllUsers[i].products[x].rating
          }<i class="fas fa-star"></i></h4><br>
          <a href="" dataProductId="${
            AllUsers[i].products[x].id
          }" onclick="deleteFromCart(${x})" class="add-to-cart"><i class="fa-regular fa-trash-can fa-xl" style="color: #d40202;"></i></a>
        </div>`;
        }
      }
    } else {
    }
  }
  // price();
}
function deleteFromCart(x) {
  for (let i = 0; i < AllUsers.length; i++) {
    if (AllUsers[i].email == SignIn) {
      for (let y = 0; y < AllUsers[i].products.length; y++) {
        if (AllUsers[i].products[y] === AllUsers[i].products[x]) {
          AllUsers[i].products.splice(y, 1);
          localStorage.setItem("userData", JSON.stringify(AllUsers));
          location.assign("addtocart.html");
        }
      }
    }
  }
}
/////////////////////////////////////////////////////////////////
function price() {
  let sum = 0;
  for (let i = 0; i < AllUsers.length; i++) {
    if (AllUsers[i].email == SignIn) {
      for (let x = 0; x < AllUsers[i].products.length; x++) {
        sum += AllUsers[i].products[x].price;
      }
      let promo = document.getElementById("promo").value;
      let promoEdit = parseInt(promo.split("").reverse().join(""));
      if (promoEdit <= 2) {
        let total = sum - (sum * promoEdit) / 10;
        document.getElementById("price").innerHTML = total + " $";
      } else if (promoEdit > 2) {
        let total = sum - (sum * 2) / 10;
        document.getElementById("price").innerHTML = total + " $";
      } else {
        document.getElementById("price").innerHTML = sum + " $";
      }
    }
  }
}
