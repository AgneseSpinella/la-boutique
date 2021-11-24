function createProduct(parent, imgUrl, productTitle, textPrice, idProduct) {
  const product = document.createElement("div");
  product.className = "product";
  product.setAttribute("id", idProduct)

  createImg(product, imgUrl, productTitle);
  createText(product, productTitle, textPrice);
  parent.appendChild(product);

  product.addEventListener("click", (e) => {
    cartList.push(
    productsList.find(
    (product) => parseInt(e.currentTarget.id) === product.id)
    )
    alert(`prodotto aggiunto al carrello, numero prodotti: ${cartList.length}`)
    });
}

function createImg(parent, imgUrl, productTitle) {
  const image = document.createElement("img");
  image.src = imgUrl;
  image.alt = productTitle;

  parent.appendChild(image);
}

function createText(parent, productTitle, textPrice) {
  const title = document.createElement("h4");
  title.textContent = productTitle;

  const price = document.createElement("strong");
  price.textContent = `${textPrice} $`;

  parent.append(title, price);
}

let products = [];


function renderProducts(listItems) {
  listItems.map((product) => {
    createProduct(wrapperProducts, product.image, product.title, product.price, product.id);
  });
}

// async await

const getProductList = async() => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  productsList = data;
  // Per controllare ripetizione oggetti
 // productsList = data.map((product) => 


  return renderProducts(data);
};

const wrapperProducts = document.querySelector(".wrapper__products");
const cartList = [];
const cartBtn = document.querySelector(".cartBtn")

let productsList= []
getProductList();

