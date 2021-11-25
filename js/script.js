const acima10 = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/11b895d0-bc64-4f3a-bfa9-7c652be8d415/acima-10-reais.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20211125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211125T040032Z&X-Amz-Expires=86400&X-Amz-Signature=657179790e16d035e0d2fca349b34db1b9ed9dc45a95b613a682ee3f43ef4bce&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22acima-10-reais.json%22&x-id=GetObject';
const abaixo10 = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5bbd6fdd-abae-411d-96cc-1a5d76d3803b/abaixo-10-reais.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20211125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211125T012940Z&X-Amz-Expires=86400&X-Amz-Signature=462b889c4ebdf3437fb74282a62b827fcff2718d761e2c978332ed130638c773&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22abaixo-10-reais.json%22&x-id=GetObject'

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

