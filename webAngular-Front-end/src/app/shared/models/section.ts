export class Section {
    id?: number;
    name: string;

    constructor(
        id: number | undefined,
        name: string,
    ) {
        this.id = id;
        this.name = name;
    }
}
