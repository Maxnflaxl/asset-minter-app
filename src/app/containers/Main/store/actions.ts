import { createAsyncAction, createAction } from 'typesafe-actions';
import { Asset, FaucetAppParams, FaucetFund } from '@core/types';

export const setAssetsList = createAction('@@MAIN/SET_ASSETS_LIST')<Asset[]>();
export const setOwnedAssetsList = createAction('@@MAIN/SET_OWNED_ASSETS_LIST')<Asset[]>();


export const setPk = createAction('@@MAIN/SET_PK')<string>();


export const setAppParams = createAction('@@MAIN/SET_PARAMS')<FaucetAppParams>();
export const setFaucetFunds = createAction('@@MAIN/SET_USER_VIEW')<FaucetFund[]>();
export const setDonatedBeam = createAction('@@MAIN/SET_DONATED_BEAM')<number>();
export const setDonatedBeamx = createAction('@@MAIN/SET_DONATED_BEAMX')<number>();
export const setIsInProgress = createAction('@@MAIN/SET_IS_IN_PROGRESS')<boolean>();
export const setFeeValues = createAction('@@MAIN/SET_FEE_VALUES')<any>();

export const setPopupState = createAction('@@MAIN/SET_POPUP_STATE')<{type: string, state: boolean, aid?: string, ratio?: string, n?: string}>();

export const loadAppParams = createAsyncAction(
    '@@MAIN/LOAD_PARAMS',
    '@@MAIN/LOAD_PARAMS_SUCCESS',
    '@@MAIN/LOAD_PARAMS_FAILURE',
)<ArrayBuffer, FaucetAppParams, any>();

export const loadRate = createAsyncAction(
    '@@MAIN/GET_RATE',
    '@@MAIN/GET_RATE_SUCCESS',
    '@@MAIN/GET_RATE_FAILURE',
  )<void, number, any>();


