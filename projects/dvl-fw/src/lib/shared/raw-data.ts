export interface RawData {
  id: string;
  template: string;

  getData(): any | Promise<any>;
  toJSON(): any;
}
