
export class EducationdetailsResponse{
  data : Educationdetails[]=[];
  status! : number;
  msg! : string;
}
export class Educationdetails{
  id : number;
  name: string;
  status: number;
  constructor(education: Educationdetails) {
    {
      this.id = education.id;
      this.name = education.name || '';
      this.status =education.status;
    }
  }
}
