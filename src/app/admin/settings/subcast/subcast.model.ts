
export class SubCasteResponse{
  data : SubCaste[]=[];
  status! : number;
  msg! : string;
}
export class SubCaste{
    id : number;
    name: string;
    caste:number;
    status: number;
    constructor(subcaste: SubCaste) {
      {
        this.id = subcaste.id;
        this.name = subcaste.name || '';
        this.caste = subcaste.caste;
        this.status =subcaste.status;
      }
    }
  }
