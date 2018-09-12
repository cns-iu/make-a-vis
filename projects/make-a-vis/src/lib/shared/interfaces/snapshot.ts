import { SourceElement } from 'save-svg-as-png';

export interface Snapshot {
    getSnapShot(element: SourceElement, fileName: string );
}
