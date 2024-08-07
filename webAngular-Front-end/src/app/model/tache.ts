import { EmployeTache } from "./employeTache";


export  class Tache{


    constructor(public id:number ,public titre:string,public description: string,public nbrJours:number,public employe:EmployeTache
        ,public statut:'A_Faire' | 'En_Cours' | 'Termine',public dateDebut:Date
    ){}



}