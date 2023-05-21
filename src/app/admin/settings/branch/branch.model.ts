
export class BranchResponse{
  data : Branch[]=[];
  status! : number;
  msg! : string;
}
export class Branch{
    id : number;
    name: string;
    address: string;
    status: number;
    user! : User;
    constructor(branch: Branch) {
      {
        this.id = branch.id;
        this.name = branch.name || '';
        this.address=branch.address ||'';
        this.status =branch.status;
      }
    }
  }


  export class User{
    id : number;
    password: string;
    username:string;
    email: string;
    phone:string;
    first_name: string;
    last_name:string;
    address: string;
    state:number;
    district: number;
    city:number;
    state_name:string;
    district_name:string;
    city_name:string;
    pincode:string;
    is_branch:number;
    constructor(user: User) {
      {
        this.id = user.id;
        this.password = user.password || '';
        this.username = user.username || '';
        this.email = user.email || '';
        this.phone = user.phone || '';
        this.first_name = user.first_name || '';
        this.last_name = user.last_name || '';
        this.address = user.address || '';
        this.state = user.state;
        this.district = user.district;
        this.city = user.city;
        this.pincode = user.pincode || '';
        this.is_branch = user.is_branch;
        this.username = user.username || '';
        this.state_name = user.state_name || '';
        this.district_name = user.district_name || '';
        this.city_name = user.city_name || '';
      }
    }
  }


 