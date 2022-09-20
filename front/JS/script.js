// Envoie de la requête HTTP auprès du service web
const dataCanape = fetch("http://localhost:3000/api/products");
// Récupération des données depuis l'API
dataCanape.then((response) => {
  const listCanape = response.json();
  listCanape.then((list) => {
    for (let i = 0; i < list.length; i++) {
      const idList = list[i]._id;
      const altList = list[i].altTxt;
      const nomList = list[i].name;
      const descriptionList = list[i].description;

      // Création d'une variable pour l'élément items
      const items = document.getElementById("items");

      // Création du lien produit et ajout dans la section items
      const lienKanap = document.createElement("a");
      const urlIdKanap =
        "http://127.0.0.1:5500/front/html/product.html?id=" + idList;
      /*
      const urlProduct = new URL(
        "http://127.0.0.1:5500/front/html/product.html"
      );
      const params = new URLSearchParams(urlProduct.search);
      params.append("id", idList);

      console.log(params);
      */
      lienKanap.setAttribute("href", urlIdKanap);
      items.appendChild(lienKanap);
      lienKanap.classList.add("lienCanape");

      // Création de la card produit et ajout dans le lien
      const cardsKanap = document.createElement("article");
      lienKanap.appendChild(cardsKanap);
      cardsKanap.classList.add("cardsCanape");

      // Création des éléments image, nom et description
      const imageKanap = document.createElement("img");
      const altKanap = document.createElement("p");
      imageKanap.src = list[i].imageUrl;
      imageKanap.setAttribute("alt", (altKanap.innerHTML = altList));
      imageKanap.classList.add("imageCanape");
      const nomKanap = document.createElement("h3");
      nomKanap.classList.add("productName");
      const descriptionKanap = document.createElement("p");
      descriptionKanap.classList.add("productDescription");

      // Ajout des éléments image, nom et description dans la card
      cardsKanap.appendChild(imageKanap);
      cardsKanap.appendChild(nomKanap);
      cardsKanap.appendChild(descriptionKanap);

      // Affichage des informations nom et description
      nomKanap.innerHTML = nomList;
      descriptionKanap.innerHTML = descriptionList;
    }
  });
});
