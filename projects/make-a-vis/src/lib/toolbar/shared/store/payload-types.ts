import { Project } from 'dvl-fw';

export interface LoadProjectStartedPayload {
  loadingProject: boolean;
  fileName: string;
  fileExtension: 'isi' | 'nsf' | 'csv' | 'json' | 'yml';
}

export interface LoadProjectCompletedPayload {
  loadingProject: boolean;
  incomingDataFile: string;
  incomingDataFileType: string;
  project: Project;
}

export interface ErrorPayload {
  errorOccurred: boolean;
  errorTitle: string;
  errorMessage: string;
}

export interface SaveProjectCompletedPayload {
  savingProject: boolean;
  project: Project;
}

export interface ExportSnapshotCompletedPayload {
  exportingSnapshot: boolean;
  fileName: string;
  fileExtension: string;
}

export interface LoadShareUrlCompletedPayload {
  loadingShareUrl: boolean;
  project: Project;
}

export interface CreateShareUrlCompletedPayload {
  shareUrl: string;
  creatingShareUrl: boolean;
  project: Project;
}
