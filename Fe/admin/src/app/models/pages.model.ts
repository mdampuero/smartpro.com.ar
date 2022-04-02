export class Pages {
    public id: string;
    public name: string;
    public content: string;
    constructor(fields?: any) {
        this.id=fields.id;
        this.name=fields.name;
        this.content=fields.content;
    }
}
