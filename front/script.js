// Envoie de la requête HTTP auprès du service web
const dataCanape = fetch("http://localhost:3000/api/products");
// Récupération des données depuis l'API
dataCanape.then((response) => {
  const listCanape = response.json();
  listCanape.then((list) => {
    for (let i = 0; i < list.length; i++) {
      console.log(list[i]);
      const imgCanape = list[i].imageUrl;
      const nameCanape = list[i].name;
      const desCanape = list[i].description;

      // Création d'une variable pour l'élément items
      const items = document.getElementById("items");

      // Création du lien produit et ajout dans la section items
      const lienCanape = document.createElement("a");
      lienCanape.setAttribute("href", "#");
      items.appendChild(lienCanape);
      lienCanape.classList.add("lienCanape");
    }
  });
});
