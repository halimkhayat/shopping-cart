if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
    // remove item in cart
    var removeBtnCart = document.getElementsByClassName('btn-danger');
    console.log(removeBtnCart)
    for(var i = 0; i < removeBtnCart.length; i++) {
        var removeBtn = removeBtnCart[i];
        removeBtn.addEventListener('click', removeItemInCart)
    }

    // changing quantity in cart
    var quantityInput = document.getElementsByClassName('cart-quantity-input');
    for(var i = 0; i < quantityInput.length; i++){
        var noInput = quantityInput[i];
        noInput.addEventListener('change', quantityChange)
    }

    // add item to cart
    var addToCart = document.getElementsByClassName('add-item');
    for(var i = 0; i < addToCart.length; i++){
        var addBtn = addToCart[i];
        addBtn.addEventListener('click', cartAdded)
    }

    document.getElementsByClassName('btn-primary')[0].addEventListener('click', purchaseClicked)

}

// array of item list
const item = [
    {
        item: "Men T  Shirt",
        price: "RM 20.00",
        image: "images/shirt_1.jpeg"
    },
    {
        item: "Batik Shirt",
        price: "RM 50.00",
        image: "images/batik_man.webp"
    },
    {
        item: "Running Shoes",
        price: "RM 130.35",
        image: "images/running_shoes.png"
    },
    {
        item: "Trousers",
        price: "RM 72.65",
        image: "images/trousers_man.avif"
    }, 
]
console.log(item)

// display item on shopping list
const mainContainer = document.getElementById('cart-box');
for(let i of item){
    let itemContainer = document.createElement('div');
    itemContainer.classList.add('item-container');

    let img = document.createElement('img');
    img.classList.add('image-container');
    img.setAttribute("src", i.image );

    let detailsContainer = document.createElement('div');
    detailsContainer.classList.add('details-container');
    

    let title = document.createElement('span');
    title.classList.add('item-title');
    title.innerText = i.item
    detailsContainer.appendChild(title)

    let price = document.createElement('p');
    price.classList.add('price');
    price.innerText = i.price
    detailsContainer.appendChild(price)

    let button = document.createElement('button');
    button.innerText = 'Add to Cart'
    button.classList.add('add-item');

    itemContainer.appendChild(img);
    itemContainer.appendChild(detailsContainer);
    itemContainer.appendChild(button);
    mainContainer.appendChild(itemContainer)
}


function quantityChange(event){
    var inputChange = event.target;
    if(isNaN(inputChange.value) || inputChange.value <= 0){
        inputChange.value = 1
    }
    updateCartTotal()
}

function removeItemInCart(event){
    var btnClicked = event.target;
    btnClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function cartAdded(event){
    var button = event.target;
    var itemInShop = button.parentElement;
    var title = itemInShop.getElementsByClassName('item-title')[0].innerText;
    var imgSrc = itemInShop.getElementsByClassName('image-container')[0].src;
    var price = itemInShop.getElementsByClassName('price')[0].innerText;
    addItemToCart(title, imgSrc, price)
    updateCartTotal()
}

function purchaseClicked(){
    alert('Thank you for your Purchase. Have a nice day!')
    var cartItems = document.getElementById('mainCart');
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

// creating new row of item in the cart once the add to cart button clicked
function addItemToCart(title, imgSrc, price){
    var newCartRow = document.createElement('div');
    newCartRow.classList.add('cart-row');
    var cartItems = document.getElementById('mainCart');
    var cartItemTitle = cartItems.getElementsByClassName('cart-title');
    for (var i = 0; i < cartItemTitle.length; i++){
        if(cartItemTitle[i].innerText == title ){
            alert('This item is already in the cart')
            return
        }
    }

    var rowsContent = ` 
            <div class="cart-items">
                <img class="cart-img" src="${imgSrc}">
                <p class="cart-title">${title}</p>
            </div>
            <span class="cart-price">${price}</span>
            <div>
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn-danger">Remove</button>
            </div>`
        newCartRow.innerHTML = rowsContent
        cartItems.append(newCartRow);
        newCartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeItemInCart);
        newCartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChange)
}

// total of items in cart
function updateCartTotal() {
    var cartContainer = document.getElementsByClassName('main-cart')[0];
    var cartRows = cartContainer.getElementsByClassName('cart-row')
    var total = 0;
    for(var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceEle = cartRow.getElementsByClassName('cart-price')[0];
        var quantityEle = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceEle.innerText.replace('RM', ''))
        var quantity = quantityEle.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = 'RM ' + total
}