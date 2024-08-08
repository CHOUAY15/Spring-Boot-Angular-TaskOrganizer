export interface Rapport {
  nom: string;
  path: string;
  date_creation: Date;
}

export class Employee {
  constructor(
    public id: number,
    public nom: string,
    public prenom: string,
    public age: number,
    public telephone: string,
    public email: string,
    public adresse: string,
    public avatar: string,
    public cin: string,
    public position: string,
    public sexe: string,
    public rapport: Rapport
  ) {}
}

export class EmployeWithOpen extends Employee {
  isOpen?: boolean;
}
