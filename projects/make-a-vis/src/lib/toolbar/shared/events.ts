export interface SaveProjectEvent {
  type: 'save';
}

export interface LoadProjectEvent {
  type: 'load';
  path: string;
}

export interface NewProjectEvent {
  type: 'new';
  fileFormat: 'nsf' | 'isi';
}

export interface ExportProjectEvent {
  type: 'export';
  imageFormat: 'png' | 'svg' | 'pdf';
  fileName: string;
}

export interface ShareProjectEvent {
  type: 'share';
  link: string; // received link
}

export interface ToggleLoggingEvent {
  type: 'toggle-logging';
  enabled: boolean;
}

export type Sidenav =
  SaveProjectEvent | LoadProjectEvent | NewProjectEvent |
  ExportProjectEvent | ShareProjectEvent | ToggleLoggingEvent;
