const formulario = document.getElementById('formContacto');
const inputs = document.querySelectorAll('#formContacto input');
var post = true;

const campos = {
	nombre: false,
	password: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "name":
			validarCampo(e.target, 'nombre');
		break;
		case "password":
			validarCampo(e.target, 'password');
		break;
	}
}

const validarCampo = (input, campo) => {
	if(input.value != ""){
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
	if(campos.nombre && campos.password){
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
	// if(post){
	// 	window.location.href = "../index.html";
	// }
});


// *Make a POST Request to LocalHost Products

async function makePostRequest(userName, userPassword) {

	var userData = {
		"userName":userName,
		"userPassword":userPassword
	}
	try {
		var res = await axios.post('http://localhost:8080/api/login/',JSON.stringify(userData) , {
			headers:{
				'Content-Type' : 'application/json',
				"Access-Control-Allow-Origin": "*"
			}
		})
	} catch (error) {
		console.log(res);

		Swal.fire({
            title: 'Usuario/Contraseña invalidos',
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

	//var resdata = JSON.parse(res.data);
	console.log(res.data.accessToken);

	sessionStorage.setItem("accesToken", res.data.accessToken);
	
		
			post = true;
            Swal.fire({
                title: 'Usuario',
				text: `${userName}`,
                position: 'top',
                icon: 'success',
                showConfirmButton: false,
                color: '#5e34be',
                background: '#121212',
                timer: 1500,
            })

			setTimeout(function(){
				window.location.href = '../index.html';
			 }, 2000);
}