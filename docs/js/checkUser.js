const token = sessionStorage.getItem('accessToken');
var prod = document.getElementById('publishPruct');
var type = "none"

getUser();

function hideOrShowItems(){
    if(type != "Administrador"){
        prod.classList.remove('product');
        prod.classList.add('d-none');
    }else{
        prod.classList.remove('d-none');
        prod.classList.add('product');
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
        });
    }catch(error){
        console.log(error);
        return;
    }
    type = res.data;
    hideOrShowItems();
}



