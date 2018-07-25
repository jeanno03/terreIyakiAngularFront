export class MyUserModel{

     private email:any=null;
     private login:string="";
     private lastName:string="";
     private firstName:string="";
    

    constructor(email:string, login:string, lastName:string, firstName:string){
        this.email=email;
        this.login=login;
        this.lastName=lastName;
        this.firstName=firstName;
    }

public getEmail(){
    return this.email;
}

public setEmail(value){
    this.email=value;
}

public getLogin(){
    return this.login;
}

public setLogin(value){
    this.login=value;
}

public getLastName(){
    return this.lastName;
}

public setLastName(value){
    this.lastName=value;
}

public getFirstName(){
    return this.firstName;
}

public setFirstName(value){
    this.firstName=value;
}

}