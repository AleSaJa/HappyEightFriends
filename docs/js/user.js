const UserType = Object.freeze( {"Administrator":0, "Band":1, "Normal":1});


class User{
    constructor(id, userName, userType, userMail, phoneNumber, password){
        this.id = id;
        this.userName = userName;
        this.userType = userType;
        this.userMail = userMail;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }
}