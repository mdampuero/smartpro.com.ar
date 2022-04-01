export class Products {
    public id: string;
    public name: string;
    public sku:string;
    public price:string;
    public cost:string;
    public brand:string;
    public tags:string;
    public description:string;
    public descriptionLarge:string;
    public provider: string;
    public picture: any;
    public picturePreview: any;
    public isSalient: number;
    public inStock: number;
    public categories: any;
    public userLastEdit:any;
    constructor(fields?: any) {
        this.id=fields.id;
        this.name=fields.name;
        this.sku=fields.sku;
        this.price=fields.price;
        this.cost=fields.cost;
        this.brand=fields.brand;
        this.tags=fields.tags;
        this.description=fields.description;
        this.descriptionLarge=fields.descriptionLarge;
        this.provider=fields.provider;
        this.picture=fields.picture;
        this.picturePreview=fields.picturePreview;
        this.isSalient=fields.isSalient;
        this.inStock=fields.inStock;
        this.categories=fields.categories;
        this.userLastEdit=fields.userLastEdit;
    }
}
