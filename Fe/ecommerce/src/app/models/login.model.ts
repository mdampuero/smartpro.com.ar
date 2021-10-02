export class Login {
    public username: string;
    public password: string;
    public name: string;
    constructor(fields?: any) {
        this.username=fields.username;
        this.password=fields.password;
        this.name=fields.name;
    }
}
