export interface TacheSubmitData {
    titre: string;
    description: string;
    nbrJours: number;
    employe: { id: number };
  }