//Récupérer l'id des produits
let params = new URLSearchParams(document.location.search);
let id = params.get("id");

//Appel à l'API
fetch(`http://localhost:3000/api/products/${id}`)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (jsonKanap) {
    displayKanap(jsonKanap);
    addCartProduct(jsonKanap);
  })
  .catch(function (err) {
    console.log("erreur 404");
  });
// Récupére le choix de couleur du dom
const colorsId = document.getElementById("colors");
const productQuantity = document.getElementById("quantity");

function displayKanap(jsonKanap) {
  //Prendre les class et les id dans le DOM
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
    const optionElement = document.createElement("option");
    optionElement.innerText = color;
    optionElement.value = color;
    colorsId.appendChild(optionElement);
  }
}

//PRODUCT
function addCartProduct(jsonKanap) {
  const button = document.getElementById("addToCart");
  button.addEventListener("click", (event) => {
    event.preventDefault();

    //Création de l'objet optionProduct
    const optionProduct = {
      id: jsonKanap._id,
      colors: colorsId.value,
      quantity: parseInt(productQuantity.value),
      img: `${jsonKanap.imageUrl}`,
      alt: `${jsonKanap.altTxt}`,
      name: `${jsonKanap.name}`,
      price: `${jsonKanap.price}`,
    };

    if (optionProduct.colors == false) {
      alert("Veuillez sélectionner une couleur");
    } else if (productQuantity.value == 0) {
      alert("Veuillez sélectionner la quantité");
    } else {
      alert("Article bien ajouté au panier");
      addCart(optionProduct);
    }

    //Fonction qui récupére les produits du Local Storage, si pas de produits dans le LS alors retourne un tableau vide, si produits dans le LS, parse ces produits pour retourner l'objet
    function getBasket() {
      let productLocalStorage = localStorage.getItem("product");
      if (productLocalStorage == null) {
        //Retourne un tableau vide (qui represente un panier vide)
        return [];
      } else {
        //Retransforme la chaîne de caractere en un tableau ou un objet
        return JSON.parse(productLocalStorage);
      }
    }

    function addCart(optionProduct) {
      //Recupere les produits du localStorage
      let productLocalStorage = getBasket();
      let foundProduct = productLocalStorage.find(
        (product) =>
          product.id == optionProduct.id &&
          product.colors == optionProduct.colors
      );

      //Si il y a déjà des produits dans le localStorage, push à la fin du tableau un nouveau produit
      if (foundProduct != undefined) {
        foundProduct.quantity += optionProduct.quantity;
        //Si il n'y a pas encore de produits dans le lS crée un new tableau dans lequel push le produit et l'ajoute au lS apres l'avoir stringify
      } else {
        productLocalStorage.push(optionProduct);
      }
      localStorage.setItem("product", JSON.stringify(productLocalStorage));
    }
  });
}
