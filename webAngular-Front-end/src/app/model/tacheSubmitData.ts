export interface TacheSubmitData {
    titre: string;
    description: string;
    nbrJours: number;
    priorite:'haute' | 'moyenne' | 'basse';
    employe: { id: number };
  }