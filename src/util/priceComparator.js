const priceHighToLowComparator = (a,b) => b.price-a.price
const priceLowToHighComparator = (a,b) => a.price-b.price

module.exports = {priceHighToLowComparator,priceLowToHighComparator}