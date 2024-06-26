
const dayjs = require("dayjs");

const { runQuery, getById, getMyProductsDb, getProductsDb, addMyProductDb, updateProductInfoDb, getDocumentRefById } = require("../utils/db")
const {
    getFirestore,
    Timestamp,
    FieldValue,
    Filter,
} = require("firebase-admin/firestore");

function haversine_distance(p1, p2) {
    const infinity = 9999999
    if (!p1 || !p1.lat || p1.lng) return infinity
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = p1.lat() * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = p2.lat() * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (p1.lng() - p2.lng()) * (Math.PI / 180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d;
}

const getProducts = async (filters, sort, userId) => {
    const results = await getProductsDb(filters);

    let orderedProducts;
    switch (sort) {
        case 'lowToHigh':
            {
                orderedProducts = [...results].sort(
                    (a, b) => a.pricePerDay - b.pricePerDay
                );
                break;
            }
        case 'highToLow':
            {
                orderedProducts = [...results].sort(
                    (a, b) => b.pricePerDay - a.pricePerDay
                );
                break;
            }
        case 'earlyStartTime': {
            orderedProducts = [...results].sort(
                (a, b) => a.startDate.valueOf() - b.startDate.valueOf()
            );
            break
        }

        case 'closest':
            const userDetails = await getById({ collection: "users", id: userId })
            const { address } = userDetails.data
            const userLocation = { lat: address.lat, lng: address.lng }
            orderedProducts = [...results].sort((a, b) => { haversine_distance(a.address, userLocation) - haversine_distance(b.address, userLocation) })
            orderedProducts
            break;
        default:
            orderedProducts = [...results].sort(
                (a, b) => a.startDate.valueOf() - b.startDate.valueOf()
            );
    }


    return orderedProducts;
};


const getMyProducts = async (userId) => {
    const result = await getMyProductsDb(userId);
    return result;
};


const addMyProduct = async (newProductData) => {
    const result = await addMyProductDb(newProductData);
    return result;
}

const updateProductInfo = async (productId, newProductData) => {
    const result = await updateProductInfoDb(productId, newProductData);
    return result;
}
const deleteProduct = async (productId, userId) => {
    try{
        const oldProductRef = getDocumentRefById('products', productId);
        const oldProduct = (await oldProductRef.get()).data();
        if (!oldProduct){
            return {status:404, response: "product does not exist"}
        }
        if (oldProduct.ownerId !== userId){
            return {status: 403, response: 'you are not the owner of this product'};
        }
        const response = await oldProductRef.delete();
        return {status: 200, response};

    } catch (error) {
        console.log('[deleteProduct]', error);
        return {status:500, response: "Server error"}
    }
}
module.exports = { getProducts, getMyProducts, addMyProduct, updateProductInfo, deleteProduct}