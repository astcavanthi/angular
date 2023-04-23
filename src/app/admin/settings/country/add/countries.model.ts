export class Countries {
  id: number;
  dName: string;
  hod: string;
  phone: string;
  email: string;
  sYear: string;
  sCapacity: string;
  constructor(countries: Countries) {
    {
      this.id = countries.id || this.getRandomID();
      this.dName = countries.dName || '';
      this.hod = countries.hod || '';
      this.phone = countries.phone || '';
      this.email = countries.email || '';
      this.sYear = countries.sYear || '';
      this.sCapacity = countries.sCapacity || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
