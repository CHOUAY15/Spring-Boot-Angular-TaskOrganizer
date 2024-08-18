import { Member } from "./member";

export enum StatutTache {
    A_Faire = "A_Faire",
    En_Cours = "En_Cours",
    Termine = "Termine",
}

enum Priorite {
    haute = "haute",
    moyenne = "moyenne",
    basse = "basse",
}
export class TaskData {
    id: number;
    title: string;
    description: string;
    startDate: Date;
    dayNbrs: number;
    status: StatutTache;
    priority: Priorite;
    membre: Member;

    constructor(
        id: number | undefined,
        title: string,
        description: string,
        startDate: Date,
        dayNbrs: number,
        status?: StatutTache,
        priority?: Priorite,
        membre?: Member
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.dayNbrs = dayNbrs;
        this.status = status;
        this.priority = priority;
        this.membre = membre;
    }
}