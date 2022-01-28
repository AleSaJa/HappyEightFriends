const btn = document.getElementById('submitBtn');
const form = document.getElementById('formContacto');
btn.addEventListener('click', sendEmail);

function sendEmail(){
    try{
        Email.send({
        Host : "smtp.mailtrap.io",
        Username : "98e7c94d8e9b4a",
        Password : "d655abf4dcd397",
        To : 'somos.booking2.contact@gmail.com',
        From : form['email'].value,
        Subject : "Nuevo Mensaje de Contacto",
        Body : `
        <h1>Información de Usuario</h1>
        <ul>
        <li>Nombre de Usuario: ${form['name'].value}</li>
        <li>Email: ${form['email'].value}</li>
        <li>Número de contacto: ${form['number'].value}</li>
        </ul>
        <p>Mensaje: ${form['messages'].value}</p>`
    }).then(message => alert("mail enviado"))
    }catch(error){
        alert(error);
    }
    
}

/* 
//document.getElementById('exampleInputEmail1').addEventListener('input', validar);
function validar() {
    // campo = event.target;
    

    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;


    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    if (emailRegex.test(form['email'].value)) {
        alert("Correo valido");
        crear(form['email'].value);
    } 
    
}



function crear(valueEmail){
    localStorage.setItem("email", valueEmail)
}

function sendEmail(name,email,message){
    email.send({
        Host:"",
        Username:
        Password:
        To:
        From:
        Subject:
        Body:
    }).then((message)=> alert())
}

document.getElementById("crear").addEventListener("click", crear);
        document.getElementById("mostrar").addEventListener("click", mostrar);
        document.getElementById("modificar").addEventListener("click", modificar);
        document.getElementById("eliminar").addEventListener("click", eliminar);

        function crear(){
            localStorage.setItem("nombre", "Guillermo")
            localStorage.setItem("apellido", "Chang")
        
        }

        function mostrar(){
            alert("Nombre: "+ localStorage.getItem("nombre") + ' ' + "Apellido: " + localStorage.getItem("apellido"))
        }

        function modificar(){
            localStorage.setItem("nombre", "David")
            localStorage.setItem("apellido", "Gordillo")
        }

        function eliminar(){
            localStorage.removeItem("nombre")
            localStorage.removeItem("apellido")
        }
*/
/*
function guardar_local(){
    let contacto= {
        
    }
}
*/
