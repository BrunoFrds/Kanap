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
    }
  });
});
