const mongoose = require('mongoose')
const Product = require('../../models/product')
const {MongoMemoryServer} = require('mongodb-memory-server')

const mongod = new MongoMemoryServer()

const connect = async () =>{
    const uri = await mongod.getUri()
    const mongooseOpts = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        poolSize: 10
    }

    await mongoose.connect(uri,mongooseOpts)
}

const dropDataBase = async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()

}

const productList = [
    {
        "id": "060095b8-0e4d-49f5-abd6-6bb34dcb5752",
        "title": "Tie Dye Face Mask",
        "price": 300,
        "formatted_price": "$3.00 USD",
        "formatted_msrp": "$4.80 USD",
        "image_cover_url": "https://d2nxps5jx3f309.cloudfront.net/listing_images/attachments/b00/ac1/78-/card/tie-die-mask-model.jpg",
        "category_name": "Women's Clothing",
        "country_origin": "United States",
        "shipping_exclusions": [],
        "premium": false,
        "supplier_name": "Orange Poppy"
    },
    {
        "id": "041162f5-a36c-4731-b346-d734154cedae",
        "title": "Cream Metal Tassel Earrings",
        "price": 645,
        "formatted_price": "$6.45 USD",
        "formatted_msrp": "$10.75 USD",
        "image_cover_url": "https://d2nxps5jx3f309.cloudfront.net/listing_images/attachments/147/41b/30-/card/pee4373cregd.jpg",
        "category_name": "Jewelry & Watches",
        "country_origin": "United States",
        "shipping_exclusions": [],
        "premium": true,
        "supplier_name": "Ivory Aether"
    },
    {
        "id": "03598382-f8f3-4939-803a-3f6a17626389",
        "title": "Boss Pet  Brown  Rubber  Chew Stick Dog Toy  Large  1",
        "price": 1233,
        "formatted_price": "$12.33 USD",
        "formatted_msrp": "$16.45 USD",
        "image_cover_url": "https://d2nxps5jx3f309.cloudfront.net/listing_images/attachments/ead/c07/2f-/card/8303646_A.eps_High.jpg",
        "category_name": "Home & Garden",
        "country_origin": "United States",
        "shipping_exclusions": [],
        "premium": false,
        "supplier_name": "Purple Amymone"
    },
    {
        "id": "1851d09e-4ee4-466d-ad76-3c6023a03f41",
        "title": "Blue Chalk Sticks - 4\" Pot",
        "price": 599,
        "formatted_price": "$5.99 USD",
        "formatted_msrp": "$7.99 USD",
        "image_cover_url": "https://d2nxps5jx3f309.cloudfront.net/listing_images/attachments/98f/160/1b-/card/HPS-standard_plant__Blue_Chalksticks.jpg",
        "category_name": "Garden",
        "country_origin": "United States",
        "shipping_exclusions": [],
        "premium": true,
        "supplier_name": "White Bella"
    },
    {
        "id": "0906bfd4-4b47-4e32-9b9d-b284af0cc1aa",
        "title": "Dr. Earth  Pot of Gold  Organic Potting Soil  8 quart, dry",
        "price": 1636,
        "formatted_price": "$16.36 USD",
        "formatted_msrp": "$21.81 USD",
        "image_cover_url": "https://d2nxps5jx3f309.cloudfront.net/listing_images/attachments/70a/81e/29-/card/7001593_A.eps_High.jpg",
        "category_name": "Home & Garden",
        "country_origin": "United States",
        "shipping_exclusions": [],
        "premium": false,
        "supplier_name": "Purple Amymone"
    },
    {
        "shipping_exclusions": [
            "Algeria",
            "American Samoa",
            "Argentina",
            "Azerbaijan",
            "Bahrain",
            "Bangladesh",
            "Benin",
            "Bermuda",
            "Bosnia And Herzegovina",
            "Brazil",
            "Brunei Darussalam",
            "Congo",
            "Costa Rica",
            "Cyprus",
            "Dominican Republic",
            "Ecuador",
            "Egypt",
            "El Salvador",
            "French Guiana",
            "Greenland",
            "Guadeloupe",
            "Guam",
            "Guatemala",
            "Honduras",
            "Hong Kong",
            "India",
            "Iraq",
            "Isle Of Man",
            "Italy",
            "Jordan",
            "Kazakhstan",
            "Kuwait",
            "Lebanon",
            "Macedonia",
            "Madagascar",
            "Martinique",
            "Mauritius",
            "Moldova, Republic Of",
            "Montserrat",
            "Morocco",
            "North Macedonia",
            "Oman",
            "Pakistan",
            "Panama",
            "Papua New Guinea",
            "Peru",
            "Philippines",
            "Puerto Rico",
            "Qatar",
            "Reunion Island",
            "Romania",
            "Serbia",
            "South Africa",
            "Sri Lanka",
            "Syria",
            "Taiwan",
            "Tunisia",
            "Uganda",
            "Venezuela",
            "Vietnam"
        ],
        "id": "922e86e3-5c03-47f1-88c1-2f397513d4a7",
        "title": "Reusable Beeswax Food Wraps ",
        "price": 302,
        "formatted_price": "$3.02 USD",
        "formatted_msrp": "$25.00 USD",
        "image_cover_url": "https://d2nxps5jx3f309.cloudfront.net/listing_images/attachments/f22/fd1/2a-/card/Reusable-Beeswax-Food-Wraps-Washable-Food-Storage-Bags-Organic-Beeswax-Cloth-Wrap-Silicone-Food-Wrap-Replacement.jpg",
        "category_name": "Organization",
        "country_origin": "China",
        "premium": true,
        "supplier_name": "Gold Atalanta",
        "__v": 0
    }
]

const setUpData = async () => {
    await Product.deleteMany()

    productList.forEach(async(data) =>{
        await new Product(data).save()
    })
}

module.exports = {
    connect,dropDataBase,setUpData,productList
}

