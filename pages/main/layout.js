// wrapper
const body = document.body
const docFragment = document.createDocumentFragment();


// function create html elements
const createElement = (element, idName, className) => {
    const elem = document.createElement(element);
    elem.setAttribute('id',idName);
    elem.classList.add(className);
    return elem;
}

// function create nav elements
function addNavItem(idName, className, url, text) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    li.setAttribute('id',idName);
    li.classList.add(className);
    a.setAttribute('href', url);
    a.textContent = text;
    li.append(a);
    return li;
}

//function create logo div
function addLogoDiv(imgUrl) {
    let div = createElement('div', 'logo', 'logo');
    let a = document.createElement('a');
    let img = document.createElement('img')
    a.setAttribute('href', './index.html');
    img.setAttribute('src', imgUrl);
    a.append(img);
    div.append(a);
    return div;
}

const navCartItem = (imgUrl) => {
    // const cartItem = document.getElementsByClassName('nav-cart-item');
    // let cartItem;
    let img = document.createElement('img');
    img.setAttribute('src', imgUrl);
    let div = createElement('div', 'cart-count', 'cart-count');
    
    // cartItem.append(img, div);
    return img, div;
}

// header


const header = createElement('header', 'header', 'header');
const headerContainer = createElement('div', 'header-container', 'header-container');

const nav = createElement('nav', 'nav', 'nav');
const ul = createElement('ul', 'nav-items', 'nav-items')

nav.appendChild(ul).append(addNavItem('nav-item', 'nav-item', '#', 'Home'));
nav.appendChild(ul).append(addNavItem('nav-item', 'nav-item', '#book-catalog', 'Book catalog'));
nav.appendChild(ul).append(addNavItem('nav-item', 'nav-item', '#order-page-url', 'Order'));
nav.appendChild(ul).append(addNavItem('nav-item', 'nav-item', '#footer', 'Contacts'));
nav.appendChild(ul).append(addNavItem('nav-cart-item', 'nav-cart-item', '#order-page-url', ''));
const cartItem = document.getElementsByClassName('nav-cart-item');
const test = navCartItem('../../assets/icons/bookShopLogo.png');
console.log(navCartItem('../../assets/icons/bookShopLogo.png'));

// cartItem.append(test);




// add nav cart item


header.appendChild(headerContainer).append(addLogoDiv('../../assets/icons/bookShopLogo.png'),nav);


// main
const main = createElement('main', 'main', 'main');

// footer
const footer = createElement('footer', 'footer', 'footer');



// document fragment
docFragment.append(header, main, footer);
console.log();

// console.log(docFragment)
body.append(docFragment);
// const cartItem = document.getElementById('nav-cart-item');
// navCartItem('../../assets/icons/bookShopLogo.png');