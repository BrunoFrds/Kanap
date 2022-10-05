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

  // Création et ajout du nom, de la couleur et du prix
  const cartItemName = document.createElement("h2");
  cartItemName.innerHTML = getPanier[i].name;
  cartItemContentDescription.appendChild(cartItemName);

  const cartItemColor = document.createElement("p");
  cartItemContentDescription.appendChild(cartItemColor);
  cartItemColor.innerHTML = getPanier[i].color;

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

  // Création et ajout du bouton supprimer
  const cartItemContentSettingsDelete = document.createElement("div");
  cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

  const buttonDelete = document.createElement("button");
  buttonDelete.innerHTML = "Supprimer";
  cartItemContentSettingsDelete.appendChild(buttonDelete);
}
