// Récupération de l'URL de la page affiché
const urlOrder = new URL(window.location.href);
console.log(urlOrder);
// Récupération de l'id de l'URL en question
const urlOrderId = urlOrder.searchParams.get("id");
console.log(urlOrderId);

// Création d'une variable pour l'élément order Id
const orderId = document.getElementById("orderId");
// Insertion de l'order Id dedans
orderId.innerHTML = urlOrderId;
