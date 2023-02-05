import React, { useEffect, useState } from 'react';
import { styled } from '@linaria/react';
import { css } from '@linaria/core';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Window, Button, Table, Rate, AssetIcon } from '@app/shared/components';
import { selectAppParams,  selectOwnedAssetsList,  selectRate } from '../../store/selectors';
import { IconSend, IconReceive } from '@app/shared/icons';
import { ROUTES, CID } from '@app/shared/constants';
import { selectAssetsList } from '../../store/selectors';
import { Asset } from '@app/core/types';
import { calcMintedAmount, fromGroths } from '@core/appUtils';
import { selectSystemState } from '@app/shared/store/selectors';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
`;

const StyledControls = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: row;
`;

const StyledTable = styled.div`
  margin-top: 30px;
  width: 100%;
  overflow: hidden;
`;

const EmptyTableContent = styled.div`
  text-align: center;
  margin-top: 72px;
  font-size: 14px;
  font-style: italic;
  color: #8da1ad;
`;

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assetsList = useSelector(selectAssetsList());
  const ownedAssetsList = useSelector(selectOwnedAssetsList());
  const systemState = useSelector(selectSystemState());

  const TABLE_CONFIG = [
    {
      name: 'aid',
      title: 'Id',
      fn: (value: string, asset: Asset) => {
        return (<>
          <span>{asset.aid}</span>
        </>);
      }
    }, {
      name: 'coin',
      title: 'Coin',
      fn: (value: string, asset: Asset) => {
        return (<>
          <span>
            <AssetIcon asset_id={asset.aid}/>
            {asset.parsedMetadata['N']}
          </span>
        </>);
      }
    }, {
      name: 'minted',
      title: 'Minted amount',
      fn: (value: any, asset: Asset, index: number) => {
        return (<>
          {fromGroths(parseInt(calcMintedAmount(asset.mintedLo, asset.mintedHi)))}
        </>);
      }
    }, {
      name: 'minted_by',
      title: 'Minted by',
      fn: (value: any, asset: Asset, index: number) => {
        return (<>
          {
            asset.owner_pk !== undefined && <>Wallet</>
          }
          {
            asset.owner_cid !== undefined && asset.owner_cid === CID && <>Asset Minter</>
          }
          {
            asset.owner_cid !== undefined && asset.owner_cid !== CID && <>Contract {asset.owner_cid}</>
          }
        </>);
      }
    }, {
      name: 'emission',
      title: 'First emission',
      fn: (value: any, asset: Asset, index: number) => {
        const heightDiff = systemState.current_height - asset.height;
        const timestampDiff = systemState.current_state_timestamp * 1000 - heightDiff * 60000;
        const dateDiff = new Date(timestampDiff);
        const dateFromString = ('0' + dateDiff.getDate()).slice(-2) + '.' 
          + ('0' + (dateDiff.getMonth()+1)).slice(-2) + '.' + dateDiff.getFullYear();

        return (<span className='date'>
          {dateFromString}
        </span>);
      }
    }
  ];

  const handleCreateClick: React.MouseEventHandler = () => {
    navigate(ROUTES.MAIN.CREATE_PAGE);
  };

  const handleAssetClick: React.MouseEventHandler = (item) => {
    navigate(`${ROUTES.MAIN.ASSET_PAGE.replace(':id', '')}${item['aid']}`);
  };

  return (
    <>
      <Window>
        <Container>
          <Button
            onClick={handleCreateClick}
            pallete="green" 
            variant="regular">create asset</Button>
          <StyledTable>
            <Table config={TABLE_CONFIG} rowOnClick={handleAssetClick}
              data={assetsList} dataToHighlight={ownedAssetsList} keyBy='aid'/>
              { assetsList.length === 0 && 
                <EmptyTableContent>There are no assets yet</EmptyTableContent> }
          </StyledTable>
        </Container>
      </Window>
    </>
  );
};

export default MainPage;
