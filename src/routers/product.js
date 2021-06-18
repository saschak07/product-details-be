/**
 * logical routing configuration to expose diffenet rest enpoints to
 * perform create and read the product details
 */
const express = require('express')
const Product = require('../models/product')
const axios = require('axios')
const NodeCache = require( "node-cache" );
const myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );

const router = express.Router()

/**
 * this is a dummy get endpoint to be used only once for loading product data
 * to the database for the first time.
 */
router.get('/spocket/loadData', async (req,res) => {
    try{
        const response = await axios.get('https://s3.amazonaws.com/spocket.assets/products.json')
        response.data.forEach(async (element) => {
            const product = new Product(element)
            await product.save()
        });          
        res.status(200).send('success')
    }catch(e){
        console.log(e)
        res.status(500).send({errMsg: e})
    }
})

/**
 * main product details retrieval endpoint to display list 
 * of all products filtered based on the search criteria
 * default get call: /spocket/items : fetches all items
 * filtered call: spocket/items?category_name=Home %26 Garden&title=Boss Pet  Brown  Rubber  Chew Stick Dog Toy  Large  1
 * lists out items filtered by the category and title
 * more filters can be chained to arrive at further reduced set of results.
 */
router.get('/spocket/items', async (req,res) => {
    try{
        const query = {}
        const queryString = Object.keys(req.query).map(key =>`${key}:${req.query[key]}`)
                                .toString()
        console.log(`search query string : ${queryString}`)
        /**
         * in memory cache is implement below , if there are same query triggered
         * 100 s ago, the cached result will be returned instead of querying the db
         */
        const cachedResult = await myCache.get(queryString)
        if(cachedResult){
            console.log('result being retreived from in memory cache')
            res.status(200).send(cachedResult)
            return
        }
        Object.keys(req.query).forEach(key =>{
            query[key] = req.query[key]
        })
        let product = []
        if('title' in query){
            console.log(`query being triggered to dabase : ${queryString}`)
            const titleSearch = query.title;
            query.title = {$regex: titleSearch,$options: 'i'}    
        }
        if('price' in query){
            if(query.price === 'max'){
                delete query.price
                let retrievedProduct = await Product.find(query)
                const productWithMaxPrice = retrievedProduct.reduce((a,b)=>a.price>b.price?a:b)
                product=retrievedProduct.filter(data=>data === productWithMaxPrice)
                await myCache.set(queryString,product,100)
                res.status(200).send(product)
            }
            else{
                delete query.price
                let retrievedProduct = await Product.find(query)
                const productWithMaxPrice = retrievedProduct.reduce((a,b)=>a.price<b.price?a:b)
                product=retrievedProduct.filter(data=>data === productWithMaxPrice)
                await myCache.set(queryString,product,100)
                res.status(200).send(product)
            }
            return
        }
        console.log(`query being triggered to dabase : ${queryString}`)
        product = await Product.find(query)
        
        /**
         * after the data fetched from db, same is loaded in the in-mem cache
         * with the queryString as key and retreived data as value with a life time
         * of 100 seconds to be used by calls made with the same query
         *
         */
        await myCache.set(queryString,product,100)
        res.status(200).send(product)
        return
    }catch(e){
        console.log(e)
        res.status(500)
    }
})

module.exports = router