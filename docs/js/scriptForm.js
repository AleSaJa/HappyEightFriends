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
	let mensaje = document.getElementById('mensaje').value;
	if(campos.nombre && campos.correo && campos.telefono){
		Swal.fire({
			title: 'Bien',
			text: 'Mensaje Enviado Exitosamente',
			position: 'top',
			icon: 'success',
			showConfirmButton: false,
			color: '#5e34be',
			background: '#121212',
			timer: 1500,
		})
		Email.send({
			Host : "smtp.mailtrap.io",
			Username : "98e7c94d8e9b4a",
			Password : "d655abf4dcd397",
			To : 'somos.booking2.contact@gmail.com',
			From : inputs[1].value,
			Subject : "Nuevo Mensaje de Contacto",
			Body : `
			<h1>Información de Usuario</h1>
			<ul>
			<li>Nombre de Usuario: ${inputs[0].value}</li>
			<li>Email: ${inputs[1].value}</li>
			<li>Número de contacto: ${inputs[2].value}</li>
			</ul>
			<p>Mensaje: ${mensaje}</p>`
		})
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
});