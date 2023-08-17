import Commerce from '@chec/commerce.js'


export const commerce= new Commerce(import.meta.env.VITE_API_SECRET_KEY);



export async function addProductToCart(phoneId, count){
    try {
        const product= await  commerce.cart.add(`${phoneId}`, count)
        return product
    } catch (error) {
        console.log(error.message);
    }
}
export async function createCart(){
    try {
        const product= await  commerce.cart.retrieve()
        return product
    } catch (error) {
        console.log(error.message);
    }
}

export async function updateCart(phoneId, count){
    try {
        const product= await  commerce.cart.update(`${phoneId}`, { quantity: `${count}` })
        return product
    } catch (error) {
        console.log(error.message);
    }
}
export async function getProductFromBasket(){
    try {
        const product= await  commerce.cart.retrieve()
        return product
    } catch (error) {
        console.log(error.message);
    }
}

export async function removeFromCart(id){
    try {
        const product= await  commerce.cart.remove(`${id}`)
        return product
    } catch (error) {
        console.log(error.message);
    }
}
export async function getProduct(phoneId){
    try {
        const product= await  commerce.products.retrieve(`${phoneId}`)
        return product
    } catch (error) {
        console.log(error.message);
    }
}