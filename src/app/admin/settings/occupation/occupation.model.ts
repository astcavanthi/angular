
export class OccupationResponse{
  data : Occupation[]=[];
  status! : number;
  msg! : string;
}
export class Occupation{
    id : number;
    name: string;
    status: number;
    constructor(occupation: Occupation) {
      {
        this.id = occupation.id;
        this.name = occupation.name || '';
        this.status = occupation.status;
      }
    }
  }
