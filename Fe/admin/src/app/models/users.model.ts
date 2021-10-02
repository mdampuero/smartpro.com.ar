export class Users {
    public id: string;
    public name: string;
    public email: string;
    public password: string;
    public passwordRepeat: string;
    public plainPassword: object;
    public role: string;
    public isActive: number;
    constructor(fields?: any) {
        this.id=fields.id;
        this.name=fields.name;
        this.email=fields.email;
        this.password=fields.password;
        this.passwordRepeat=fields.passwordRepeat;
        this.role=fields.role;
        this.plainPassword={};
        this.isActive=1;
    }
}
