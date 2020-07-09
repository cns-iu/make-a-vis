export interface RawData {
  id: string;
  template: string;

  getData(arg0?: any): any | Promise<any>;
  toJSON(): any;
}
