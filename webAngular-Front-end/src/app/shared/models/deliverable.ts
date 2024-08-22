export class Deliverable {
    id:number;
    name: string;
    path: string;

    constructor(
        name: string,
        path: string,
    ) {
        this.name = name;
        this.path = path;
    }
}
