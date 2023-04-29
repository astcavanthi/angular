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
    constructor(branch: Branch) {
      {
        this.id = branch.id;
        this.name = branch.name || '';
        this.address=branch.address ||'';
        this.status =branch.status;
      }
    }
  }
