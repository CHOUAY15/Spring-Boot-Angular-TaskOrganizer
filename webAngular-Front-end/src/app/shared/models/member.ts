import { Person, SexePerson } from './person';
import { Team } from './team';

export class Member extends Person {
  position: string;
  departmentId: number;
  team: Team;
  report: Report;

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

    team: Team,
    report: Report,
    position?: string
  ) {
    super(id, name, lastName, age, telephone, email, adresse, avatar, cin, gender);

    this.position = position;
    this.team = team;
    this.report = report;
  }
}
