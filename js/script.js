const acima10 = 'https://felipegrande.github.io/jsoncodeby/acima10.json';
const abaixo10 = 'https://felipegrande.github.io/jsoncodeby/abaixo10.json';

const urlJson = window.location.search === "?acima10" ? acima10 : abaixo10;

fetch(urlJson).then(response =>{
    return response.json();
})
.then(data =>{
    mountCart(data);
});


const mountCart = (data) => {

    const { items, totalizers } = data;

    mountPriceOrder(totalizers);
    items.map(item => {
        cardProduct(item);

    });

}

const cardProduct = (product) => {
    //Container cardProduto
    const listProducts  = document.querySelector(".products");
    const containerCardProduct = document.createElement("div");
    containerCardProduct.classList.add("card-product");

    //imagem produto
    const cardProductImg = document.createElement("img");
    cardProductImg.classList.add("card-product__img");
    cardProductImg.src = product.imageUrl

    //Modulo info do produto
    const cardProductInfo = document.createElement("div");
    cardProductInfo.classList.add("card-name-price");

    //nome do produto
    const cardProductName = document.createElement("span");
    cardProductName.classList.add("card-product__name");
    cardProductName.textContent = product.name

    //nome do produto
    const cardProductPriceOld = document.createElement("span");
    cardProductPriceOld.classList.add("card-product__price_old");
    cardProductPriceOld.textContent = formatPrice(product.price)

    //nome do produto
    const cardProductPrice = document.createElement("span");
    cardProductPrice.classList.add("card-product__price");
    cardProductPrice.textContent = formatPrice(product.price + product.priceTags[0].value)

    listProducts.appendChild(containerCardProduct);
    
    containerCardProduct.appendChild(cardProductImg);
    containerCardProduct.appendChild(cardProductInfo);

    cardProductInfo.appendChild(cardProductName);
    cardProductInfo.appendChild(cardProductPriceOld);
    cardProductInfo.appendChild(cardProductPrice);

}

const mountPriceOrder = (total) => {
    const valueOrder  = document.querySelector(".amount__price_old"); // valor sem descontos
    const valueDiscount  = document.querySelector(".amount__price_discount"); // valor do desconto
    const value  = document.querySelector(".amount__price_pay"); //valor total com desconto
    
    const calcDiscount = total[0].value + total[1].value;
    valueOrder.textContent = formatPrice(total[0].value);
    valueDiscount.textContent = formatPrice(total[1].value);
    value.textContent = formatPrice(calcDiscount);
    checkFreeFreight(calcDiscount) 
}

const checkFreeFreight = (value) => {

let freeShipping = document.querySelector(".freight__data")

const calcPrice = value/100;
if (calcPrice <= 10 ){
    freeShipping.classList.add("hide");
}
}

const formatPrice = (value) => {
    return `R$ ${((value/100).toFixed(2)).toString().replace('.',',')}`
}

