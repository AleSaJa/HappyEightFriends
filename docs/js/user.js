const UserType = Object.freeze( {"Administrator":0, "Band":1, "Normal":1});


class User{
    constructor(/*userId,*/ userName, userMail, userPassword, userPhone, userType){
        //this.userId = userId;
        this.userName = userName;
        this.userType = userType;
        this.userMail = userMail;
        this.userPhone = userPhone;
        this.userPassword = userPassword;
    }
}