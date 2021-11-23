function createProduct(parent, imgUrl, productTitle, textPrice) {
  const product = document.createElement("div");
  product.className = "product";

  createImg(product, imgUrl, productTitle);
  createText(product, productTitle, textPrice);
  parent.appendChild(product);
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
/*  
fetch("https://fakestoreapi.com/products") // <== importare la lista prodotti in modo remoto
  .then((response) => response.json())
  .then((data) => {
    products = data;
    renderProducts();
  });
*/

let products = [];
const wrapperProducts = document.querySelector(".wrapper__products");

function renderProducts(listItems) {
  listItems.map((product) => {
    createProduct(wrapperProducts, product.image, product.title, product.price);
  });
}

// async await

const getProductList = async() => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  products = data;

  return renderProducts(data);
};

getProductList();
