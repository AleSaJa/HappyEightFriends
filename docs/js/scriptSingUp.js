const formulario = document.getElementById('formContacto');
const inputs = document.querySelectorAll('#formContacto input');
var post = false;



const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	nombre: false,
	password1: false,
	correo: false,
	telefono: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "name":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "password1":
			validarCampo(expresiones.password, e.target, 'password1');
			validarPassword2();
		break;
		case "password2":
			validarPassword2();
		break;
		case "email":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "number":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`formInput_${campo}`).classList.remove('form-group-error');
		document.querySelector(`#input__${campo}`).classList.remove('form__input-error-active');
		campos[campo] = true;
	} else {
		document.getElementById(`formInput_${campo}`).classList.add('form-group-error');
		document.querySelector(`#input__${campo}`).classList.add('form__input-error-active');
		campos[campo] = false;
	}
}

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password1');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
        document.getElementById('formInput_password2').classList.add('form-group-error');
		document.querySelector('#input__password2').classList.add('form__input-error-active');
		campos['password1'] = false;
	} else {
        document.getElementById('formInput_password2').classList.remove('form-group-error');
		document.querySelector('#input__password2').classList.remove('form__input-error-active');
		campos['password1'] = true;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', async (e) => {
	e.preventDefault();
	const terminos = document.getElementById('check');
	if(campos.nombre && campos.password1 && campos.correo && campos.telefono && terminos.checked ){
		await makePostRequest(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value);
		formulario.reset();
	} else {
		Swal.fire({
			title: 'Upps...',
			text: 'Por favor rellena todos los campos correctamente',
			position: 'top',
			icon: 'error',
			iconColor: '#f24150',
			showConfirmButton: false,
			color: '#5e34be',
			background: '#121212',
			timer: 1500,
		})
	}
	if(post){
		window.location.href = "../index.html";
	}
});


// *Make a POST Request to LocalHost Products

async function makePostRequest(name,phone,email,password) {

    let array = await axios.get('http://localhost:3000/users/');
	let data = array.data;

	//Encriptar contraseña en MD5
	password = CryptoJS.MD5(password).toString();

	for(element of data){
		if(element.name == name || element.email == email || element.phone == phone){
			post = false;
			Swal.fire({
				title: 'Usuario ya Registrado',
				position: 'top',
				icon: 'warning',
				iconColor: '#f2cb05',
				showConfirmButton: false,
				color: '#5e34be',
				background: '#121212',
				timer: 1500,
			})
			return;
		}
	}post = true;
	if(post){
		Swal.fire({
			title: 'Registro Exitoso',
			position: 'top',
			icon: 'success',
			showConfirmButton: false,
			color: '#5e34be',
			background: '#121212',
			timer: 1500,
		})
		let res =  await axios.post('http://localhost:3000/users',{
			id: array.length-1,
			name: name,
			phone: phone,
			email: email,
			password: password
		});
		console.log(res);
	} 
}