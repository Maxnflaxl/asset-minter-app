import React, { useState, useRef } from 'react';
import { styled } from '@linaria/react';
import { Button, Window, Table } from '@app/shared/components';
import { css } from '@linaria/core';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectAssetFromList } from '../../store/selectors';


const Container = styled.div`
  background-color: rgba(255, 255, 255, .05);
  border-radius: 10px;
  padding: 20px;

  > .row {
    display: flex;
    flex-direction: row;

    > .title {
      font-size: 14px;
      opacity: 0.5;
      width: 180px;
    }
  }

  > .row:not(:first-child) {
    margin-top: 20px;
  }
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

const CreatePage = () => {
  const params = useParams();
  const asset = useSelector(selectAssetFromList(params.id));

  return (
    <Window>
      <Container>
        <div className='row'>
          <div className='title'>Asset name</div>
          <div className='value'>{asset.parsedMetadata['N']}</div>
        </div>
        <div className='row'>
          <div className='title'>Short name / asset code</div>
          <div className='value'>{asset.parsedMetadata['SN']}</div>
        </div>
        <div className='row'>
          <div className='title'>Asset Unit Name</div>
          <div className='value'>{asset.parsedMetadata['UN']}</div>
        </div>
        <div className='row'>
          <div className='title'>Smallest Unit Name</div>
          <div className='value'>{asset.parsedMetadata['NTHUN']}</div>
        </div>
        <div className='row'>
          <div className='title'>Ratio</div>
          <div className='value'>{asset.parsedMetadata['NTH_RATIO']}</div>
        </div>
        <div className='row'>
          <div className='title'>Short Description</div>
          <div className='value'>{asset.parsedMetadata['OPT_SHORT_DESC']}</div>
        </div>
        <div className='row'>
          <div className='title'>Long Description</div>
          <div className='value'>{asset.parsedMetadata['OPT_LONG_DESC']}</div>
        </div>
      </Container>
    </Window>
  );
};

export default CreatePage;
