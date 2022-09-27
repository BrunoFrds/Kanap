// Ajout d'une variable pour la section cart__items
const cartItems = document.getElementById("cart__items");
console.log(cartItems);

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
//imageKanap.src = list[i].imageUrl;
imgCartItem.setAttribute("alt", (altCartItem.innerHTML = "alt"));
cartItemImg.appendChild(imgCartItem);

// Création et ajout de la div cart__item__content
const cartItemContent = document.createElement("div");
cartItem.appendChild(cartItemContent);

// Création et ajout de la div contenant le nom, la couleur et le prix du produit
const cartItemContentDescription = document.createElement("div");
cartItemContent.appendChild(cartItemContentDescription);

// Création et ajout du nom, de la couleur et du prix
const cartItemName = document.createElement("h2");
cartItemContentDescription.appendChild(cartItemName);

const cartItemColor = document.createElement("p");
cartItemContentDescription.appendChild(cartItemColor);

const cartItemPrice = document.createElement("p");
cartItemContentDescription.appendChild(cartItemPrice);

// Création et ajout de la div cart__item__content__settings
const cartItemContentSettings = document.createElement("div");
cartItemContent.appendChild(cartItemContentSettings);

// Création et ajout de la div contenant la quantité
const cartItemContentSettingsQuantity = document.createElement("div");
cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

const cartItemQuantity = document.createElement("p");
cartItemContentSettingsQuantity.appendChild(cartItemQuantity);

// Création et ajout du bouton supprimer
