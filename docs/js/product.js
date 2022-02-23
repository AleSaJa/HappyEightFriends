// *Variabls for image. Drag n Drop
const formImg = document.querySelector('#formInput_img');
const formTextImg = formImg.querySelector('#form-text');
const button = formImg.querySelector('button');
const formImgPreview = document.querySelector('#preview');
const input = formImg.querySelector('#file');
var fileURL='';
//password: somos_Somos2

const CLOUDINARY_URL= "https://api.cloudinary.com/v1_1/duymgcfax/image/upload"
const CLOUDINARY_URL_PRESET = "zddvkupe";

// *Variabls for validation
const expresiones = {
    product: /^[a-zA-Z\ \(\)\:\/]{5,100}$/,  //Letras, espacio, parentesis, dos puntos y diagonal inversa.
    price: /^\d{2,5}\.\d{2}$/, // Numeros, punto y dos digitos para centavos.
    description: /^[a-zA-Z0-9\.\ \)\(\:\/]{5,130}$/ //Letras, espacio, parentesis, dos puntos, diagonal inversa, punto y numeros.
}
const formulario = document.getElementById('formProduct');
const inputs = document.querySelectorAll('#formProduct input');

const publication = {
    product: "",
    price: "",
    description: "",
    image: ""
}

const campos = {
    product: false,
    price: false,
    description: false,
    image: false
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
    const progressBar = document.querySelector('.progress-bar');
    // *Type of image
    const validExtensions = ['image/jpeg','image/jpg','image/png'];
    if(validExtensions.includes(docType)){
        formImg.classList.remove('form-img');
        formImg.classList.remove('d-flex');
        formImg.classList.add('d-none');
        progressBar.classList.remove('d-none');
        const formData = new FormData();
        formData.append('file',file);
        formData.append('upload_preset',CLOUDINARY_URL_PRESET);
        // *Post to Cloudinary
        const res = await axios.post(CLOUDINARY_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },onUploadProgress(e){
                console.log((e.loaded*100)/e.total);
                let progress = (e.loaded*100)/e.total;
                progressBar.textContent=`${progress}%`;
                progressBar.style.width = `${progress}%`;
            }
        });
        progressBar.classList.add('d-none');
        formImgPreview.innerHTML += `
        <img class="w-100" src="${res.data.secure_url}" alt="" srcset="">
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


// *-------Validation Input Name, Price n Description---------

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
        await makePostRequest(publication.product,publication.image,publication.price,publication.description);
        formulario.reset();
		document.getElementById('mailError').classList.remove('form-group__error-active');
		document.getElementById('mailSuccessful').classList.add('form-group__send-active');
		setTimeout(() => {
            document.getElementById('mailSuccessful').classList.remove('form-group__send-active');
		}, 5000);
        setTimeout(
            location.href = "../html/tienda.html"
        ,10000);
	} else {
		document.getElementById('mailError').classList.add('form-group__error-active');
	}
});





// *Make a POST Request to LocalHost Products

async function makePostRequest(name,img,price,description) {
    let array = await axios.get('http://localhost:3001/products/');
    let res =  await axios.post('http://localhost:3001/products',{
        id: array.length-1,
        name: name,
        item: 'clothe',
        img: img
        // price: "$"+price,
        // description: description
    });
    console.log(res);
}

