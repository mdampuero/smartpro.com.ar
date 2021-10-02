export class Productors {
    public id: string;
    public name: string;
    public observation!: string;
    public password!: string;
    public email!: string;
    public phone!: string;
    constructor(fields?: any) {
        this.id=fields.id;
        this.name=fields.name;
        this.observation=fields.observation;
        this.password=fields.password;
        this.email=fields.email;
        this.phone=fields.phone;
    }
}
