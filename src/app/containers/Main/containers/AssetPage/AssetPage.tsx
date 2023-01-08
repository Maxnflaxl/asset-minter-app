import React, { useState, useRef } from 'react';
import { styled } from '@linaria/react';
import { Button, Window, BackControl } from '@app/shared/components';
import { css } from '@linaria/core';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectAssetFromList } from '../../store/selectors';
import { ROUTES } from '@app/shared/constants';


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
    
    > .value {
      max-width: 500px;
      word-wrap: break-word;

      > .ref {
        text-decoration: none;
        color: #fff;
      }

      > .img {
        max-width: 300px;
        max-height: 200px;
      }
    }
  }

  > .title-row {
    display: flex;
    flex-direction: row;
    align-items: center;

    > .icon {
      width: 24px;
      height: 24px;
    }

    > .sn {
      font-weight: 700;
      font-size: 14px;
      letter-spacing: 3.11111px;
      text-transform: uppercase;
      margin-left: 12px;
    }

    > .un {
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      opacity: 0.5;
      margin-left: 12px;
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
  const navigate = useNavigate();

  const onPreviousClick = () => {
    navigate(ROUTES.MAIN.MAIN_PAGE);
  };

  return (
    <Window>
      <BackControl onPrevious={onPreviousClick}/>
      <Container>
        <div className='title-row'>
          <img className='icon' src={asset.parsedMetadata['OPT_FAVICON_URL']}/>
          <span className='sn'>{asset.parsedMetadata['SN']}</span>
          <span className='un'>{asset.parsedMetadata['UN']}</span>
        </div>
        <div className='row'>
          <div className='title'>Metadata Schema Version</div>
          <div className='value'>1</div>
        </div>
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
          <div className='value'>
            {asset.parsedMetadata['OPT_SHORT_DESC'] ? asset.parsedMetadata['OPT_SHORT_DESC'] : '-'}
          </div>
        </div>
        <div className='row'>
          <div className='title'>Long Description</div>
          <div className='value'>
            {asset.parsedMetadata['OPT_LONG_DESC'] ? asset.parsedMetadata['OPT_LONG_DESC'] : '-'}
          </div>
        </div>
        <div className='row'>
          <div className='title'>Website</div>
          <div className='value'> {asset.parsedMetadata['OPT_SITE_URL'] ? (
            <a href={asset.parsedMetadata['OPT_SITE_URL']} className='ref'>
              {asset.parsedMetadata['OPT_SITE_URL']}
            </a>) : '-'}
          </div>
        </div>
        <div className='row'>
          <div className='title'>Description Paper</div>
          <div className='value'>{ asset.parsedMetadata['OPT_PDF_URL'] ? (
            <a href={asset.parsedMetadata['OPT_PDF_URL']} className='ref'>
              {asset.parsedMetadata['OPT_PDF_URL']}
            </a>) : '-'}
          </div>
        </div>
        <div className='row'>
          <div className='title'>Logo</div>
          <div className='value'>
            {asset.parsedMetadata['OPT_LOGO_URL'] ? (<img className='img' src={asset.parsedMetadata['OPT_LOGO_URL']}/>) : '-'}
          </div>
        </div>
      </Container>
    </Window>
  );
};

export default CreatePage;
