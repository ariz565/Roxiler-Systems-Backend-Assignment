# Project Title: [Backend for Product Transaction Application]

## Overview

This backend provides APIs to fetch, initialize, analyze, and visualize product transaction data obtained from a third-party source.

## Data Source

* **API URL:** 
* **Request Method:** GET
* **Response Format:** JSON

## Database Setup

* **Database:** MongoDB (you could specify a preferred version if applicable)
* **Collection:** `transactions` (or another naming convention of your choice)

**Document Structure (Example)**

```json
{
  "_id": <ObjectId>, // MongoDB's default unique identifier
  "id": <Product ID>,
  "title": <Product Title>,
  "price": <Product Price>,
  "description": <Product Description>,
  "category": <Product Category>,
  "image": <Image URL (if applicable)>, 
  "sold": <true/false>,
  "dateOfSale": <Date Object>
}


APIs

1. Database Initialization

Method: POST (ideally change for idempotence later)
Route: /initialize
Functionality:
Fetches JSON from the third-party API.
Clears existing data in the transactions collection (optional).
Inserts parsed product data into the database.

2. Product Transactions

Method: GET
Route: /products
Parameters:
search (optional): For searching title, description, or price (implementation would need text-based search features within MongoDB if supported).
page (optional, default: 1)
perPage (optional, default: 10)

3. Statistics

Method: GET
Route: /statistics
Parameter:
month: The selected month (e.g., "January")

4. Bar Chart Data

Method: GET
Route: /bar-chart
Parameter:
month: The selected month

5. Pie Chart Data

Method: GET
Route: /pie-chart
Parameter:
month: The selected month

6. Combined Data

Method: GET
Route: /combined
Parameter:
month: The selected month
Response Formats
APIs 3, 4, 5: Structured JSON for front-end parsing.
API 6: Consolidated JSON, combining the output of /statistics, /bar-chart, and /pie-chart, providing all required data at once.