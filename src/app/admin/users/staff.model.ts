
export class StaffResponse{
    staff : Staff[]=[];
    msg! : string;
  }
  export class Staff{
      id : number;
      gender: string;
      maritalStatus:string;
      officeMobile: string;
      pemail:string;
      branch: number;
      religion:number;
      caste: number;
      eduType:string;
      qual: number;
      aadharno:string;
      fname: string;
      fmobile:string;
      faddress: string;
      refname:string;
      refmobile: string;
      refaddress:string;
      dob: string;
      jdate:string;
      source:string;
      pexp:string;
      status:number;
      user : User[]=[];
      constructor(staff: Staff) {
        {
          this.id = staff.id;
          this.gender = staff.gender || '';
          this.maritalStatus = staff.maritalStatus || '';
          this.officeMobile = staff.officeMobile || '';
          this.pemail = staff.pemail || '';
          this.branch = staff.branch;
          this.religion = staff.religion;
          this.caste = staff.caste;
          this.qual = staff.qual;
          this.eduType = staff.eduType || '';
          this.aadharno = staff.aadharno || '';
          this.fname = staff.fname || '';
          this.fmobile = staff.fmobile || '';
          this.faddress = staff.faddress || '';
          this.refname = staff.refname || '';
          this.refmobile = staff.refmobile || '';
          this.refaddress = staff.refaddress || '';
          this.dob = staff.dob || '';
          this.jdate = staff.jdate || '';
          this.source = staff.source || '';
          this.pexp = staff.pexp || '';
          this.status =staff.status;
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
        is_staff:number;
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
            this.is_staff = user.is_staff;
            this.username = user.username || '';
          }
        }
      }