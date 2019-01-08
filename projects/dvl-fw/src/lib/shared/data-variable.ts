export interface DataVariable {
  id: string;
  label: string;
  dataType: string;
  scaleType: string;
  recordStreamId: string;
  toJSON(): any;
}
