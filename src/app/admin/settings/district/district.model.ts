
export class DistrictResponse{
  data : District[]=[];
  status! : number;
  msg! : string;
}
export class District{
  id : number;
  code:number;
  name: string;
  country:number;
  state:number;
  country_name:string;
  state_name:string;
  status: number;
  constructor(district: District) {
    {
      this.id = district.id;
      this.code = district.code;
      this.name = district.name || '';
      this.country = district.country;
      this.state = district.state;
      this.country_name = district.country_name || '';
      this.state_name = district.state_name || '';
      this.status =district.status;
    }
  }
}