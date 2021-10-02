export class Sinisters {
    public id: string;
    public number: string;
    public productor: string;
    public amount: string;
    public amountRepeat: string;
    public date: string;
    public company: string;
    public observations!: string;
    public name!: string;
    public document!: string;
    public email!: string;
    public phone!: string;
    public provence!: string;
    public city!: string;
    public street!: string;
    public streetNumber!: string;
    public department!: string;
    public floor!: string;
    constructor(fields?: any) {
        this.id=fields.id;
        this.number=fields.number;
        this.productor=fields.productor;
        this.amount=fields.amount;
        this.amountRepeat=fields.amountRepeat;
        this.date=fields.date;
        this.company=fields.company;
        this.observations=fields.observations;
        this.name=fields.name;
        this.document=fields.document;
        this.email=fields.email;
        this.phone=fields.phone;
        this.provence=fields.provence;
        this.city=fields.city;
        this.street=fields.street;
        this.streetNumber=fields.streetNumber;
        this.department=fields.department;
        this.floor=fields.floor;
    }
}
