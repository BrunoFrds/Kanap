// Récupération des données dans le local Storage
let getPanier = JSON.parse(localStorage.getItem("cart"));
console.log(getPanier);

// Création d'une boucle qui va parcourir chaque produit dans le panier
for (const produitPanier of getPanier) {
  // Ajout d'une variable pour la section cart__items
  const cartItems = document.getElementById("cart__items");

  // Création et ajout de l'article cart__item
  const cartItem = document.createElement("article");
  cartItems.appendChild(cartItem);
  cartItem.classList.add("cart__item");

  // Création et ajout de la div cart__item__img
  const cartItemImg = document.createElement("div");
  cartItem.appendChild(cartItemImg);
  cartItemImg.classList.add("cart__item__img");

  // Création et ajout de la div cart__item__content
  const cartItemContent = document.createElement("div");
  cartItem.appendChild(cartItemContent);

  // Création et ajout de la div contenant le nom, la couleur et le prix du produit
  const cartItemContentDescription = document.createElement("div");
  cartItemContent.appendChild(cartItemContentDescription);

  // Création et ajout de la couleur
  const cartItemColor = document.createElement("p");
  cartItemColor.innerHTML = produitPanier.color;
  cartItemContentDescription.appendChild(cartItemColor);

  //--- Création et ajout du nom, du prix et de l'image à partir des données de l'API ---
  // Envoie de la requête HTTP auprès du service web
  fetch("http://localhost:3000/api/products/" + produitPanier.id)
    // Récupération des données depuis l'API
    .then((response) => response.json())

    // Transfert des données de l'API vers le panier
    .then((dataProduct) => {
      //Création et ajout de l'image
      const imgCartItem = document.createElement("img");
      const altCartItem = document.createElement("p");
      imgCartItem.src = dataProduct.imageUrl;
      imgCartItem.setAttribute(
        "alt",
        (altCartItem.innerHTML = dataProduct.altTxt)
      );
      cartItemImg.appendChild(imgCartItem);

      // Ajout du nom
      const cartItemName = document.createElement("h2");
      cartItemName.innerHTML = dataProduct.name;
      cartItemContentDescription.appendChild(cartItemName);
      // Ajout du prix

      const cartItemPrice = document.createElement("p");
      cartItemPrice.innerHTML = dataProduct.price + " €";
      cartItemPrice.classList.add("itemPrice");
      cartItemContentDescription.appendChild(cartItemPrice);
    });

  // Création et ajout de la div cart__item__content__settings
  const cartItemContentSettings = document.createElement("div");
  cartItemContent.appendChild(cartItemContentSettings);

  // Création et ajout de la div contenant la quantité
  const cartItemContentSettingsQuantity = document.createElement("div");
  cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
  const cartItemQuantity = document.createElement("p");
  cartItemQuantity.innerHTML = "Qté : ";
  cartItemContentSettingsQuantity.appendChild(cartItemQuantity);

  // Création de l'input quantité
  const itemQuantity = document.createElement("input");
  itemQuantity.setAttribute("type", "number");
  itemQuantity.classList.add("itemQuantity");
  itemQuantity.setAttribute("name", "itemQuantity");
  itemQuantity.setAttribute("min", "1");
  itemQuantity.setAttribute("max", "100");
  itemQuantity.value = produitPanier.quantity;
  cartItemContentSettingsQuantity.appendChild(itemQuantity);

  // Création d'une dataset pour l'id, la couleur des produits et la quantité dans les inputs
  itemQuantity.setAttribute("data-id", produitPanier.id);
  itemQuantity.setAttribute("data-color", produitPanier.color);
  itemQuantity.setAttribute("data-value", produitPanier.quantity);

  // Création et ajout du bouton supprimer
  const cartItemContentSettingsDelete = document.createElement("div");
  cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
  const buttonDelete = document.createElement("button");
  buttonDelete.innerHTML = "Supprimer";
  buttonDelete.classList.add("btnDelete");
  cartItemContentSettingsDelete.appendChild(buttonDelete);

  // Création d'une dataset pour l'id et la couleur des produits dans les boutons "supprimer"
  buttonDelete.setAttribute("data-id", produitPanier.id);
  buttonDelete.setAttribute("data-color", produitPanier.color);
}

// Création d'une variable pour les inputs
let inputQuantity = document.querySelectorAll(".itemQuantity");

// Création d'une boucle qui va parcourir la nodeList contenant les inputs des différents produits
for (const newQuantity of inputQuantity) {
  // Création d'un évènement au changement de la valeur dans le champs de texte
  newQuantity.addEventListener("change", (event) => {
    // Rechargement de la page au changement de la quantité
    window.location.reload();

    // Création d'une variable pour la nouvelle valeur de l'input
    let inputValue = event.target.valueAsNumber;

    // Modification de la data-value avec la nouvelle valeur
    newQuantity.setAttribute("data-value", inputValue);

    // Création d'une boucle qui va parcourir chaque produit dans le panier
    for (const inputItem of getPanier) {
      if (
        inputItem.id == newQuantity.dataset.id &&
        inputItem.color == newQuantity.dataset.color
      ) {
        // Modification de la quantité du produit dans le tableau du panier et enregistrement dans le local storage
        (inputItem.quantity = Number(newQuantity.dataset.value)),
          localStorage.setItem("cart", JSON.stringify(getPanier));
      }
    }
  });
}

// Création d'un variable pour les boutons "supprimer"
let btnDelete = document.querySelectorAll(".btnDelete");

// Création d'une boucle qui va parcourir la nodelist contenant les boutons
for (const deleteOption of btnDelete) {
  // Création d'un évènement au click du bouton "supprimer"
  deleteOption.addEventListener("click", () => {
    // Rechargement de la page au click
    window.location.reload();

    // Création d'une boucle qui va parcourir chaque produit dans le panier
    for (let i = 0; i < getPanier.length; i++) {
      if (
        getPanier[i].id == deleteOption.dataset.id &&
        getPanier[i].color == deleteOption.dataset.color
      ) {
        // Suppression de l'objet du panier
        console.log(getPanier.splice(i, 1)),
          // Suppression du produit du local storage
          localStorage.setItem("cart", JSON.stringify(getPanier));
      }
    }
  });
}

// Création d'une variable pour le span "totalQuantity"
const totalQuantity = document.getElementById("totalQuantity");

// Création d'une variable pour la quantité totale
let totalQuantityValue = 0;

// Création d'une boucle qui va parcourir les éléments du panier
for (const productQuantity of getPanier) {
  // Nombre de produits total
  totalQuantityValue += productQuantity.quantity;

  // Ajout du total dans le span
  totalQuantity.innerHTML = totalQuantityValue;
}

// Création d'une variable pour le span "totalPrice"
const totalPrice = document.getElementById("totalPrice");

// Création d'une variable pour le prix total
let totalPriceValue = 0;

// Création d'une boucle qui va parcourir les éléments du panier
for (const productPrice of getPanier) {
  // Récupération du prix de chaque produit

  // Envoie de la requête HTTP auprès du service web
  fetch("http://localhost:3000/api/products/" + productPrice.id)
    // Récupération des données depuis l'API
    .then((response) => response.json())

    // Transfert des données de l'API vers le panier
    .then((dataPrice) => {
      const itemPrice = dataPrice.price;

      // Prix total de chaque lot d'article
      let totalPriceProduct = productPrice.quantity * itemPrice;

      // Prix total du panier
      totalPriceValue += totalPriceProduct;

      // Ajout du total dans le span
      totalPrice.innerHTML = totalPriceValue;
    });
}

// Création de variables pour les différents éléments du formulaire

const cartOrderForm = document.querySelector(".cart__order__form");

const cartOrderFormQuestion = document.querySelectorAll(
  ".cart__order__form__question"
);

const firstNameClient = document.getElementById("firstName");
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

const lastNameClient = document.getElementById("lastName");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

const addressClient = document.getElementById("address");
const addressErrorMsg = document.getElementById("addressErrorMsg");

const cityClient = document.getElementById("city");
const cityErrorMsg = document.getElementById("cityErrorMsg");

const emailClient = document.getElementById("email");
const emailErrorMsg = document.getElementById("emailErrorMsg");

// Bouton "Confirmer"
const orderBtn = document.getElementById("order");

// Création de variables pour les valeurs du formulaire
let firstNameValue, lastNameValue, addressValue, cityValue, emailValue;

// Création de variable Regex pour les prénom ,nom et ville
const regexName = /^[a-zA-ZÀ-ÿ-\s]{3,20}$/;

// Création d'une variable Regex pour l'adresse
const regexAddress = /^[0-9]+[\s]+[a-zA-ZÀ-ÿ-\s]+$/;

// Création d'une variable Regex pour l'email
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// Ajout de conditions pour vérifier la validité des données du formulaire avec regex
cartOrderFormQuestion[0].addEventListener("change", (text) => {
  firstNameValue;
  if (regexName.test(firstNameClient.value) == true) {
    firstNameErrorMsg.innerHTML = "";
    firstNameValue = text.target.value;
  } else {
    firstNameErrorMsg.innerHTML = "Champs invalide.";
  }
});

cartOrderFormQuestion[1].addEventListener("change", (text) => {
  lastNameValue;
  if (regexName.test(lastNameClient.value) == true) {
    lastNameErrorMsg.innerHTML = "";
    lastNameValue = text.target.value;
  } else {
    lastNameErrorMsg.innerHTML = "Le nom est invalide.";
  }
});

cartOrderFormQuestion[2].addEventListener("change", (text) => {
  addressValue;
  if (regexAddress.test(addressClient.value) == true) {
    addressErrorMsg.innerHTML = "";
    addressValue = text.target.value;
  } else {
    addressErrorMsg.innerHTML = "L'adresse est invalide.";
  }
});

cartOrderFormQuestion[3].addEventListener("change", (text) => {
  cityValue;
  if (regexName.test(cityClient.value) == true) {
    cityErrorMsg.innerHTML = "";
    cityValue = text.target.value;
  } else {
    cityErrorMsg.innerHTML = "Le nom de la ville est invalide.";
  }
});

cartOrderFormQuestion[4].addEventListener("change", (text) => {
  emailValue;
  if (regexEmail.test(emailClient.value) == true) {
    emailErrorMsg.innerHTML = "";
    emailValue = text.target.value;
  } else {
    emailErrorMsg.innerHTML = "L'email est invalide.";
  }
});

// Création d'un évènement à la validation du formulaire
cartOrderForm.addEventListener("submit", (event) => {
  // Ajout d'un preventDefaut pour empêcher la page de recharger au click
  event.preventDefault();

  // Envoie des valeurs validées du formulaire vers le local storage ainsi que les id des produits sous forme de tableau
  if (
    firstNameValue &&
    lastNameValue &&
    addressValue &&
    cityValue &&
    emailValue
  ) {
    //  Récupération de l'id des produits dans un tableau pour l'envoi vers le back-end
    const idData = JSON.parse(localStorage.getItem("cart"));
    let products = [];

    // Boucle pour récupérer les id de chaques produits du panier dans le tableau
    for (const idProduct of idData) {
      products.push(idProduct.id);
    }

    // Envoie du formulaire validé et des id des produits vers le local storage
    const clientData = {
      // Création d'un objet formulaire contenant les données du formulaire
      contact: {
        firstName: firstNameValue,
        lastName: lastNameValue,
        address: addressValue,
        city: cityValue,
        email: emailValue,
      },
      products,
    };

    // Requête POST sur l'API
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
    })
      // Récupération des données dans la réponse de la requête
      .then((response) => response.json())
      .then((promise) => {
        let responseServer = promise;
        console.log(responseServer);

        // Récupération de l'id de la commande
        const orderedId = responseServer.orderId;
        console.log(orderedId);

        // Lien vers la page de confirmation
        window.location = "confirmation.html?id=" + orderedId;
      });
  }
});
