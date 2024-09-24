const express = require('express');

import { createClient, print } from "redis";

const listProducts = [
  { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 }
];

const redis_client = createClient();
const getRedAsync = promisify(redis_client.get).bind(redis_client);
redis_client.on('err', () => console.log('Redis client not connected to the server: ${err.message}'))
redis_client.on('connect', () => console.log('Redis client connected to the server'))

// Track Products In stock in Redis
function reserveStockById(itemID, stock) {
  const key = `item.${itemID}`
  redis_client.set(key, stock, print)
}
async function getCurrentReservedStockById(itemID) {
  const key = `item.${itemID}`
  const reserve = await getRedAsync(key)
  return +(reserve) || 0
}

function getItemById(id) {
  return listProducts.find((prod) => prod.itemID === id);
}

//  Expres App
const app = express();
const port = 1245;

// Product detail
app.get('/list_products', (req, res) => {
  res.json(listProducts)
})

app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const product = getItemById(itemId);

  if (!product) {
    return res.status(404).json({ status: 'Product not found' });
  }
  // await current reserved stock from Redis
  const currentReservedStock = await getCurrentReservedStockById(itemId);

  // update the stock info of the product
  product.currentQuantity = product.initialAvailableQuantity - currentReservedStock;

  res.json(product);
});

// Reserve a product
app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const product = getItemById(itemId);

  if (!product) {
    return res.status(404).json(notFound);
  }
  const currentReservedStock = await getCurrentReservedStockById(itemId);

  if (currentReservedStock >= product.initialAvailableQuantity) {
    return res.json({ status: 'Not enough stock available', itemId });
  }

  reserveStockById(itemId, currentReservedStock + 1);

  res.json({ status: 'Reservation confirmed', itemId });
});

app.listen(port, () => console.log('listening on port 1245'));
