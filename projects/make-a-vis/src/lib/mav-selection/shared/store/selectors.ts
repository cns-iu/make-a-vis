import { createSelector, createFeatureSelector } from '@ngrx/store';
import { GVGroupPanelState, MavSelectionState } from './state';

export const selectSelf = createFeatureSelector<MavSelectionState>('mavSelection');

export function isGVPanelOpen(state: MavSelectionState): boolean { return state.gvPanelOpen; }
export const isGVPanelOpenSelector = createSelector(selectSelf, isGVPanelOpen);

export function getOpenGVGroupPanels(state: MavSelectionState): GVGroupPanelState[] { return state.openedGVGroups; }
export const getOpenGVGroupPanelsSelector = createSelector(selectSelf, getOpenGVGroupPanels);
