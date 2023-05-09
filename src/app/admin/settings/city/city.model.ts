
export class CityResponse{
  data : City[]=[];
  status! : number;
  msg! : string;
}
export class City{
  id : number;
  code:number;
  name: string;
  country:number;
  state:number;
  district:number;
  country_name:string;
  state_name:string;
  district_name:string;
  status: number;
  constructor(city: City) {
    {
      this.id = city.id;
      this.code = city.code;
      this.name = city.name || '';
      this.country = city.country;
      this.state = city.state;
      this.district= city.district;
      this.country_name = city.country_name || '';
      this.state_name = city.state_name || '';
      this.district_name = city.district_name || '';
      this.status =city.status;
    }
  }
}