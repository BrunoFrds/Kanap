// Récupération de l'URL de la page affiché
const urlProduct = new URL(window.location.href);

// Récupération de l'id de l'URL en question
const urlId = urlProduct.searchParams.get("id");

// Envoie de la requête HTTP auprès du service web
fetch("http://localhost:3000/api/products/" + urlId)
  // Récupération des données depuis l'API
  .then((response) => response.json())

  // Transfert des données de l'API vers la page produit
  .then((dataKanap) => {
    const idKanap = dataKanap._id;
    const imgKanap = dataKanap.imageUrl;
    const altKanap = dataKanap.altTxt;
    const nameKanap = dataKanap.name;
    const priceKanap = dataKanap.price;
    const descriptionKanap = dataKanap.description;

    // Création de la variable pour la div image
    const itemImg = document.getElementsByClassName("item__img");

    // Création de l'élément image et ajout à la div
    const itemImgKanap = document.createElement("img");
    const itemAltKanap = document.createElement("p");
    itemImgKanap.src = dataKanap.imageUrl;
    itemImgKanap.setAttribute("alt", (itemAltKanap.innerHTML = altKanap));
    itemImg[0].appendChild(itemImgKanap);

    // Création et ajout des variable pour les éléments nom et prix
    const itemTitle = document.getElementById("title");
    const itemPrice = document.getElementById("price");
    itemTitle.innerHTML = nameKanap;
    itemPrice.innerHTML = priceKanap;

    // Création et ajout de la variable pour la description
    const itemDescription = document.getElementById("description");
    itemDescription.innerHTML = descriptionKanap;

    // Création d'une variable pour la liste des couleurs
    const colorKanap = dataKanap.colors;

    // Création d'une variable pour le select
    const selectColors = document.getElementById("colors");
    for (const color of colorKanap) {
      // Création et insertion des choix de couleur
      const colorOptionNew = document.createElement("option");
      colorOptionNew.value = color;
      colorOptionNew.text = color;

      // Ajout des options au select
      selectColors.appendChild(colorOptionNew);
    }

    // Selection des options pour la couleur et la quantité
    const colorChoice = document.getElementById("colors");
    const quantityChoice = document.getElementById("quantity");

    // Création d'une variable pour le bouton "Ajouter au panier"
    const btnPanier = document.getElementById("addToCart");

    // Ajout d'un évènement pour empêcher le bouton d'actualiser la page
    btnPanier.addEventListener("click", (Event) => {
      Event.preventDefault();

      // Ajout du choix de la couleur et de la quantité dans une variable
      const colorValue = colorChoice.value;
      const quantityValue = quantityChoice.value;

      // Récupération dans un tableau des informations pour le panier
      let infoKanap = {
        id: idKanap,
        color: colorValue,
        quantity: Number(quantityValue),
      };

      // Récupération des données du localStorage
      let produitPanier = JSON.parse(localStorage.getItem("cart"));

      // Envoie des données du tableau dans le localStorage
      if (produitPanier == null) {
        produitPanier = [];
        produitPanier.push(infoKanap);
        localStorage.setItem("cart", JSON.stringify(produitPanier));

        // Incrémentation de la quantité dans le localStorage quand l'id et la couleur sont identique
      } else if (produitPanier != null) {
        for (const infoPanier of produitPanier) {
          if (
            infoPanier.id == infoKanap.id &&
            infoPanier.color == infoKanap.color
          ) {
            (infoPanier.quantity =
              Number(infoPanier.quantity) + infoKanap.quantity),
              localStorage.setItem("cart", JSON.stringify(produitPanier));
          }
        }

        // Ajout d'un nouveau produit dans le local storage quand la couleur ou l'id sont différents
        for (const infoPanier of produitPanier) {
          if (
            (infoPanier.id == infoKanap.id &&
              infoPanier.color != infoKanap.color) ||
            infoPanier.id != infoKanap.id
          ) {
            produitPanier.push(infoKanap),
              localStorage.setItem("cart", JSON.stringify(produitPanier));
          }
          break;
        }
      }
    });
  });
