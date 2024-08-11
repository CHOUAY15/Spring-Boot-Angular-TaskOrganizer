import { Employee } from "./employe";




export class Commentaire {


    constructor (public id:number,public texte:string,public dateCreation:Date,
        public sender :Employee,public estImportant:boolean,public responses:Reponses[],  public reactions: string
    ){
        
    }


}
export class Reponses extends Commentaire {
   
  
   
}
