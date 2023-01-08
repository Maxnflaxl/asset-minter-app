import { Asset, FaucetAppParams, FaucetFund } from '@core/types';

export interface MintorStateType {
  assetsList: Asset[];
  ownedAssetsList: Asset[];

  
  pk: string;
  
  appParams: FaucetAppParams;
  popupsState: {
    deposit: boolean;
    withdraw: boolean;
  };
  rate: number;
  relayerFee: any;
  funds: FaucetFund[];
  isDonateInProgress: boolean;
  donatedBeam: number;
  donatedBeamX: number;
}
