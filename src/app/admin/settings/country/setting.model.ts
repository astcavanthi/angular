export class Setting {
    id: number;
    dName: string;
    hod: string;
    phone: string;
    email: string;
    sYear: string;
    sCapacity: string;
    constructor(setting: Setting) {
      {
        this.id = setting.id || this.getRandomID();
        this.dName = setting.dName || '';
        this.hod = setting.hod || '';
        this.phone = setting.phone || '';
        this.email = setting.email || '';
        this.sYear = setting.sYear || '';
        this.sCapacity = setting.sCapacity || '';
      }
    }
    public getRandomID(): number {
      const S4 = () => {
        return ((1 + Math.random()) * 0x10000) | 0;
      };
      return S4() + S4();
    }
  }
  