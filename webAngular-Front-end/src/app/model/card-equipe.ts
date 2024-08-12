import { Employee } from "./employe";


export  class CardEquipe{


    constructor(public id:number ,public nom:string,public description: string,public nbrEmploye:number,public dateCreation:Date,public nomDepartement:string,public chef:Employee){}



}