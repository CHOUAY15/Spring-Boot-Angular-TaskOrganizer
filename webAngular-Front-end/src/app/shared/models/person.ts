import { Team } from "./team";

export enum SexePerson {
  Homme = 'Homme',
  Femme = 'Femme'
}

export abstract class Person {
  id: number;

  name: string;
  lastName: string;

  age: number;

  telephone: string;

  email: string;

  adresse: string;

  avatar: string;

  cin: string;
  team?:Team

  gender: SexePerson;
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
    gender: SexePerson
  ) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.age = age;
    this.telephone = telephone;
    this.email = email;
    this.adresse = adresse;
    this.avatar = avatar;
    this.cin = cin;
    this.gender = gender;
  }
}
