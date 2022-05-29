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
function addLogoDiv(imgUrl, imgAlt) {
    let div = createElement('div', 'logo', 'logo');
    let a = document.createElement('a');
    let img = document.createElement('img')
    a.setAttribute('href', './index.html');
    img.setAttribute('src', imgUrl);
    img.setAttribute('alt', imgAlt);
    a.append(img);
    div.append(a);
    return div;
}

function addImg(imgUrl, imgAlt) {
    let img = document.createElement('img')
    img.setAttribute('src', imgUrl);
    img.setAttribute('alt', imgAlt);
    return img;
}

function addTagA(url, target, text) {
    let a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('target', target)
    a.textContent = text;
    return a;
}

function addBtn(className, title, text){
    let btn = document.createElement('button');
    btn.classList.add(className);
    btn.setAttribute('title', title);
    btn.textContent = text
    return btn;
}


function addTag(tagName, className, text){
    let tag = document.createElement(tagName);
    tag.classList.add(className);
    tag.textContent = text;
    return tag;
}


// header
const header = createElement('header', 'header', 'header');
const headerContainer = createElement('div', 'header-container', 'header-container');
const nav = createElement('nav', 'nav', 'nav');
const ul = createElement('ul', 'nav-items', 'nav-items')
nav.appendChild(ul).append(addNavItem('nav-item', 'nav-item', '#', 'Home'));
nav.appendChild(ul).append(addNavItem('nav-item', 'nav-item', '#book-block', 'Catalog'));
nav.appendChild(ul).append(addNavItem('nav-item', 'nav-item', '#order-page-url', 'Order'));
nav.appendChild(ul).append(addNavItem('nav-item', 'nav-item', '#footer', 'Contacts'));
header.appendChild(headerContainer).append(addLogoDiv('../../assets/icons/bookShopLogo2.png', 'book shop logo'),nav);

// main
const main = createElement('main', 'main', 'main');
// main container
const mainContainer = createElement('section', 'main-container', 'main-container');
const mainBlock = createElement('div', 'main-block', 'main-block');

// main block
const mainLeft = createElement('div', 'main-left', 'main-left');
const mainRight = createElement('div', 'main-right', 'main-right');
// left block
const mainHeading = createElement('h1', 'h1', 'h1');
const textContentH1 = 'Amazing book shop'
mainHeading.append(textContentH1)
mainLeft.append(mainHeading);
// right block
mainRight.append(addTagA('#book-block', '_self', 'Check books'));

mainBlock.append(mainLeft, mainRight);

// book container
const bookContainer = createElement('section', 'book-container', 'book-container');
const bookBlock = createElement('div', 'book-block', 'book-block');
const bagBlock = createElement('div', 'bag-block', 'bag-block');
// book block children
const catalogHeading = addTag('h2','catalog-heading', 'Catalog');
const booksCardContainer = createElement('div', 'book-card-container', 'book-card-container');

const bagHeading = addTag('h2','bag-heading', 'Bag');
const bagContainer = createElement('div', 'bag-container', 'bag-container');
const bagTotal = createElement('div', 'bag-total', 'bag-total');
const totalTitle = addTag('strong', 'bag-total-title', 'Total: ');
const totalPrice = addTag('span', 'bag-total-price', '$0');
const confirmOrder = addBtn('btn-confirm', 'Confirm order', 'Confirm');

bagTotal.append(totalTitle, totalPrice);

bookBlock.append(catalogHeading, booksCardContainer);
bagBlock.append(bagHeading, bagContainer, bagTotal, confirmOrder);

main.appendChild(mainContainer).append(mainBlock);
main.appendChild(bookContainer).append(bookBlock, bagBlock);


// footer
const footer = createElement('footer', 'footer', 'footer');

let descr = "";
//catalog constructor function
function bookCardConstructor(author, imgUrl, title, price, description){
    descr = description.replace("../../", "");
    let bookCard = document.createElement('div');
    bookCard.classList.add('card');
    bookCard.draggable = true;

    let img = addImg(imgUrl, title);

    let bookInfo = document.createElement('div');
    bookInfo.classList.add('book-info');

    let bookTitle = addTag('h2', 'book-title', title);
    let bookAuthor = addTag('h3', 'book-author', author);
    let bookPrice = addTag('h4', 'book-price', `${price}`);
    
    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttons-container');

    let addToCartBtn = addBtn('btn-add', 'Add to bag', 'ADD TO BAG');
    let readMoreBtn = addBtn('btn-read', 'Read more', 'Read more')

    let addToCartBtns = document.getElementsByClassName('btn-add');
    for (let i = 0; i < addToCartBtns.length; i++){
        let addToCartBtn = addToCartBtns[i];
        addToCartBtn.addEventListener('click', addBookToBagClicked);
    }
    let readMoreBtns = document.getElementsByClassName('btn-read');
    for (let i = 0; i < readMoreBtns.length; i++){
        let readMoreBtn = readMoreBtns[i];
        readMoreBtn.addEventListener('click', readMoreClicked);
    }

    // readMoreBtn.addEventListener('click', () => popupConstructor(author, title, description, imgLink))

    buttonContainer.append(addToCartBtn);
    buttonContainer.append(readMoreBtn);

    bookInfo.append(bookTitle, bookAuthor, bookPrice);

    bookCard.append(img, bookInfo, buttonContainer);

    return bookCard;
}

function jsonFetcher() {
    // let cardContainer = document.querySelector('.book-card-container');
    fetch('./books.json')
      .then(response => {
          return response.json();
      })
      .then(data => {
        data.forEach(el => {
            booksCardContainer.append(bookCardConstructor(el.author, el.imageLink, el.title,
                                el.price, el.description));
        })
      });
}

jsonFetcher();

function addBookToBagClicked(event) {
    let button = event.target;
    let bookInfo = button.parentElement.previousSibling;
    let bookCard = button.parentElement.parentElement;
    
    let title = bookInfo.getElementsByTagName('h2')[0].innerText;
    let author = bookInfo.getElementsByTagName('h3')[0].innerText;
    let price = bookInfo.getElementsByTagName('h4')[0].innerText;
    let imageSrc = bookCard.getElementsByTagName('img')[0].src;
    addBookToBag(title, author, price, imageSrc);
}
function readMoreClicked(event) {
    let button = event.target;
    let bookInfo = button.parentElement.previousSibling;
    let bookCard = button.parentElement.parentElement;
    
    let title = bookInfo.getElementsByTagName('h2')[0].innerText;
    let author = bookInfo.getElementsByTagName('h3')[0].innerText;
    let description = descr;
    let imageSrc = bookCard.getElementsByTagName('img')[0].src;
    showPopup(title, author, description, imageSrc);
}

function showPopup(title, author, description, imageSrc){
    let cardRow = document.createElement('div');
    cardRow.classList.add('popup-window');
    cardRow.classList.add('active');
    let main = document.getElementById('main');
    
    let popupContents = `
        <div class="popup-background active"></div>
        <div class="popup">
            <img src="${imageSrc}" alt="${title}">
            <div class="book-info">
                <h2>${title}</h2>
                <h3>${author}</h3>
                <p>${description}</p>
            </div>
            <button class="close-popup" title="Close popup">&times;</button>
        </div>`
    cardRow.innerHTML = popupContents;
    main.append(cardRow);


    // let removeBagItemButtons = document.getElementsByClassName('btn-remove');
    // for (let i = 0; i < removeBagItemButtons.length; i++){
    //     let button = removeBagItemButtons[i];
    //     button.addEventListener('click', function(event) {
    //         let buttonClicked = event.target;
    //         buttonClicked.parentElement.parentElement.remove();
    //         updateBagTotal();
    //     })
    // }
    
}

function addBookToBag(title, author, price, imageSrc){
    let cardRow = document.createElement('div');
    cardRow.classList.add('bag-card')
    let bagContainer = document.getElementsByClassName('bag-container')[0];
    let bookNames = bagContainer.getElementsByTagName('h2');
    for(let i = 0; i < bookNames.length; i++){
        if(bookNames[i].innerText == title){
            alert(`${title} is already added to bag`);
            return
        }
    }
    let bookCardContents = `
            <img src="${imageSrc}" alt="${title}">
            <div class="book-info">
                <h2>${title}</h2>
                <h3>${author}</h3>
                <h4>$${price}</h4>
                <button class="btn-remove" title="Remove Book">Remove</button>
            </div>`
    cardRow.innerHTML = bookCardContents
    bagContainer.append(cardRow)

    updateBagTotal();

    let removeBagItemButtons = document.getElementsByClassName('btn-remove');
    // console.log(removeBagItemButtons);
        // console.log(removeBagItemButtons)
    for (let i = 0; i < removeBagItemButtons.length; i++){
        let button = removeBagItemButtons[i];
        button.addEventListener('click', function(event) {
            let buttonClicked = event.target;
            buttonClicked.parentElement.parentElement.remove();
            updateBagTotal();
        })
    }
    
}

function updateBagTotal() {
    let bagItemContainer = document.getElementsByClassName('bag-container')[0];
    let bookCards = bagItemContainer.getElementsByClassName('bag-card');
    let total = 0;
        // console.log(removeBagItemButtons)
    for (let i = 0; i < bookCards.length; i++){

        let bookCard = bookCards[i];
        let priceElement = bookCard.getElementsByTagName('h4')[0];
        let price = parseFloat(priceElement.innerText.replace('$', ''))
        total = total + price;
        console.log(price);
    }
    document.getElementsByClassName('bag-total-price')[0].innerText = total;
}

// document fragment
docFragment.append(header, main, footer);

body.append(docFragment);
