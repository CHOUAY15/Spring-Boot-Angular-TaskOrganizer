export class Department {
    id?: number;
    name: string;
    localisation: string;
    contact: string;

    constructor(
        id: number | undefined,
        name: string,
        localisation: string,
        contact: string
    ) {
        this.id = id;
        this.name = name;
        this.localisation = localisation;
        this.contact = contact;
    }
}
