import puppeteer from "puppeteer";
import express from 'express';
import cors from 'cors';
import e from "express";


const app = express();

const port = process.env.PORT || 3000;

let pageNumber = 1;
let lastRefresh = 0;

let data = [];

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET', 
  credentials: true,
  optionsSuccessStatus: 200 
};


app.use(cors(corsOptions));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const browser = await puppeteer.launch({
  headless: "new",
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080'],
  timeout: 60000,
  defaultViewport: null
});

function getById(id) {  
    return data.find(element => element.id === id);
}

async function getData(){

    let links = [];
    let result = [];

    const page = await browser.newPage();
    for(let i = 1; i < 20; i++){
        let url = `https://catalog.onliner.by/mobile?page=${i}`;
        await page.goto(url);
        
        const allLinks = await page.evaluate(( )=>{
            const phones = document.querySelectorAll(".catalog-form__popover-trigger_hot-secondary");
            return Array.from(phones).map((item)=>{
                const element = item.parentElement.parentElement.parentElement.parentElement;
                const a = element.querySelector("a.catalog-form__link").href;
                return a;
            });
        })
        links = links.concat(allLinks);
    }

for (let url of links) {
  
  await page.goto(url);
  await page.screenshot();
  const phonePage = await page.evaluate((currentUrl) => {

    
    let images = [];
    const id = currentUrl.match(/\/([^\/]+)\/prices\/?$/)?.[1];
    const name = document.querySelector("h1.catalog-masthead__title").textContent.trim().split(' ').filter(word => !['Цены', 'на', 'телефон'].includes(word)).join(' ');
    const description = document.querySelector(".offers-description__specs").querySelector("p").textContent;
    const price = parseInt(document.querySelector(".offers-description__price_secondary").textContent.trim().replace(/^[^\d]+/, '').replace(/(\d[,\d\s]*)\s*р\./, '$1 p.').replace(/\s{2,}/g, ' ').replace(/[^\d,]/g, '').replace(',', '.'));
    const img = document.querySelector("img.offers-description__image").src;
    const productImages = Array.from(
    document.querySelectorAll('div.swiper-slide > img[src^="https://imgproxy.onliner.by"][loading="lazy"]')
  ).map(img => img.src);

    return {id, name, price, description, img, productImages};
  }, url); 
  result.push(phonePage);
}
    lastRefresh = Date.now();
    console.log("done");
    return result;
}

getData();
data = await getData();





app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Express middleware
app.use((req, res, next) => {
  res.set('Connection', 'keep-alive');
  res.set('Keep-Alive', 'timeout=5');
  res.set('Cache-Control', 'public, max-age=0');
  next();
});


app.get('/onlinerData', async (req, res)=>{
    res.json(data);
    const now = Date.now();
    if((now - lastRefresh) > 50000){
      console.log("bebra");
      lastRefresh = now;
      data = await getData();
    }
    
})

app.post('/update', async (req, res)=>{
    let index = data.findIndex((element)=> element.id == req.body.item.id);
    data[index] = req.body.update;
    res.json(data);
})

app.get('/onlinerData/:id', async (req, res)=>{
    const element = getById(req.params.id);
    console.log(element);
    res.json(element);
    const now = Date.now();
    if((now - lastRefresh) > 50000){
      console.log("bebra");
      lastRefresh = now;
      data = await getData();
    }



})

app.post('/onlinerData/cart', async (req, res) => {
  if (!req.body || !Array.isArray(req.body)) {
    return res.status(400).json({ error: "Invalid request: body must be an array" });
  }

  try {
    const ids = req.body;
    
    // 1. Подсчет количества каждого ID
    const countMap = ids.reduce((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    // 2. Получение уникальных ID
    const uniqueIds = [...new Set(ids)];

    // 3. Получение объектов и добавление счетчика
    const itemsPromises = uniqueIds.map(async (id) => {
      const item = await getById(id);
      return item ? { ...item, count: countMap[id] } : null;
    });

    const items = (await Promise.all(itemsPromises)).filter(Boolean);

    res.json(items);
  } catch (error) {
    console.error('Error processing cart:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, ()=>{
    console.log('server is running on ', port);
})


