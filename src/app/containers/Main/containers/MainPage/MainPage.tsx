import React, { useEffect, useState } from 'react';
import { styled } from '@linaria/react';
import { css } from '@linaria/core';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Window, Button, Table, Rate } from '@app/shared/components';
import { selectAppParams,  selectRate } from '../../store/selectors';
import { IconSend, IconReceive } from '@app/shared/icons';
import { CURRENCIES, ROUTES } from '@app/shared/constants';
// import { BridgeTransaction } from '@core/types';
import { Transaction } from '@app/core/types';
import { IconConfirm } from '@app/shared/icons';
import { Receive } from '@core/api';
import { selectAssetsList } from '../../store/selectors';
import { Asset } from '@app/core/types';

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
  border-radius: 10px;
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
  const assetsList = useSelector(selectAssetsList())

  const TABLE_CONFIG = [
    {
      name: 'aid',
      title: 'Asset id',
      fn: (value: string, asset: Asset) => {
        
        return (<>
          <span>{asset.aid}</span>
        </>);
      }
    },
    {
      name: 'minted',
      title: 'Minted amount',
      fn: (value: any, asset: Asset, index: number) => {
        return (<>
          {asset.mintedLo}
        </>);
      }
    }
  ];

  const handleCreateClick: React.MouseEventHandler = () => {
    navigate(ROUTES.MAIN.CREATE_PAGE);
  };

  return (
    <>
      <Window>
        <Container>
          <StyledTable>
            <Table config={TABLE_CONFIG} data={assetsList} keyBy='aid'/>
              { assetsList.length === 0 && 
                <EmptyTableContent>There are no assets yet</EmptyTableContent> }
          </StyledTable>
        </Container>
      </Window>
    </>
  );
};

export default MainPage;
