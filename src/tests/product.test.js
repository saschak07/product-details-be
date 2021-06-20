const request = require('supertest')
const app = require('./fixtures/testApp')
const {setUpData,dropDataBase,productList} = require('./fixtures/db')

beforeAll(async () => {
    await setUpData()
})

afterAll( async () => {
    await dropDataBase()
})
/**
 * integration test suit that spins up an in memory mongoDb and uses supertest to start a 
 * test express instance and triggers http queries as laid out in each of the following test cases 
 */
describe('test product search', () =>{
    it('should return all products for default blank query', async() =>{
        const response = await request(app).get('/spocket/items').send()
        .expect(200)
        expect(response.body.length).toBe(6)
    })
    it('should return all products matching with title having "mask"', async() =>{
        const response = await request(app).get('/spocket/items?title=mask').send()
        .expect(200)
        expect(response.body.length).toBe(1)
        expect(response.body[0].title.toLowerCase().includes('mask')).toBe(true)
    })
    it('should return all products matching with searched category', async() =>{
        const serachedCategory = "Women's Clothing"
        const response = await request(app).get(`/spocket/items?category_name=${serachedCategory}`).send()
        .expect(200)
        expect(response.body[0].category_name.includes("Women's Clothing")).toBe(true)
    })
    it('should return all products matching chained filteres on category and shipfrom', async() =>{
        const query = {
            category_name: "Home & Garden",
            country_origin: 'United States'
        }
        const response = await request(app).get(`/spocket/items`)
        .query(query)
        .send()
        .expect(200)
        expect(response.body.every(data => data.category_name.includes(query.category_name))).toBe(true)
        expect(response.body.every(data => data.country_origin.includes(query.country_origin))).toBe(true)
    })
    it('should return product with matching with max price', async() =>{
        const price = "max"
        const response = await request(app).get(`/spocket/items?price=${price}`).send()
        .expect(200)
        expect(response.body.length).toBe(1)
        const highestPrice = (productList.reduce((a,b)=>a.price>b.price?a:b)).price
        expect(response.body.every(data=>data.price===highestPrice)).toBe(true)
    })
    it('should return product with shipto country "Algeria"', async() =>{
        const ship_to = "Algeria"
        const response = await request(app).get(`/spocket/items?ship_to=${ship_to}`).send()
        .expect(200)
        expect(response.body.length).toBe(5) // should exclude the product where Algeria is in the exclusion list
        //in the test data, the product "Reusable Beeswax Food Wraps" contains Algeria in the shipping exclusion list
        //this product should not be listed in the result if queried with Algeria as shipto country 
        expect(response.body.map(data=>data.title).includes('Reusable Beeswax Food Wraps')).toBe(false)
    })
    it('should retrun product list sorted with price high to low', async() => {
        const sortBy = 'high'
        const response = await request(app).get(`/spocket/items?sortBy=${sortBy}`).send()
            .expect(200)
        expect(response.body.map(data=>`${data.price}`).toString()).toBe('1636,1233,645,599,302,300')
    })
    it('should only retrun product list with premium products', async() => {
        const premium = 'true'
        const response = await request(app).get(`/spocket/items?premium=${premium}`).send()
            .expect(200)
        expect(response.body.length).toBe(3)
        expect(response.body.every(data=>data.premium)).toBe(true)
    })

})