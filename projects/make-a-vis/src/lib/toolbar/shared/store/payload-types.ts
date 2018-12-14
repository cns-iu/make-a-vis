// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { GraphicSymbol, GraphicVariable, Project, RecordSet, Visualization } from '@dvl-fw/core';

export interface LoadProjectStartedPayload {
  loadingProject: boolean;
  fileName: string;
  fileExtension: 'isi' | 'nsf' | 'csv' | 'json' | 'yml';
}

export interface LoadProjectCompletedPayload {
  loadingProject: boolean;
  fileName: string;
  fileExtension: string;
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
  shareUrl: string;
  loadingComplete: boolean;
}

export interface CreateShareUrlCompletedPayload {
  shareUrl: string;
  creatingShareUrl: boolean;
  project: Project;
}

export interface SetRecordStreamPayload {
  visualization: Visualization;
  slot: string;
  symbol?: GraphicSymbol;
}

export interface SetGraphicVariablePayload {
  visualization: Visualization;
  slot: string;
  id: string;
  variable: GraphicVariable;
}

export interface SetGraphicSymbolRecordSetPayload {
  graphicSymbol: GraphicSymbol;
  recordSet: RecordSet;
}

export interface CopyToClipboardSuccessPayload {
  content: String;
}

export interface CopyToClipboardErrorPayload {
  errorOccurred: boolean;
  content: string;
  errorTitle: string;
  errorMessage: string;
}
