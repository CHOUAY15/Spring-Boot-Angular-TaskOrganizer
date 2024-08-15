import { Manager } from "./manager";

enum Reactions {
    LIKE = "LIKE",
    DISLIKE = "DISLIKE",
    LOVE = "LOVE",
}

export class Response {
    id?: number;
    texte: string;
    creationDate: Date;
    reaction?: Reactions;
    sender?: Manager;

    constructor(
        id: number | undefined,
        texte: string,
        creationDate: Date,
        reaction: Reactions | undefined,
        sender: Manager | undefined
    ) {
        this.id = id;
        this.texte = texte;
        this.creationDate = creationDate;
        this.reaction = reaction;
        this.sender = sender;
    }
}
