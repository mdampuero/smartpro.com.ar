export class Demo {
    public id: string;
    public name: string;
    public description!: string;
    constructor(fields?: any) {
        this.id=fields.id;
        this.name=fields.name;
        this.description=fields.description;
    }
}
