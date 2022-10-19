//------ Affichage du produit séléctionné dans la page produit ------//

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

    //--- Selection des couleurs ---//

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

    // Création d'une variable pour le bouton "Ajouter au panier"
    const btnPanier = document.getElementById("addToCart");

    // Ajout d'un évènement pour empêcher le bouton d'actualiser la page
    btnPanier.addEventListener("click", (Event) => {
      Event.preventDefault();

      let color = document.querySelector("#colors").value;
      let quantityChoice = document.querySelector("#quantity").value;
      let quantity = Number(quantityChoice);
      let id = idKanap;

      //pour tester la boucle et l'arreter
      let boucle = 0;

      // ajout des elt du panier dans un tableau
      let infoKanap = [{ id, color, quantity }];

      //Déclaration au format js de la clé produit stocké dans le local storage
      let produitPanier = JSON.parse(localStorage.getItem("cart"));

      //Si le localstorage est vide, on créer tableau, on push le panier dedans et on stock dans localStorage
      if (!produitPanier) {
        produitPanier = [];
        produitPanier.push(infoKanap);
        localStorage.setItem("cart", JSON.stringify(produitPanier));
      }
      //Avant de stock dans local storage, on verifie si nom et option sont =, si = alors on incremente qty
      else {
        for (let i = 0; i < produitPanier.length; i++) {
          if (
            produitPanier[i][0].id === id &&
            produitPanier[i][0].color === color
          ) {
            produitPanier[i][0].quantity += quantity;
            boucle = 1;
          }
        }
        //Si pas égale, on stop la boucle et on push le panier dans local storage
        if (boucle == 0) {
          produitPanier.push(infoKanap);
        }

        localStorage.setItem("cart", JSON.stringify(produitPanier));
      }
    });
  });
