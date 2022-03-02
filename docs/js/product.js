// *Variabls for image. Drag n Drop
const formImg = document.querySelector('#formInput_img');
const formTextImg = formImg.querySelector('#form-text');
const button = formImg.querySelector('button');
const formImgPreview = document.querySelector('#preview');
const input = formImg.querySelector('#file');
const item = document.getElementById('inputState');
const size = document.getElementById('size');
const color = document.getElementById('color');
var fileURL='';
var a;
//password: somos_Somos2

const CLOUDINARY_URL= "https://api.cloudinary.com/v1_1/duymgcfax/image/upload"
const CLOUDINARY_URL_PRESET = "zddvkupe";

// *Variabls for validation
const expresiones = {
    product: /^[a-zA-Z\ \(\)\:\/]{5,100}$/,  //Letras, espacio, parentesis, dos puntos y diagonal inversa.
    price: /^\d{2,5}\.\d{2}$/, // Numeros, punto y dos digitos para centavos.
    description: /^[a-zA-Z0-9\.\ \)\(\:\/]{5,130}$/, //Letras, espacio, parentesis, dos puntos, diagonal inversa, punto y numeros.
    stock: /^\d{1,2}$/ // Numeros, punto y dos digitos para centavos.
}
const formulario = document.getElementById('formProduct');
const inputs = document.querySelectorAll('#formProduct input');

const publication = {
    product: "",
    description: "",
    image: "",
    price: "",
    stock: 0,
    size: "",
    idColor: 0,
    item: "",

}

const campos = {
    product: false,
    price: false,
    description: false,
    image: false,
    item: false
}

// *Validation Input Image
button.addEventListener('click', (e) => {
    e.preventDefault();
    input.click();
});

input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    formImg.classList.add('form-img-active');
    processFile(file);
    formImg.classList.remove('form-img-active');
});

formImg.addEventListener('dragover', (e) => {
    e.preventDefault();
    formImg.classList.add('form-img-active');
    formTextImg.textContent = 'Suelta para subir el archivo'; 
});

formImg.addEventListener('dragleave', (e) => {
    e.preventDefault();
    formImg.classList.remove('form-img-active');
    formTextImg.textContent = 'Arrastra y suelta la imágen'; 
});

formImg.addEventListener('drop', (e) => {
    e.preventDefault();
    file = e.dataTransfer.files[0];
    processFile(file);
    formImg.classList.remove('form-img-active');
    formTextImg.textContent = 'Arrastra y suelta la imágen'; 
});

async function processFile(file){
    const docType = file.type;
    // *Type of image
    const validExtensions = ['image/jpeg','image/jpg','image/png'];
    if(validExtensions.includes(docType)){
        formImg.classList.remove('form-img');
        formImg.classList.remove('d-flex');
        formImg.classList.add('d-none');
        const formData = new FormData();
        formData.append('file',file);
        formData.append('upload_preset',CLOUDINARY_URL_PRESET);
        // *Post to Cloudinary
        const res = await axios.post(CLOUDINARY_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },onUploadProgress(e){
                document.getElementById('progress').classList.remove('d-none');
                document.getElementById('progress').classList.add('d-flex');
            }
        });
        document.getElementById('progress').classList.remove('d-flex');
        document.getElementById('progress').classList.add('d-none');
        formImgPreview.classList.remove('d-none');
        formImgPreview.classList.add('d-flex');
        formImgPreview.innerHTML += `
        <img class="w-75" src="${res.data.secure_url}" alt="" srcset="">
        `;
        publication.image = `${res.data.secure_url}`;
        campos.image=true;
    }else{
        document.querySelector('#input__file').classList.add('form__input-error-active');
        setTimeout(() => {
            document.querySelector('#input__file').classList.remove('form__input-error-active');
		}, 4000);
    }
}


// *-------Validation Input Name, Price and Description---------

item.addEventListener('change', (e) => {
    size.disabled = true;
    color.disabled = true;
    campos['item']=true;
    if(item.value=='Selecciona') campos['item']=false;
    if(item.value=='Hoodie' || item.value=='Camisa' || item.value=='Jooger'){
        size.disabled = false;
        color.disabled = false;
        publication['item'] = 'clothe';
    }else if(item.value=='Hat'){
        color.disabled = false;
        publication['item'] = 'hat';
    }else{
        publication['item'] = 'music';
    }
});

size.addEventListener('change', (e) => {
    publication['size'] = null;
    if(size.value!='Selecciona'){
        publication['size'] = size.value;
    } 
});

color.addEventListener('change', (e) => {
    publication['idColor'] = 0;
    if(color.value!='Selecciona'){
        switch(color.value){
            case 'Azul': publication['idColor'] = 1;
                break;
            case 'Negro': publication['idColor'] = 2;
                break;
            case 'Blanco': publication['idColor'] = 3;
                break;
        }
    }
});

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "product":
			validarCampo(expresiones.product, e.target, 'product');
		break;
		case "price":
			validarCampo(expresiones.price, e.target, 'price');
		break;
        case "description":
            validarCampo(expresiones.description, e.target, 'description');
        break;
        case "stock":
            validarCampo(expresiones.stock, e.target, 'stock');
        break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`formInput_${campo}`).classList.remove('form-group-error');
		document.querySelector(`#input__${campo}`).classList.remove('form__input-error-active');
		campos[campo] = true;
        publication[campo] = `${input.value}`;
	} else {
        document.getElementById(`formInput_${campo}`).classList.add('form-group-error');
		document.querySelector(`#input__${campo}`).classList.add('form__input-error-active');
        setTimeout(() => {
            document.getElementById(`formInput_${campo}`).classList.remove('form-group-error');
		    document.querySelector(`#input__${campo}`).classList.remove('form__input-error-active');
		}, 3000);
		campos[campo] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});


// *----Publish Product------------
formulario.addEventListener('submit', async (e) => {
	e.preventDefault();
	if(campos.product && campos.price && campos.description && campos.image){
        console.log(publication);
        await makePostRequest(publication.product,publication.description,publication.image,publication.price,publication.stock,publication.size,publication.idColor,publication.item);
		console.log(publication);
        a = await Swal.mixin().fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Producto Publicado Exitosamente',
            iconColor: '#60cfd6',
            showConfirmButton: false,
            color: '#5e34be',
            background: '#131313',
            timer: 1500
        })
        formulario.reset();
        if(a.isDismissed && a.dismiss=='timer'){
            location.href = "../html/tienda.html"
        }
	} else {
        Swal.mixin().fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: ' Upps',
            text: 'Por favor rellena todos los campos correctamente',
            showConfirmButton: false,
            iconColor: '#f24150',
			color: '#5e34be',
			background: '#131313',
            timer: 3000
        })
	}
});





// *Make a POST Request to LocalHost Products

async function makePostRequest(name,desc,img,price, stock,size,color,item) {
    let res =  await axios.post('http://localhost:8080/api/article/',{
        namearticle: name,
        descriptionarticle: desc,
        photoarticle: img,
        price: price,
        stock: stock,
        size: size,
        idColor: color,
        item: item
    });
   
    console.log(res);
    
}

