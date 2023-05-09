
export class StateResponse{
  data : State[]=[];
  status! : number;
  msg! : string;
}
export class State{
  id : number;
  code:number;
  country_name:string;
  country:string;
  name: string;
  status: number;
  constructor(state: State) {
    {
      this.id = state.id;
      this.code = state.code;
      this.country = state.country;
      this.country_name = state.country_name || '';
      this.name = state.name || '';
      this.status =state.status;
    }
  }
}
