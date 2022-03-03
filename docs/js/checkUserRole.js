
const token = sessionStorage.getItem('accessToken');
var singUp = document.getElementById('singUp');
var logIn = document.getElementById('logIn');
var logOut = document.getElementById('logOut');
var type = "none"

logOut.addEventListener("click", () =>{
    sessionStorage.removeItem("accessToken");
    window.location.href = './index.html';
})

getUser();

function hideOrShowItems(){
    if(type == "none"){
        singUp.classList.remove('d-none');
        singUp.classList.add('d-flex');

        logIn.classList.remove('d-none');
        logIn.classList.add('d-flex');

        logOut.classList.remove('d-flex');
        logOut.classList.add('d-none');

    }else{
        singUp.classList.remove('d-flex');
        singUp.classList.add('d-none');

        logIn.classList.remove('d-flex');
        logIn.classList.add('d-none');

        logOut.classList.remove('d-none');
        logOut.classList.add('d-flex');
    }
}


async function getUser(){
    if(token == null){
        return;
    }


    try{
        var path = `http://localhost:8080/api/user/type/${token}`;

        console.log(path);
        var res = await axios.get(path,{
            headers: {
                "Authorization" : `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*",
                'Content-Type' : 'application/json'
            }
        }

        );
    }catch(error){
        console.log(error);
        return;
    }

    type = res.data;
    hideOrShowItems();
}



