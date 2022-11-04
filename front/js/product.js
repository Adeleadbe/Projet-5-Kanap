//Récupére l'id des produits
const params = new URLSearchParams(document.location.search);
const id = params.get("id");

//Appel à l'API
fetch(`http://localhost:3000/api/products/${id}`)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (jsonKanap) {
    displayKanap(jsonKanap);
    cartProduct(jsonKanap);
  })
  .catch(function (err) {
    console.log("erreur 404" + err);
  });

// Récupére le choix de couleur du DOM
const colorsId = document.getElementById("colors");
// Récupére le choix de quantité du DOM
const productQuantity = document.getElementById("quantity");

//Fonction qui affiche les éléments sur la page produit
function displayKanap(jsonKanap) {

  //Prendre les class et les id dans le DOM correspondant
  const imgClass = document.querySelector(".item__img");
  const titleId = document.getElementById("title");
  const priceId = document.getElementById("price");
  const descriptionId = document.getElementById("description");

  //Creation des elements qui ne sont pas dans le DOM
  const imageElement = document.createElement("img");

  //Affiche les elements qui se trouve dans l'API en les ajoutant
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

//Fonction pour gérer le clic d'ajout au panier
function cartProduct(jsonKanap) {
  const button = document.getElementById("addToCart");

  //Ecoute l'evenement click sur le bouton
  button.addEventListener("click", (event) => {
    event.preventDefault();

    //Création de l'objet productKanap
    const productKanap = {
      id: jsonKanap._id,
      colors: colorsId.value,
      quantity: parseInt(productQuantity.value),
      img: jsonKanap.imageUrl,
      alt: jsonKanap.altTxt,
      name: jsonKanap.name
    };

    if (productKanap.colors == false) {
      alert("Veuillez sélectionner une couleur");
    } else if (productQuantity.value <= 0) {
      alert("Veuillez sélectionner la quantité");
    } else {
      alert("Article bien ajouté au panier");
      addCart(productKanap);
    }
  })

    //Fonction qui récupére les produits du Local Storage
    function getBasket() {
      let productLocalStorage = localStorage.getItem("product");
      //Si pas de produit dans le LS
      if (productLocalStorage == null) {
        //Retourne un tableau vide
        return [];
      } else {
        //Retransforme la chaîne de caractere en un tableau
        return JSON.parse(productLocalStorage);
      }
    }

    //Fonction pour ajouter les produits dans le panier
    function addCart(productKanap) {
      //Recupere les produits du localStorage
      let productLocalStorage = getBasket();
      //Cherche un élément dans mon tableau 
      const foundProduct = productLocalStorage.find(
        (product) => product.id == productKanap.id && product.colors == productKanap.colors
      );
      //Si il y a déjà des produits dans le panier avec le même id et la couleur, les additionne
      if (foundProduct != undefined) {
        foundProduct.quantity += parseInt(productKanap.quantity);
      } else {
        //Si il n'y a pas encore de produits dans le lS push le produit
        productLocalStorage.push(productKanap);
      }
      localStorage.setItem("product", JSON.stringify(productLocalStorage));
    }
  }

