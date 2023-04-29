
export class ReligionResponse{
  data : Religion[]=[];
  status! : number;
  msg! : string;
}
export class Religion{
    id : number;
    name: string;
    status: number;
    constructor(religion: Religion) {
      {
        this.id = religion.id;
        this.name = religion.name || '';
        this.status = religion.status;
      }
    }
  }
