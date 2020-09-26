const possiblePrices = [4499, 4499, 4499, 4499, 4299];

const dateOptions = {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
};

function generatePrice() {
  const randomIndex = Math.floor(Math.random() * possiblePrices.length);
  const randomPrice = possiblePrices[randomIndex];
  const formatedPrice = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(randomPrice);
  document.querySelector('#price').innerHTML = formatedPrice;
  const now = Intl.DateTimeFormat('pt-BR', dateOptions).format(new Date());
  document.querySelector('#generation').innerHTML = now;
}

window.onload = generatePrice;