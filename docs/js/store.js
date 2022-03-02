async function makeGetRequest() {
    try{
        let res = await axios.get('http://localhost:8080/api/article/');
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
                                <img src="${element.photoarticle}" style="height: 13.5rem; width: auto;">
                            </div>
                            <div class="contentBx">
                                <h2>${element.namearticle}</h2>
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
                                <a href="#">Comprar</a>
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
                                <img src="${element.photoarticle}" style="height: 13.5rem; width: auto;">
                            </div>
                            <div class="contentBx">
                                <h2>${element.namearticle}<style font-size="20px"></style>
                                </h2>
                            <a href="#">Comprar</a>
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
                                <img src="${element.photoarticle}" style="height: 13.5rem; width: auto;">
                            </div>
                            <div class="contentBx">
                                <h2>${element.namearticle}<style font-size="20px"></style>
                                </h2>
                                <div class="color">
                                    <h3>Color: </h3>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            <a href="#">Comprar</a>
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
}

makeGetRequest();