export class Country {
    id : number;
    code: string;
    name: string;
    status: number;
    constructor(country: Country) {
      {
        this.id = country.id || this.getRandomID();
        this.code = country.code || '';
        this.name = country.name || '';
        this.status = country.status || this.getRandomID();
      }
    }
    public getRandomID(): number {
      const S4 = () => {
        return ((1 + Math.random()) * 0x10000) | 0;
      };
      return S4() + S4();
    }
  }
