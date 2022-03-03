/* 
// List Products

var listProducts = [];

// Constructor Product
class product{
    constructor(name, img, price, description){
        this.name = name;
        this.img = img;
        this.price = price;
        this.description = description;
    }
}


// Push New Product

// Product #1
listProducts.push({'name':'Forget Regret Hoodie','img':'https://d3eum8lucccgeh.cloudfront.net/designs/115910/364679246.jpg','price':'$89.99','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'});

// Product #2
listProducts.push({'name':'Selfish Machines Hoodie','img':'https://d3eum8lucccgeh.cloudfront.net/designs/121057/PTV_SELFISHMACHINES-HOODIE.jpg','price':'$39.99','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'});

// Product #3
listProducts.push({'name':'A Flair For the Dramatic Vinyl (Flair: Green/White)','img':'https://d3eum8lucccgeh.cloudfront.net/designs/120827/PTV_AFFTD-LP.jpg','price':'$19.99','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'});

// Product #4
listProducts.push({'name':'Selfish Machines CD','img':'https://d3eum8lucccgeh.cloudfront.net/designs/79828/selfishmachines_cd_01.jpg','price':'$9.99','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'});

// Product #5
listProducts.push({'name':'Tape Hoodie','img':'https://d3eum8lucccgeh.cloudfront.net/designs/118848/Tape_PulloverHoodie_White_01a.jpg','price':'$39.99','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'});

// Product #6
listProducts.push({'name':'Something Beautiful Bundle','img':'https://d3eum8lucccgeh.cloudfront.net/designs/122358/PTV_SOMETHINGBEAUTIFUL-BUNDLE.jpg','price':'$49.99','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'});

// Product #7
listProducts.push({'name':'Darling You’ll Be Okay Crewneck','img':'https://d3eum8lucccgeh.cloudfront.net/designs/121055/PTV_DARLING-CREWNECK.jpg','price':'$34.99','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'});

// Product #8
listProducts.push({'name':'Rose Long Sleeve Tee (Black)','img':'https://d3eum8lucccgeh.cloudfront.net/designs/111740/unnamed.jpeg','price':'$24.99','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'});

// Product #9
listProducts.push({'name':'Holiday Wrapping Paper (Blue)','img':'https://d3eum8lucccgeh.cloudfront.net/designs/90028/Holiday_WrappingPaper_Blue_01a.jpg','price':'$4.99','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'});

// Product #10
listProducts.push({'name':'Holiday Wrapping Paper (Black)','img':'https://d3eum8lucccgeh.cloudfront.net/designs/79617/Holiday_WrappingPaper_Black_01a.jpg','price':'$4.99','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'});
 */

async function makeGetRequest() {
    try{
        let res = await axios.get('http://localhost:3001/products/');
        const itemsContainer = document.getElementById("list-items");
        let data = res.data;
        let itemHTML = '';
        for(element of data){
            if(element.item == 'clothe'){
                itemHTML = `
                <div class="col-sm-4 col-md-4 mb-4">
                    <div class="container d-flex justify-content-center item-Container">
                        <div class="card">
                            <div class="imgBx d-flex justify-content-center mt-3">
                                <img src="${element.img}" style="height: 13.5rem; width: auto;">
                            </div>
                            <div class="contentBx">
                                <h2>${element.name}</h2>
                                <div class="size">
                                    <h3>Tallas: </h3>
                                    <span>S</span>
                                    <span>M</span>
                                    <span>L</span>
                                </div>
                                <div class="color">
                                    <h3>Color: </h3>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <button class="productoLink" id="${element.idarticle}" href="#">Comprar</button>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }else if(element.item == 'music'){
                itemHTML = `
                <div class="col-sm-4 col-md-4 mb-4">
                    <div class="container d-flex justify-content-center item-Container">
                        <div class="card">
                            <div class="imgBx d-flex justify-content-center mt-3">
                                <img src="${element.img}" style="height: 13.5rem; width: auto;">
                            </div>
                            <div class="contentBx">
                                <h2>${element.name}<style font-size="20px"></style>
                                </h2>
                                <a class="productoLink" id="${element.idproducto}" href="#">Comprar</a>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }else if(element.item == 'hat'){
                itemHTML = `
                <div class="col-sm-4 col-md-4 mb-4">
                    <div class="container d-flex justify-content-center item-Container">
                        <div class="card">
                            <div class="imgBx d-flex justify-content-center mt-3">
                                <img src="${element.img}" style="height: 13.5rem; width: auto;">
                            </div>
                            <div class="contentBx">
                                <h2>${element.name}<style font-size="20px"></style>
                                </h2>
                                <div class="color">
                                    <h3>Color: </h3>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            <a class="productoLink" id="${element.idproducto}" href="#">Comprar</a>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }
            itemsContainer.innerHTML += itemHTML;
        }
    }catch(error){
        console.log(error.response.statusText);
    }

    addToStore();
}

function addToStore(){
    var productsBtn = document.getElementsByClassName("productoLink");
    console.log(productsBtn.length);

    for(let i of productsBtn){
        i.addEventListener('click', () => {
                createShoppingCart(i.id);
         })
    }
}

makeGetRequest();
<<<<<<< Updated upstream

/* // For Each of List Products
const itemHTML = `<div class="col-sm-4 col-md-3 mb-3">
<section>
    <img class="img-fluid" src="${element.img}" alt="Article"/>
</section>
<a href="#" class="d-flex flex-column justify-content-center text-center text-decoration-none">
    <span class="font-weight-bold">${element.name}</span>
    <hr class="w-25 border border-info rounded-pill" >
    <span>${element.price}</span>
    <span>${element.description}</span>
</a>
</div>`;

function addItem(){
    const itemsContainer = document.getElementById("list-items");
    for(element of listProducts){
        const itemHTML = `<div class="col-sm-4 col-md-3 mb-3">
            <section>
                <img class="img-fluid" src="${element.img}" alt="Article"/>
            </section>
            <a href="#" class="d-flex flex-column justify-content-center text-center text-decoration-none">
                <span class="font-weight-bold">${element.name}</span>
                <hr class="w-25 border border-info rounded-pill" >
                <span>${element.price}</span>
                <span>${element.description}</span>
            </a>
        </div>`;
        itemsContainer.innerHTML += itemHTML;
    }
}

addItem(); */

/* function addItemm(item){
    const itemHTML = '<div class="card" style="width: 18rem;">\n' +
        '    <img src="'+item.img +'" class="card-img-top" alt="image">\n' +
        '    <div class="card-body">\n' +
        '        <h5 class="card-title">'+item.name+'</h5>\n' +
        '        <p class="card-text">'+item.description+'</p>\n' +
        '        <a href="#" class="btn btn-primary">Add</a>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<br/>';
    const itemsContainer = document.getElementById("list-items");
    itemsContainer.innerHTML += itemHTML;
}


addItemm({'name':'juice',
    'img':'https://www.gs1india.org/media/Juice_pack.jpg',
    'description':'Orange and Apple juice fresh and delicious'}); */
=======
>>>>>>> Stashed changes
