// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Project } from '@dvl-fw/core';

export interface SidenavState {
  savingProject: boolean;
  outgoingProjectFile: string;

  loadingProject: boolean;
  incomingDataFile: string;
  incomingDataFileType: string; // isi | nsf | dvl-yml

  exportingSnapshot: boolean;
  snapshotFile: string;
  snapshotFileType: string; // svg | png | pdf

  loadingShareUrl: boolean;
  creatingShareUrl: boolean;
  shareUrl: string;
  loadingComplete: boolean;

  loggingEnabled: boolean;

  errorOccurred: boolean;
  errorTitle: string;
  errorMessage: string;

  project: Project;
  activeVisualization: number;
}


export const INITIAL_SIDENAV_STATE: SidenavState = {
  savingProject: false,
  outgoingProjectFile: '',

  loadingProject: false,
  incomingDataFile: '',
  incomingDataFileType: '',

  exportingSnapshot: false,
  snapshotFile: '',
  snapshotFileType: '',

  loadingShareUrl: false,
  creatingShareUrl: false,
  shareUrl: '',
  loadingComplete: false,

  loggingEnabled: true,

  errorOccurred: false,
  errorTitle: '',
  errorMessage: '',

  project: null,
  activeVisualization: -1
};
