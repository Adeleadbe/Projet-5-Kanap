//Retrieve product id
let params = new URLSearchParams(document.location.search);
let id = params.get("id");

//Display of product
fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((jsonKanap) => {
    displayKanap(jsonKanap);
  });

function displayKanap(jsonKanap) {
  //Prendre les class id dans le DOM
  const imgClass = document.querySelector(".item__img");
  const titleId = document.getElementById("title");
  const priceId = document.getElementById("price");
  const descriptionId = document.getElementById("description");
  
  //Creation des elements pas dans le DOM
  const imageElement = document.createElement("img");
  

  imageElement.src = jsonKanap.imageUrl;
  imageElement.alt = jsonKanap.altTxt;
  titleId.innerText = jsonKanap.name;
  priceId.innerText = jsonKanap.price;
  descriptionId.innerText = jsonKanap.description;
  

  imgClass.appendChild(imageElement);
  
  //Récupération des couleurs
  for (color of jsonKanap.colors) {
    const colorsId = document.getElementById("colors"); //
    const optionElement = document.createElement("option"); //
    optionElement.innerText = color; //!!
    optionElement.value = color;
    colorsId.appendChild(optionElement);
  }
}

//Au clic sur le bouton, envoie les produits ajouter sur la page panier
const button = document.getElementById("addToCart");
button.addEventListener('click', )
