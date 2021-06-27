"use strict";

const cart = [ ];
const itemList = document.getElementById('item-list');
const countItems = document.getElementById('count-items')
const totalPrice = document.getElementById('total-price')
const addForm = document.getElementById('add-form')
const itemName = document.getElementById('item-name')
const itemPrice = document.getElementById('item-price')


// Handle clicks on list
itemList.onclick = function (e) {
    // console.log("Clicked list");
    console.log(e.target);
    if (e.target && e.target.classList.contains('remove')) {
        const name = e.target.dataset.name;
        removeItem(name);
    }
}


//handle add form submit
addForm.onsubmit = function (e) {
    e.preventDefault();
    const name = itemName.value;
    const price = itemPrice.value;
    addItem(name, price);
}

//Add item
function addItem(name, price) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].qty += 1;
            showItems()
            return;
        }
    };
    const item = {
        name,
        price,
        qty: 1
    } 
    cart.push(item)
    showItems();
}

function showItems() {
    //Gets and shows amount of items and total price
    const qty = getQty();
    // console.log(`You have ${qty} items in ur cart`);
    countItems.innerHTML = `You have ${qty} items in ur cart`

    let itemStr = ''
    //List all the items and count sum
    cart.forEach(element => {

        const { name, price, qty } = element
        itemStr += `<li>${name} $${price} X ${qty} = ${price * qty} 
        <button class="remove" data-name="${name}">Remove</button>
        </li>`
    });
    itemList.innerHTML = itemStr;

    // console.log(`The total price is ${getTotalsPrice()}`);
    totalPrice.innerHTML = `The total price is ${getTotalPrice()}`
}

//get quantity 
function getQty () {
    let cartQty = 0;
    cart.forEach(element => {
        cartQty += element.qty;
    });
    return cartQty;
}
//get total price
function getTotalPrice() {
    let totalPrice = 0;
    cart.forEach(element => {
        totalPrice += element.price * element.qty; 
    });
    return totalPrice.toFixed(2);
}

function removeItem(name, qty = 0) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            if (qty > 0) {
                cart[i].qty -= qty;
            }
            if (qty === 0 || cart[i].qty < 1) {
                cart.splice(i, 1);
            }
            showItems();
            return
        }
    }
}


//test
// addItem('Apple', 0.99);
// addItem('Orange', 1.99);
// addItem('Opinion', 0.02);
// addItem('Banana', 1.03);
// addItem('Bana na', 1.03);
// addItem('Orange', 1.99);




// showItems()