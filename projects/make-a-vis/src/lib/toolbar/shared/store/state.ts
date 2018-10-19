import { Project } from 'dvl-fw';

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

  loadingShareUrl: true,
  creatingShareUrl: false,
  shareUrl: '',

  loggingEnabled: true,

  errorOccurred: false,
  errorTitle: '',
  errorMessage: '',

  project: null,
  activeVisualization: -1
};
