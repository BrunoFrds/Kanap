// Récupération de l'URL de la page affiché
const urlProduct = new URL(window.location.href);
// Récupération de l'id de l'URL en question
const urlId = urlProduct.searchParams.get("id");

// Envoie de la requête HTTP auprès du service web
const dataCanape = fetch("http://localhost:3000/api/products");
// Récupération des données depuis l'API
dataCanape.then((response) => {
  const listCanape = response.json();
  listCanape.then((list) => {
    for (let i = 0; i < list.length; i++) {
      const idItemList = list[i]._id;
      if (idItemList === urlId) {
        const altItemList = list[i].altTxt;
        const nomItemList = list[i].name;
        const priceItemList = list[i].price;
        const descriptionItemList = list[i].description;

        // Création de la variable pour la div image
        const itemImg = document.getElementsByClassName("item__img");
        // Création de l'élément image et ajout à la div
        const itemImgKanap = document.createElement("img");
        const itemAltKanap = document.createElement("p");
        itemImgKanap.src = list[i].imageUrl;
        itemImgKanap.setAttribute(
          "alt",
          (itemAltKanap.innerHTML = altItemList)
        );
        itemImg[0].appendChild(itemImgKanap);

        // Création et ajout des variable pour les éléments nom et prix
        const itemTitle = document.getElementById("title");
        const itemPrice = document.getElementById("price");
        itemTitle.innerHTML = nomItemList;
        itemPrice.innerHTML = priceItemList;

        // Création et ajout de la variable pour la description
        const itemDescription = document.getElementById("description");
        itemDescription.innerHTML = descriptionItemList;

        // Création d'une variable pour la liste des couleurs
        const colorItemList = list[i].colors;
        // Insertion de la premiere couleur dans l'option existante
        const colorOption1 = document.querySelector("option");
        colorOption1.value = colorItemList[0];
        colorOption1.text = colorItemList[0];
        for (let j = 1; j < colorItemList.length; j++) {
          // Création d'une variable pour le select
          const selectColors = document.getElementById("colors");

          // Création et insertion des autres choix de couleur
          const colorOptionJ = document.createElement("option");
          colorOptionJ.value = colorItemList[j];
          colorOptionJ.text = colorItemList[j];

          // Ajout des options au select
          selectColors.appendChild(colorOptionJ);
        }

        // Selection des options pour la couleur et la quantité
        const colorChoice = document.getElementById("colors");
        const quantityChoice = document.getElementById("quantity");

        // Ajout d'une variable pour le bouton panier et l'empecher d'actualiser la page
        const btnPanier = document.getElementById("addToCart");
        btnPanier.addEventListener("click", (Event) => {
          Event.preventDefault();

          // Ajout du choix de la couleur et de la quantité dans une variable
          const colorValue = colorChoice.value;
          const quantityValue = quantityChoice.value;
          // Récupération dans un tableau des informations pour le panier
          let infoKanap = {
            id: idItemList,
            color: colorValue,
            quantity: quantityValue,
          };

          // Récupération des données du localStorage au format JS
          let infoKanapLocalStorage = JSON.parse(
            localStorage.getItem("Infos produit")
          );
          // Création d'une fonction pour l'ajout de donnée dans le localStorage
          const ajoutProduitLocalStorage = () => {
            // Ajout des nouvelles données
            infoKanapLocalStorage.push(infoKanap);
            // Traduction des données du tableau en format JSON
            const infoKanapJson = JSON.stringify(infoKanapLocalStorage);
            // Stockage des données dans le localStorage
            localStorage.setItem("Infos produit", infoKanapJson);
          };
          // Création de la condition pour ajouter des produits dans le localStorage
          if (infoKanapLocalStorage) {
            ajoutProduitLocalStorage();
          } else {
            // Création d'un nouveau tableau
            infoKanapLocalStorage = [];
            ajoutProduitLocalStorage();
          }
        });
      }
    }
  });
});
