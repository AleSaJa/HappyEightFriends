
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
listProducts.push(new product('Forget Regret Hoodie','https://d3eum8lucccgeh.cloudfront.net/designs/115910/364679246.jpg','$89.99','Lorem Ipsum is simply dummy text of the printing and typesetting industry.'));

// Product #2
listProducts.push(new product('Selfish Machines Hoodie','https://d3eum8lucccgeh.cloudfront.net/designs/121057/PTV_SELFISHMACHINES-HOODIE.jpg','$39.99','Lorem Ipsum is simply dummy text of the printing and typesetting industry.'));

// Product #3
listProducts.push(new product('A Flair For the Dramatic Vinyl (Flair: Green/White)','https://d3eum8lucccgeh.cloudfront.net/designs/120827/PTV_AFFTD-LP.jpg','$19.99','Lorem Ipsum is simply dummy text of the printing and typesetting industry.'));

// Product #4
listProducts.push(new product('Selfish Machines CD','https://d3eum8lucccgeh.cloudfront.net/designs/79828/selfishmachines_cd_01.jpg','$9.99','Lorem Ipsum is simply dummy text of the printing and typesetting industry.'));

// Product #5
listProducts.push(new product('Tape Hoodie','https://d3eum8lucccgeh.cloudfront.net/designs/118848/Tape_PulloverHoodie_White_01a.jpg','$39.99','Lorem Ipsum is simply dummy text of the printing and typesetting industry.'));

// Product #6
listProducts.push(new product('Something Beautiful Bundle','https://d3eum8lucccgeh.cloudfront.net/designs/122358/PTV_SOMETHINGBEAUTIFUL-BUNDLE.jpg','$49.99','Lorem Ipsum is simply dummy text of the printing and typesetting industry.'));

// Product #7
listProducts.push(new product('Darling You’ll Be Okay Crewneck','https://d3eum8lucccgeh.cloudfront.net/designs/121055/PTV_DARLING-CREWNECK.jpg','$34.99','Lorem Ipsum is simply dummy text of the printing and typesetting industry.'));

// Product #8
listProducts.push(new product('Rose Long Sleeve Tee (Black)','https://d3eum8lucccgeh.cloudfront.net/designs/111740/unnamed.jpeg','$24.99','Lorem Ipsum is simply dummy text of the printing and typesetting industry.'));

// Product #9
listProducts.push(new product('Holiday Wrapping Paper (Blue)','https://d3eum8lucccgeh.cloudfront.net/designs/90028/Holiday_WrappingPaper_Blue_01a.jpg','$4.99','Lorem Ipsum is simply dummy text of the printing and typesetting industry.'));

// Product #10
listProducts.push(new product('Holiday Wrapping Paper (Black)','https://d3eum8lucccgeh.cloudfront.net/designs/79617/Holiday_WrappingPaper_Black_01a.jpg','$4.99','Lorem Ipsum is simply dummy text of the printing and typesetting industry.'));

// For Each of List Products
function addItem(){
    const itemsContainer = document.getElementById("list-items");
    for(element of listProducts){
        const itemHTML = `
        <div class="col-sm-4 col-md-3 mb-3">
            <section>
                <img class="img-fluid img-product" src="${element.img}" alt="Article"/>
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

addItem();