export class Sliders {
    public id: string;
    public title: string;
    public subtitle:string;
    public link:string;
    public description:string;
    public picture: any;
    public picturePreview: any;
    constructor(fields?: any) {
        this.id=fields.id;
        this.title=fields.title;
        this.subtitle=fields.subtitle;
        this.link=fields.link;
        this.description=fields.description;
        this.picture=fields.picture;
        this.picturePreview=fields.picturePreview;
    }
}
