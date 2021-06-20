# Back-end for Product details search page

This is backend service catering to all the search queries generated from the product details front end application.

**Tech-stack**

* Node.js

* express

* MongoDb

**How to run test cases?**

This application uses `jest`, `super test`, and in memory mongodb server using `mongodb-memory-server` to run the basic product search test cases. To run the test suit, execute

```

npm install
npm test


````

N.B: node and npm needs to be pre intsalled

**How to run this application on local?**

* Install node , npm and mongodb. start the mongoDb server

* Inside the project directory reach to the dev.env file: 
`product-details-be/config/dev.env`

insert the database connection url, port and database name 

```
PORT=9000
MONGO_URL=mongodb://127.0.0.1:27017/spocket

```
* Go to the project directory and execute command to start local dev instance

```
npm run dev

````

The application runs on top of nodemon which auto restarts the application every time a change is made on the source code.

* Load product data. to do this, there is a get endpoint exposed from this service.

`GET: /spocket/loadData`

on invoking the above get call, a call is triggered to spockets item details api
`https://s3.amazonaws.com/spocket.assets/products.json` and loads the product list to backend mongodb products collection.

N.B.: This endpoint should be use only once to load the product data for the first time.

**Search product API**

This is the main search api exposed by this service, on which chained queries can be made to load filtered product list. By default, if there are no query params entered, the API returns list of all available products

Example call:

```
http://localhost:9000/spocket/items?category_name=Healthcare&country_origin=United+States&ship_to=Algeria&premium=true

```
Response:

`HTTP code:200`

```
[
    {
        "shipping_exclusions": [],
        "_id": "60c71d695c654f0534d1d471",
        "id": "378820ef-df3c-48c4-ae54-a9ca3d5004e4",
        "title": "Comic Face Mask",
        "price": 300,
        "formatted_price": "$3.00 USD",
        "formatted_msrp": "$4.80 USD",
        "image_cover_url": "https://d2nxps5jx3f309.cloudfront.net/listing_images/attachments/0f0/559/69-/card/comic.jpg",
        "category_name": "Healthcare",
        "country_origin": "United States",
        "premium": true,
        "supplier_name": "Orange Poppy",
        "__v": 0
    },
    {
        "shipping_exclusions": [],
        "_id": "60c71d695c654f0534d1d4df",
        "id": "ef9719f7-bc34-4c7b-824d-816b3890e963",
        "title": "Organic Activated Charcoal Toothpaste",
        "price": 375,
        "formatted_price": "$3.75 USD",
        "formatted_msrp": "$6.25 USD",
        "image_cover_url": "https://d2nxps5jx3f309.cloudfront.net/listing_images/attachments/563/e91/84-/card/il_570xN.1174059126_l8sx.jpg",
        "category_name": "Healthcare",
        "country_origin": "United States",
        "premium": true,
        "supplier_name": "White Smokey",
        "__v": 0
    }
]
```

Query definitions:

Params | Definition 
 --- | ---
 category_name | displays products with selected category
 price  | max/min displays product with maximum/minimum price
 country_origin | displays products which orginates from the selected country
 ship_to | displays products which does not have the selected country name in the shipping_exclusions
 premium | if true, it returns only premium products, else returns all products
 supplier_name | filters products based on the supplier name
 sortBy | high/low, sorts product by price high to low or vice versa 


