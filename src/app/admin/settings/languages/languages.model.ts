
export class LanguageResponse{
  data : Language[]=[];
  status! : number;
  msg! : string;
}
export class Language{
  id : number;
  name: string;
  status: number;
  constructor(language: Language) {
    {
      this.id = language.id;
      this.name = language.name || '';
      this.status =language.status;
    }
  }
}
