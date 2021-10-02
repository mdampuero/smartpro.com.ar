export class Products {
    public id: string;
    public name: string;
    public sku:string;
    public price:string;
    public brand:string;
    public tags:string;
    public description:string;
    public provider: string;
    public picture: any;
    public picturePreview: any;
    public isSalient: number;
    constructor(fields?: any) {
        this.id=fields.id;
        this.name=fields.name;
        this.sku=fields.sku;
        this.price=fields.price;
        this.brand=fields.brand;
        this.tags=fields.tags;
        this.description=fields.description;
        this.provider=fields.provider;
        this.picture=fields.picture;
        this.picturePreview=fields.picturePreview;
        this.isSalient=fields.isSalient;
    }
}
