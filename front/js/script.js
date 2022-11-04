//Appel à l'API
fetch("http://localhost:3000/api/products")
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (jsonListKanap) {
    displayProducts(jsonListKanap);
  })
  .catch(function (err) {
    console.log("erreur 404" + err)
  });

 //Affichage des produits sur la page d'accueil
function displayProducts(jsonListKanap) {
  for (let i = 0; i < jsonListKanap.length; i++) {
    // Récupération de l'élément du DOM qui va contenir tous les produits
    const sectionItems = document.getElementById("items");
    // Création des liens qui vont contenir les articles
    const linkArticle = document.createElement("a");
    // Création des balises qui vont contenir les fiches canapés
    const kanapArticle = document.createElement("article");
    
    //Création de l'element image
    const imageElement = document.createElement("img");
    imageElement.src = jsonListKanap[i].imageUrl;
    imageElement.alt = jsonListKanap[i].altTxt;
    kanapArticle.appendChild(imageElement);

    //Création de l'element titre
    const nameElement = document.createElement("h3");
    nameElement.innerText = jsonListKanap[i].name;
    nameElement.classList.add("productName");
    kanapArticle.appendChild(nameElement);

    //Création de l'element description
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = jsonListKanap[i].description;
    descriptionElement.classList.add("productDescription");
    kanapArticle.appendChild(descriptionElement);

    //Lien id des elements pour l'envoi à la page produit
    linkArticle.href = `./product.html?id=${jsonListKanap[i]._id}`;

    sectionItems.appendChild(linkArticle);
    linkArticle.appendChild(kanapArticle);
  }
}
