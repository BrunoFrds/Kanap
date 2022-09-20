// Récupération de l'URL de la page affiché
const urlProduct = new URL(window.location.href);
console.log(urlProduct);
// Récupération de l'id de l'URL en question
const urlId = urlProduct.searchParams.get("id");
console.log(urlId);

// Envoie de la requête HTTP auprès du service web
const dataCanape = fetch("http://localhost:3000/api/products");
// Récupération des données depuis l'API
dataCanape.then((response) => {
  const listCanape = response.json();
  listCanape.then((list) => {
    console.log(list[0]);

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
        const itemTitlePrice = document.getElementsByClassName(
          "item__content__titlePrice"
        );
        const itemTitle = document.getElementById("title");
        const itemPrice = document.getElementById("price");
        itemTitle.innerHTML = nomItemList;
        itemPrice.innerHTML = priceItemList;

        // Création et ajout de la variable pour la description
        const itemDescription = document.getElementById("description");
        itemDescription.innerHTML = descriptionItemList;

        // Création d'une variable pour le select
        const arrayColors = document.getElementById("colors");

        // Création des variables pour les choix de couleur
        const colorOption1 = document.querySelector("option");
        const colorOption2 = document.createElement("option");
        const colorOption3 = document.createElement("option");
        const colorOption4 = document.createElement("option");

        // Définition des valeurs pour chaque option
        colorOption1.value = list[i].colors[0];
        colorOption1.text = list[i].colors[0];

        colorOption2.value = list[i].colors[1];
        colorOption2.text = list[i].colors[1];

        colorOption3.value = list[i].colors[2];
        colorOption3.text = list[i].colors[2];

        colorOption4.value = list[i].colors[3];
        colorOption4.text = list[i].colors[4];

        // Ajout des options au select
        arrayColors.add(colorOption2);
        arrayColors.add(colorOption3);
        arrayColors.add(colorOption4);
      }
    }
  });
});
