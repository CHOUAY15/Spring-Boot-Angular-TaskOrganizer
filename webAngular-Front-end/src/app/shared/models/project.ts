import { Deliverable } from "./deliverable";

export class Project {
    id?: number;
    name: string;
    startDate: Date;
    endDate: Date;
    description: string;
    progressStatus: boolean;
    deliverables: Deliverable[];
    isOpen?:boolean

    constructor(
        id: number | undefined,
        name: string,
        startDate: Date,
        endDate: Date,
        description: string,
        progressStatus: boolean,
        deliverables: Deliverable[]
    ) {
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.progressStatus = progressStatus;
        this.deliverables = deliverables;
    }
}