
export class SourceResponse{
  data : Source[]=[];
  status! : number;
  msg! : string;
}
export class Source{
  id : number;
  name: string;
  status: number;
  constructor(source: Source) {
    {
      this.id = source.id;
      this.name = source.name || '';
      this.status =source.status;
    }
  }
}
