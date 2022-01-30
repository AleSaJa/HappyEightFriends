const formulario = document.getElementById('formContacto');
const inputs = document.querySelectorAll('#formContacto input');
var array = [];

const expresiones = {
    // usuario: /^[a-zA-Z0-9\_\-]{4,16}$/,  Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    // password: /^.{4,12}$/,  4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{10,14}$/, // 10 a 14 numeros.
}

const campos = {
    nombre: false,
    correo: false,
    telefono: false,
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "name":
			validarCampo(expresiones.nombre, e.target, 'nombre');
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

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	if(campos.nombre && campos.correo && campos.telefono){
		array.push(formulario['name'].value);
		array.push(formulario['email'].value);
		array.push(formulario['number'].value);
		array.push(formulario['messages'].value);
		formulario.reset();
		document.getElementById('mailError').classList.remove('form-group__error-active');
		document.getElementById('mailSuccessful').classList.add('form-group__send-active');
		setTimeout(() => {
			document.getElementById('mailSuccessful').classList.remove('form-group__send-active');
		}, 5000);
		Email.send({
			Host : "smtp.mailtrap.io",
			Username : "98e7c94d8e9b4a",
			Password : "d655abf4dcd397",
			To : 'somos.booking2.contact@gmail.com',
			From : array[1],
			Subject : "Nuevo Mensaje de Contacto",
			Body : `
			<h1>Información de Usuario</h1>
			<ul>
			<li>Nombre de Usuario: ${array[0]}</li>
			<li>Email: ${array[1]}</li>
			<li>Número de contacto: ${array[2]}</li>
			</ul>
			<p>Mensaje: ${array[3]}</p>`
		})
	} else {
		document.getElementById('mailError').classList.add('form-group__error-active');
	}
});



// --------------Super PlaceHolder ------------------

	/* const btn = document.getElementById('submitBtn');
	// const form = document.getElementById('formContacto');
	 btn.addEventListener('click', sendEmail);
	
	
	
	 function sendEmail(){
		// event.preventDefault();
		Email.send({
			Host : "smtp.mailtrap.io",
			Username : "98e7c94d8e9b4a",
			Password : "d655abf4dcd397",
			To : 'somos.booking2.contact@gmail.com',
			From : formulario['email'].value,
			Subject : "Nuevo Mensaje de Contacto",
			Body : `
			<h1>Información de Usuario</h1>
			<ul>
			<li>Nombre de Usuario: ${formulario['name'].value}</li>
			<li>Email: ${formulario['email'].value}</li>
			<li>Número de contacto: ${formulario['number'].value}</li>
			</ul>
			<p>Mensaje: ${formulario['messages'].value}</p>`
		}).then(
			message => alert(message)
		);    
	}
	 */