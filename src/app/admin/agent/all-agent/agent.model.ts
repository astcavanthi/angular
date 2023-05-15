import { formatDate } from '@angular/common';
export class Agent {
  id: number;
  img: string;
  name: string;
  surname: string;
  gender: string;
  email: string;
  mobile: string;
  constructor(agent: Agent) {
    {
      this.id = agent.id || this.getRandomID();
      this.img = agent.img || 'assets/images/user/user1.jpg';
      this.name = agent.name || '';
      this.surname = agent.surname || '';
      this.gender = agent.gender || '';
      this.email = agent.email || '';
      this.mobile = agent.mobile || '';

    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
