const formulario = document.getElementById('formContacto');
const inputs = document.querySelectorAll('#formContacto input');
var post = false;

const campos = {
	nombre: false,
	password1: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "name":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "password1":
			validarCampo(expresiones.password, e.target, 'password1');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		campos[campo] = true;
	} else {
        campos[campo] = false;
	}
}


inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', async (e) => {
	e.preventDefault();
	const terminos = document.getElementById('check');
	if(campos.nombre && campos.password1){
		await makePostRequest(inputs[0].value, inputs[1].value);
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

async function makePostRequest(name, password) {

    let array = await axios.get('http://localhost:3000/users/');
	let data = array.data;

	//Encriptar contraseña en MD5
	password = CryptoJS.MD5(password).toString();

    console.log(password);

	for(element of data){
		if(element.name == name && element.password == password){
			post = false;
            Swal.fire({
                title: 'Registro Exitoso',
                position: 'top',
                icon: 'success',
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
            title: 'Usuario ya Registrado',
            position: 'top',
            icon: 'warning',
            iconColor: '#f2cb05',
            showConfirmButton: false,
            color: '#5e34be',
            background: '#121212',
            timer: 1500,
        })
	
		console.log(res);
	} 
}