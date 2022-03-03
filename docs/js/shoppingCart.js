
var userId;


async function createShoppingCart(id){

    try{
        var path = `http://localhost:8080/api/user/type/${token}`;
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

    if(res.data == "none"){
        window.location.href = '../index.html';
        return;
    }

    try{
        await getUserId();
    }catch(error){
        console.log(error)
    }

    console.log(userId);
    await getCartOfUser(userId);

}


async function getUserId(){
    if(token == null){
        return;
    }
    try{
        var path = `http://localhost:8080/api/user/id/${token}`;
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

    userId = res.data;

}

async function getCartOfUser(id){
    try{
        var path = `http://localhost:8080/api/cart/${id}`;
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

    console.log(res.data);
}