export class FalseUser {

    public email: string;
    public displayName: string;
    public delete;
    public emailVerified;
    public getIdTokenResult;
    public getIdToken;
    public isAnonymous;
    public linkAndRetrieveDataWithCredential;
    public linkWithCredential;
    public linkWithPhoneNumber;
    public linkWithPopup;
    public linkWithRedirect;
    public metadata;
    public phoneNumber;
    public providerData;
    public reauthenticateAndRetrieveDataWithCredential;
    public reauthenticateWithCredential;
    public reauthenticateWithPhoneNumber;
    public reauthenticateWithPopup;
    public reauthenticateWithRedirect;
    public refreshToken;
    public reload;
    public sendEmailVerification;
    public toJSON;
    public unlink;
    public updateEmail;
    public updatePassword;
    public updatePhoneNumber;
    public updateProfile;
    public photoURL;
    public providerId;
    public uid;
    

    constructor(email: string, displayName: string) {
        this.email = email;
        this.displayName = displayName;
    }

    public getEmail() {
        return this.email;
    }

    public setEmail(value) {
        this.email = value;
    }

    public getDisplayName() {
        return this.displayName;
    }

    public setDisplayName(value) {
        this.displayName = value;
    }

    // public getDelete() {
    //     return null;
    // }

}