export class Transporters {
    public id: string;
    public name: string;
    public observation!: string;
    public email!: string;
    public phone!: string;
    constructor(fields?: any) {
        this.id=fields.id;
        this.name=fields.name;
        this.observation=fields.observation;
        this.email=fields.email;
        this.phone=fields.phone;
    }
}
