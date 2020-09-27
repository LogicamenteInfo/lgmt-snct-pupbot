const puppeteer = require('puppeteer');
const axios = require('axios').default;
require('dotenv').config();
const { PUSHBULLET_TOKEN,
  TARGET_SITE,
  TARGET_ID,
  PRICE_THRESHOLD,
  REFRESH_TIME,
  EXIT_ON_SUCCESS } = process.env;

async function getPrice() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  console.log('Abriu navegador');
  await page.goto(TARGET_SITE, { waitUntil: 'networkidle0' });
  console.log('Abriu o site', TARGET_SITE);
  const element = await page.$(`#${TARGET_ID}`);
  console.log('Capturou o valor de', `#${TARGET_ID}`);
  if (element) {
    const price = await element.getProperty('innerText');
    browser.close();
    return price.jsonValue().then(v => v.replace(/\D/g, ''));
  }
  browser.close();
  return null;
}

async function notifyMe(price) {
  console.log('Valor capturado é menor que o threshold', PRICE_THRESHOLD);
  console.log('Enviando notificação');
  const headers = {};
  headers['Access-Token'] = PUSHBULLET_TOKEN;
  headers['Content-Type'] = 'application/json';
  const formatedPrice = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseInt(price) / 100);
  await axios.post('https://api.pushbullet.com/v2/pushes', {
    title: 'Preço baixo',
    body: `Robô identificou preço de ${formatedPrice}`,
    type: 'note',
    email: 'natanael.simoes@logicamente.info',
  }, { headers });
}

async function evaluatePrice() {
  const price = await getPrice();
  console.log('Valor capturado', price);
  if (price < PRICE_THRESHOLD) {
    await notifyMe(price);
    if (EXIT_ON_SUCCESS === "1") {
      console.log('Sistema configurado para sair ao capturar preço baixo');
      process.exit();
    }
  }
  console.log('Fim da captura, o robô tentará novamente em', `${REFRESH_TIME} ms`);
  setTimeout(evaluatePrice, REFRESH_TIME);
}

evaluatePrice();