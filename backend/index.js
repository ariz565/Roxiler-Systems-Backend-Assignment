// =============== Imports =================

import fetch from "node-fetch"; // Library for making HTTP requests to fetch external data
import express from "express"; // Web framework for creating Node.js servers
import bodyparser from "body-parser"; // Middleware to parse incoming request bodies
import cors from "cors"; // Middleware for enabling cross-origin requests (CORS)
import mongoose from "mongoose"; // Object Data Modeling (ODM) library for MongoDB

// =============== MongoDB Connection =================

const connectionString = "mongodb://localhost:27017/assessment"; // Connection string to the MongoDB database
mongoose
  .connect(connectionString, { useNewUrlParser: true })
  .then(() =>
    console.log("MongoDB database connection established successfully")
  )
  .catch((err) => console.error("Database connection error:", err));

const connection = mongoose.connection; // Get a reference to the underlying connection
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// =============== Express App Setup =================

const app = express();
app.use(bodyparser.json()); // Parse incoming JSON request bodies
app.use(bodyparser.urlencoded({ extended: false })); // Parse URL-encoded form data
app.use(cors()); // Enable CORS to allow requests from other domains

// =============== Data Fetching (Ideally in a separate initialization routine) =================

const response = await fetch(
  "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
);
const data = await response.json();

// =============== Mongoose Schema =================

const transactionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  sold: {
    type: Boolean,
    default: false,
  },
  dateOfSale: {
    type: Date,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

// =============== (Consider placing within an initializeDatabase function) =================

async function getPosts() {
  for (let i = 0; i < data.length; i++) {
    const product = new Transaction({
      id: data[i].id,
      title: data[i].title,
      price: data[i].price,
      description: data[i].description,
      category: data[i].category,
      image: data[i].image,
      sold: data[i].sold,
      dateOfSale: data[i].dateOfSale,
    });
    try {
      const savedProduct = await product.save();
      console.log(savedProduct);
    } catch (err) {
      console.log(err);
    }
  }
}

// =============== API Routes =================

// Fetch all products
app.get("/products", async (req, res) => {
  try {
    const products = await Transaction.find();
    res.send(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Server error");
  }
});

// Calculate sales statistics for a given month
app.get("/salesMonth", async (req, res) => {
  const map1 = new Map();
  map1.set("January", "01");
  map1.set("February", "02");
  map1.set("March", "03");
  map1.set("April", "04");
  map1.set("May", "05");
  map1.set("June", "06");
  map1.set("July", "07");
  map1.set("August", "08");
  map1.set("September", "09");
  map1.set("October", "10");
  map1.set("November", "11");
  map1.set("December", "12");
  var search = req.query.keyword;
  search.toString();

  let sales = 0,
    soldItems = 0,
    totalItems = 0;
  for (let i = 0; i < data.length; i++) {
    let originalString = data[i].dateOfSale;
    let sold = data[i].sold;
    originalString.toString();
    let text = originalString.substring(5, 7);
    if (text == map1.get(search)) {
      sales += data[i].price;
      totalItems += 1;
      if (sold == true) soldItems += 1;
    }
  }
  res.send(
    `The Total Sale in this month: ${sales}, The Total Number of Sales in this month: ${soldItems}, Total number of not sold items of selected month: ${
      totalItems - soldItems
    }`
  );
});

//Task 3
// Generate data for a bar chart (price range vs. number of items)
app.get("/barChart", (req, res) => {
  const map1 = new Map();
  map1.set("January", "01");
  map1.set("February", "02");
  map1.set("March", "03");
  map1.set("April", "04");
  map1.set("May", "05");
  map1.set("June", "06");
  map1.set("July", "07");
  map1.set("August", "08");
  map1.set("September", "09");
  map1.set("October", "10");
  map1.set("November", "11");
  map1.set("December", "12");
  var search = req.query.keyword;
  search.toString();

  const map2 = new Map();
  map2.set(100, 0);
  map2.set(200, 0);
  map2.set(300, 0);
  map2.set(400, 0);
  map2.set(500, 0);
  map2.set(600, 0);
  map2.set(700, 0);
  map2.set(800, 0);
  map2.set(900, 0);
  map2.set(901, 0);
  // Group transactions by price range
  for (let i = 0; i < data.length; i++) {
    let originalString = data[i].dateOfSale;
    let sold = data[i].sold;
    originalString.toString();
    let text = originalString.substring(5, 7);
    if (text == map1.get(search)) {
      if (data[i].price < 100) map2.set(100, map2.get(100) + 1);
      else if (data[i].price < 200) map2.set(200, map2.get(200) + 1);
      else if (data[i].price < 300) map2.set(300, map2.get(300) + 1);
      else if (data[i].price < 400) map2.set(400, map2.get(400) + 1);
      else if (data[i].price < 500) map2.set(500, map2.get(500) + 1);
      else if (data[i].price < 600) map2.set(600, map2.get(600) + 1);
      else if (data[i].price < 700) map2.set(700, map2.get(700) + 1);
      else if (data[i].price < 800) map2.set(800, map2.get(800) + 1);
      else if (data[i].price < 900) map2.set(900, map2.get(900) + 1);
      else map2.set(901, map2.get(901) + 1);
    }
  }
  res.setHeader("Content-Type", "text/html");
  res.write(
    `<h2>Price range and the number of items in that range for the selected month regardless of the year</h2>`
  );
  for (let [key, value] of map2) {
    res.write("< " + key + " = " + value + `<br/>`);
  }
});

//Task 4
// Generate data for a pie chart (categories vs. number of items)

app.get("/pieChart", async (req, res) => {
  const map1 = new Map();
  map1.set("January", "01");
  map1.set("February", "02");
  map1.set("March", "03");
  map1.set("April", "04");
  map1.set("May", "05");
  map1.set("June", "06");
  map1.set("July", "07");
  map1.set("August", "08");
  map1.set("September", "09");
  map1.set("October", "10");
  map1.set("November", "11");
  map1.set("December", "12");
  var search = req.query.keyword;
  search.toString();

  const map2 = new Map();
  for (let i = 0; i < data.length; i++) {
    let originalString = data[i].dateOfSale;
    originalString.toString();
    let text = originalString.substring(5, 7);
    if (text == map1.get(search)) {
      let category = data[i].category;
      category.toString();
      map2.set(category, 0);
    }
  }
  for (let i = 0; i < data.length; i++) {
    let originalString = data[i].dateOfSale;
    originalString.toString();
    let text = originalString.substring(5, 7);
    if (text == map1.get(search)) {
      let category = data[i].category;
      // console.log(category);
      category.toString();
      map2.set(category, map2.get(category) + 1);
      // console.log(map2.get(category));
    }
  }
  res.setHeader("Content-Type", "text/html");
  res.write(
    `<h2>Unique categories and number of items from that category for the selected month</h2>`
  );
  for (let [key, value] of map2) {
    res.write(key + " category: " + value + `<br/>`);
  }
});

// =============== Start Server =================
const port = 3000;
app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
