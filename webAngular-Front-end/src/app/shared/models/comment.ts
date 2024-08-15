import { Member } from "./member";
import { Response } from "./response";

export class Comment {
    creationDate: Date;
    texte: string;
    important?: boolean;
    member?: Member;
    responses: Response[];

    constructor(
        creationDate: Date,
        texte: string,
        important: boolean | undefined,
        member: Member | undefined,
        responses: Response[]
    ) {
        this.creationDate = creationDate;
        this.texte = texte;
        this.important = important;
        this.member = member;
        this.responses = responses;
    }
}