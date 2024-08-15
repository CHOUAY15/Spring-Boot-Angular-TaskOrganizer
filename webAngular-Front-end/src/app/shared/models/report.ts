export class Report {
    id: number;
    name: string;
    path: string;
    creationDate: Date;

    constructor(
        id: number ,
        name: string,
        path: string,
        creationDate: Date
    ) {
        this.id = id;
        this.name = name;
        this.path = path;
        this.creationDate = creationDate;
    }
}
