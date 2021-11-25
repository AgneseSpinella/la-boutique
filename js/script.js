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
    cartList.push(
      productsList.find(
        (product) => parseInt(e.currentTarget.id) === product.id
      )
    );
    setCartProductsNum();
    //alert(`Prodotto aggiunto al carrello, numero prodotti: ${cartList.length}`);
    // Nel caso in cui volessimo aggiungere una interazione col LocalStorage
    modal.classList.remove("disappear")
    modal.classList.add("display")
    setTimeout(function(){
      modal.classList.add("disappear")
    },1000)
    localStorage.setItem("totCartitems", cartList.length);
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

// Async await
const getProductsList = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  productsList = data;

  return renderProducts(data);
};

let productsList = [];
const wrapperProducts = document.querySelector(".wrapper__products");

// Parte inerente alla logica del carrello
let cartList = [];
let images = [
"https://images.unsplash.com/photo-1462392246754-28dfa2df8e6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
"https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
"https://images.unsplash.com/photo-1526745925052-dd824d27b9ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
]



const localStorageTot = localStorage.getItem("totCartitems");
const cartBtn = document.querySelector(".cartBtn");
const cartProductsNum = document.querySelector(".cartProductsNum");
const clearCartBtn = document.querySelector(".clearCart");
const modal = document.querySelector("#modal")


// Flusso generale
cartProductsNum.textContent = `Numero prodotti: ${localStorageTot || 0} `;
getProductsList();

clearCartBtn.addEventListener("click", () => {
  cartList.length = 0;
  setCartProductsNum();
});

//change hero image 
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