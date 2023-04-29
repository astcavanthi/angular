import {Branch} from "../branch/branch.model";

export class CasteResponse{
  data : Caste[]=[];
  status! : number;
  msg! : string;
}
export class Caste{
    id : number;
    name: string;
    status: number;
    constructor(caste: Caste) {
      {
        this.id = caste.id;
        this.name = caste.name || '';
        this.status =caste.status;
      }
    }
  }
