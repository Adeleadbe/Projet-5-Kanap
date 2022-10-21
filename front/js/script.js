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
    console.log("erreur 404")
  });

/**
 * Display of products in the home page with a for loop
 */
function displayProducts(jsonListKanap) {
  for (let i = 0; i < jsonListKanap.length; i++) {
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionItems = document.getElementById("items");
    // Création des liens qui vont contenir les articles
    const linkArticle = document.createElement("a");
    // Création des balise qui vont contenir les fiches canapés
    const kanapElement = document.createElement("article");

    //Element image
    const imageElement = document.createElement("img");
    imageElement.src = jsonListKanap[i].imageUrl;
    imageElement.alt = jsonListKanap[i].altTxt;
    kanapElement.appendChild(imageElement);

    //Element title
    const nameElement = document.createElement("h3");
    nameElement.innerText = jsonListKanap[i].name;
    nameElement.classList.add("productName");
    kanapElement.appendChild(nameElement);

    //Element description
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = jsonListKanap[i].description;
    descriptionElement.classList.add("productDescription");
    kanapElement.appendChild(descriptionElement);

    //Link of Id Element for Product Page
    linkArticle.href = `./product.html?id=${jsonListKanap[i]._id}`;

    sectionItems.appendChild(linkArticle);
    linkArticle.appendChild(kanapElement);
  }
}
