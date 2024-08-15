import { Person, SexePerson } from "./person";

export class Manager extends Person {
    teamId: number;
    departmentId: number;

    constructor(
        id: number,
        name: string,
        lastName: string,
        age: number,
        telephone: string,
        email: string,
        adresse: string,
        avatar: string,
        cin: string,
        gender: SexePerson,
        teamId: number,
        departmentId: number
    ) {
     
        super(id, name, lastName, age, telephone, email, adresse, avatar, cin, gender);


        this.teamId = teamId;
        this.departmentId = departmentId;
    }
}
