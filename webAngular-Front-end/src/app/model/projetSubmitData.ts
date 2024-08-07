export interface Deliverable {
    nom: string;
    path: string;
  }
  
  export interface ProjectSubmited {
    nom: string;
    description: string;
    dateFin?: string;
    livrables: Deliverable[];
  }
  export interface ProjectWithOpenState extends ProjectSubmited {
    isOpen?: boolean;
    dateDebut:string;
  }