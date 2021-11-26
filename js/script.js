function setCartProductsNum() {
  cartProductsNum.textContent = `Numero prodotti: ${cartList.length}`;
}

function createProduct(parent, imgUrl, productTitle, textPrice, idProduct) {
  const product = document.createElement("div");
  product.className = "product";
  product.setAttribute("id", idProduct);

  createImg(product, imgUrl, productTitle);
  createText(product, productTitle, textPrice);
  parent.appendChild(product);

  product.addEventListener("click", (e) => {
    const localStorageValue = localStorage.getItem("totCartitems");
    if (localStorageValue) {
      cartList = JSON.parse(localStorageValue);
    }

    cartList.push(
      productsList.find(
        (product) => parseInt(e.currentTarget.id) === product.id
      )
    );
    setCartProductsNum();

    modal.classList.remove("disappear")
    modal.classList.add("display")
    setTimeout(function(){
      modal.classList.add("disappear")
    },1000)
    
    localStorage.setItem("totCartitems", JSON.stringify(cartList));
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

function renderProducts(listItems) {
  listItems.map((product) => {
    createProduct(
      wrapperProducts,
      product.image,
      product.title,
      product.price,
      product.id
    );
  });
}

function handleShowCartBtn() {
  clearCartBtn.setAttribute("hidden", true);
  wrapper.removeChild(showCartBtn);
  wrapperProducts.classList.add("sideViewAnim");

  document
    .querySelectorAll(".product")
    .forEach((product) => wrapperProducts.removeChild(product));

  renderProducts(JSON.parse(localStorageTot) || cartList);

  setTimeout(() => {
    wrapperProducts.classList.remove("sideViewAnim");
  }, 1000);
}

// Async await
const getProductsList = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  productsList = data;

  // Nella eventualità di aggiungere una quantità per prodotto
  // productsList = data.map((product) => {
  //   product.quantity = 0;
  //   return product;
  // });

  return renderProducts(data);
};

let productsList = [];
const wrapper = document.querySelector(".wrapper");
const wrapperProducts = document.querySelector(".wrapper__products");

// Parte inerente alla logica del carrello
let cartList = [];

const localStorageTot = localStorage.getItem("totCartitems");
const cartBtn = document.querySelector(".cartBtn");
const cartProductsNum = document.querySelector(".cartProductsNum");
const clearCartBtn = document.querySelector(".clearCart");
const showCartBtn = document.querySelector(".showCartBtn");

// Flusso generale
const parsedTotCardItemsLen =
  JSON.parse(localStorage.getItem("totCartitems"))?.length || 0;

cartProductsNum.textContent = `Numero prodotti: ${parsedTotCardItemsLen || 0}`;
getProductsList();

clearCartBtn.addEventListener("click", () => {
  cartList.length = 0;
  localStorage.removeItem("totCartitems");
  setCartProductsNum();
});

showCartBtn.addEventListener("click", handleShowCartBtn);

//change hero image 
let images = [
"https://images.unsplash.com/photo-1462392246754-28dfa2df8e6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
"https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
"https://images.unsplash.com/photo-1526745925052-dd824d27b9ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
]
let  i = 0;
let imageHead = document.getElementById("img")
setInterval(function() {
  imageHead.style.backgroundImage = "url(" + images[i] + ")";
  i = i + 1;
  if (i == images.length) {
    i =  0;
  }
}, 3000);

// add reviews
const render = (container, content) => (container.innerHTML = content);
let reces = ["<b>Patrick</b>: <br /> Da quanto ho scoperto <b>la boutique</b> non riesco più a farne a meno!", 
"<b>Elisa</b>: <br /> Il miglior e-commerce di sempre. Qualità garantita su tutti i prodotti", 
"<b>Marcus</b>: <br /> Ottimo rapporto qualità prezzo. Il servizio di assistenza è super efficiente: ho contattato il servizio clienti per effettuare un reso e sono stati estremamente disponibili"]
const rece = document.querySelector("#rece")

setInterval(function (){
  render(rece, `<h4> Recensioni </h4> <p>${reces[i]}</p>`);
  i = i + 1;
  if (i == reces.length) {
    i =  0;
  } ;
}, 3000);
