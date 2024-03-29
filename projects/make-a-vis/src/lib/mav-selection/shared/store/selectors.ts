import { createFeatureSelector, createSelector } from '@ngrx/store';

import { GVGroupPanelState, MavSelectionState } from './state';

/**
 * feature selector for self - MavSelectionState
 */
export const selectSelf = createFeatureSelector<MavSelectionState>('mavSelection');

/**
 * Returns the state of the graphic-variable-panel
 * @param state Store state of MavSelection
 * @returns true if graphic-variable-panel is open
 */
export function isGVPanelOpen(state: MavSelectionState): boolean { return !!state?.gvPanelOpen; }
/**
 * selector for isGVPanelOpen
 */
export const isGVPanelOpenSelector = createSelector(selectSelf, isGVPanelOpen);

/**
 * Gets open graphic-variable-groups
 * @param state instance of MavSelectionState
 * @returns opened gvgroups
 */
export function getOpenGVGroupPanels(state: MavSelectionState): GVGroupPanelState[] { return state?.openedGVGroups ?? []; }

/**
 * selector for getOpenGVGroupPanels
 */
export const getOpenGVGroupPanelsSelector = createSelector(selectSelf, getOpenGVGroupPanels);

/**
 * For slicing the value from state that determines if the advance option is enabled or not.
 */
export const getAdvancedEnabled = (state: MavSelectionState): boolean => !!state?.advanced;

/**
 * getAdvancedEnabledSelector for getting the value if the advance option is enabled or not.
 */
export const getAdvancedEnabledSelector = createSelector<MavSelectionState, MavSelectionState, boolean>(
    selectSelf,
    getAdvancedEnabled
);
