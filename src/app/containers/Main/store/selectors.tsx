import { createSelector } from 'reselect';
import { AppState } from '../../../shared/interface';

const selectMain = (state: AppState) => state.main;

export const selectAssetsList = () => createSelector(selectMain, (state) => state.assetsList);
export const selectAssetFromList = (id: string) => createSelector(selectMain, (state) => {
    return state.assetsList.find((asset) => asset['aid'] == id);
});
export const selectOwnedAssetsList = () => createSelector(selectMain, (state) => state.ownedAssetsList);


export const selectAppParams = () => createSelector(selectMain, (state) => state.appParams);
export const selectRate = () => createSelector(selectMain, (state) => state.rate);
export const selectPopupsState = () => createSelector(selectMain, 
    (state) => state.popupsState);
export const selectDonatedBeam = () => createSelector(selectMain, (state) => state.donatedBeam);
export const selectDonatedBeamX = () => createSelector(selectMain, (state) => state.donatedBeamX);
export const selectIsInProgress = () => createSelector(selectMain, (state) => state.isInProgress);
export const selectFunds = () => createSelector(selectMain, (state) => state.funds);
export const selectFees = () => createSelector(selectMain, (state) => state.relayerFee);
