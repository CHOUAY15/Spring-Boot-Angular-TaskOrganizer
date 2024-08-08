import { Employee } from "./employe";
import { EmployeTache } from "./employeTache";


export  class Tache{


    constructor(public id:number ,public titre:string,public description: string,public nbrJours:number,public employe:Employee
        ,public statut:'A_Faire' | 'En_Cours' | 'Termine',public dateDebut:Date
    ){}



}