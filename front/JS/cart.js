// Récupération des données dans le local Storage
let getPanier = JSON.parse(localStorage.getItem("Infos produit"));
console.log(getPanier);

for (let i = 0; i < getPanier.length; i++) {
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

  //Création et ajout de l'image
  const imgCartItem = document.createElement("img");
  const altCartItem = document.createElement("p");
  imgCartItem.src = getPanier[i].img;
  imgCartItem.setAttribute("alt", (altCartItem.innerHTML = getPanier[i].alt));
  cartItemImg.appendChild(imgCartItem);

  // Création et ajout de la div cart__item__content
  const cartItemContent = document.createElement("div");
  cartItem.appendChild(cartItemContent);

  // Création et ajout de la div contenant le nom, la couleur et le prix du produit
  const cartItemContentDescription = document.createElement("div");
  cartItemContent.appendChild(cartItemContentDescription);

  // Création et ajout du nom
  const cartItemName = document.createElement("h2");
  cartItemName.innerHTML = getPanier[i].name;
  cartItemContentDescription.appendChild(cartItemName);
  // Création et ajout de la couleur
  const cartItemColor = document.createElement("p");
  cartItemColor.innerHTML = getPanier[i].color;
  cartItemContentDescription.appendChild(cartItemColor);
  // Création et ajout du prix à partir de l'API
  // Envoie de la requête HTTP auprès du service web
  fetch("http://localhost:3000/api/products/" + getPanier[i].id)
    // Récupération des données depuis l'API
    .then((response) => response.json())
    // Transfert des données de l'API vers le panier
    .then((dataPrice) => {
      const cartItemPrice = document.createElement("p");
      cartItemPrice.innerHTML = dataPrice.price;
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
  itemQuantity.value = getPanier[i].quantity;
  cartItemContentSettingsQuantity.appendChild(itemQuantity);
  // Création d'une dataset pour l'id et la couleur des produits dans les inputs
  itemQuantity.setAttribute("data-id", getPanier[i].id);
  itemQuantity.setAttribute("data-color", getPanier[i].color);
  itemQuantity.setAttribute("data-value", getPanier[i].quantity);

  // Création et ajout du bouton supprimer
  const cartItemContentSettingsDelete = document.createElement("div");
  cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

  const buttonDelete = document.createElement("button");
  buttonDelete.innerHTML = "Supprimer";
  cartItemContentSettingsDelete.appendChild(buttonDelete);
}
// Création d'une variable pour les inputs
let inputQuantity = document.querySelectorAll(".itemQuantity");
// Création d'une boucle qui va parcourir la nodeList contenant les inputs des différents produits
inputQuantity.forEach((newQuantity) => {
  // Création d'un eventListener au changement de la quantité
  newQuantity.addEventListener("input", (event) => {
    for (let j = 0; j < getPanier.length; j++) {
      // Création d'une variable pour la nouvelle valeur de l'input
      let inputValue = event.target.valueAsNumber;
      // Modification de la data-value avec la nouvelle valeur
      newQuantity.setAttribute("data-value", inputValue);
      if (
        getPanier[j].id == newQuantity.dataset.id &&
        getPanier[j].color == newQuantity.dataset.color
      )
        // Modification de la quantité du produit dans le tableau du panier et enregistrement dans le local storage
        return (
          (getPanier[j].quantity = newQuantity.dataset.value),
          localStorage.setItem("Infos produit", JSON.stringify(getPanier))
        );
    }
  });
});
