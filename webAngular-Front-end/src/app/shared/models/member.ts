import { Person, SexePerson } from './person';
import { Report } from './report';
import { Team } from './team';

export class Member extends Person {
  position: string;
  departmentId: number;

  report: Report;
  isOpen?:boolean;

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

    report: Report,
    position?: string
  ) {
    super(id, name, lastName, age, telephone, email, adresse, avatar, cin, gender);

    this.position = position;
   
    this.report = report;
  }
}
