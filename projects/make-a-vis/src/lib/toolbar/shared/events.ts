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
  recordSets: string[];
}

export interface ExportProjectEvent {
  type: 'export';
  imageFormat: 'png' | 'svg' | 'pdf';
  fileName: string;
}

export interface ShareProjectEvent {
  type: 'share';
  // TODO : created or received link?
}

export interface ToggleLoggingEvent {
  type: 'toggle-logging';
  enabled: boolean;
}

export type SidenavEvent =
  SaveProjectEvent | LoadProjectEvent | NewProjectEvent |
  ExportProjectEvent | ShareProjectEvent | ToggleLoggingEvent;
