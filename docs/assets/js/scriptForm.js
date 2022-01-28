const btn = document.getElementById('submitBtn');
const form = document.getElementById('formContacto');
btn.addEventListener('click', sendEmail);



function sendEmail(event){
    try{
        event.preventDefault();
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