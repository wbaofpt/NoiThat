import mysql from "mysql2/promise";
import "dotenv/config";
import { products } from "../frontend/src/data/products.js";

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
await db.query("DELETE FROM products");
for (const product of products) {
  const slug = product.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const image = product.img.startsWith("http")
    ? product.img
    : `https://images.unsplash.com/${product.img}?auto=format&fit=crop&w=1000&q=85`;
  await db.query(
    "INSERT INTO products (name, slug, category, price, image_url, description, featured) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      product.name,
      slug,
      product.cat,
      Number(product.price.replace(/\./g, "")),
      image,
      `Thiết kế ${product.name}, tuyển chọn bởi Nép Living.`,
      Boolean(product.tag),
    ],
  );
}
console.log(`Seeded ${products.length} products.`);
await db.end();
