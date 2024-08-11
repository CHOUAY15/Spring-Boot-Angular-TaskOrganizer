import { Employee } from "./employe";


export  class Tache{


    constructor(public id:number ,public titre:string,public description: string,public nbrJours:number,public employe:Employee
        ,public statut:'A_Faire' | 'En_Cours' | 'Termine',public dateDebut:Date,public priorite:'haute' | 'moyenne' | 'basse'
    ){}



}