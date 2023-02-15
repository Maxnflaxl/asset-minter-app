/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Button, AmountInput, Popup, AssetIcon } from '@app/shared/components';
import { IconCancel, IconWithdrawBlue } from '@app/shared/icons';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { toGroths } from '@core/appUtils';
import { WithdrawOwnAsset } from '@core/api';
import { styled } from '@linaria/react';
import { css } from '@linaria/core';
import { selectAppParams, selectPopupState } from '@app/containers/Main/store/selectors';

interface WithdrawPopupProps {
  visible?: boolean;
  onCancel?: ()=>void;
}

interface WithdrawFormData {
    withdraw_amount: string;
}

const WithdrawButtonsClass = css`
    max-width: 145px !important;
`;

const AmountContainer = styled.div`
  > .mint-form {
    display: flex;
    flex-direction: row;
    align-items: center;

    > .asset-icon {
      margin-left: auto;
    }
  }
`;

const WithdrawPopupClass = css`
    width: 450px !important;
`;

const WithdrawPopup: React.FC<WithdrawPopupProps> = ({ visible, onCancel }) => {
  const popupsState = useSelector(selectPopupState('withdraw'));
  
  const handleValueChange = (e: string) => {
    setFieldValue('withdraw_amount', e, true);
  };

  const formik = useFormik<WithdrawFormData>({
    initialValues: {
      withdraw_amount: '',
    },
    isInitialValid: false,
    //validate: (e) => validate(e, setHint),
    onSubmit: (value) => {
      WithdrawOwnAsset(toGroths(parseFloat(value.withdraw_amount)), popupsState.aid);
      onCancel();
      resetForm();
    },
  });

  const {
    values, setFieldValue, errors, submitForm, resetForm
  } = formik;

  return (
    <Popup
      className={WithdrawPopupClass}
      visible={visible}
      title="Mint asset"
      cancelButton={(
        <Button variant='ghost' className={WithdrawButtonsClass} icon={IconCancel} onClick={()=>{
            onCancel();
          }}>
          cancel
        </Button>
      )}
      confirmButton={(
        <Button variant='regular' className={WithdrawButtonsClass} pallete='blue'
          icon={IconWithdrawBlue} onClick={submitForm}>
          mint
        </Button>
      )}
      onCancel={()=> {
        onCancel();
      }}
    >
      <AmountContainer>
        <form className='mint-form' onSubmit={submitForm}>
          <AmountInput
            from='withdraw'
            value={values.withdraw_amount}
            error={errors.withdraw_amount?.toString()}
            onChange={(e, aid) => {
              handleValueChange(e);
            }}
          />
          <AssetIcon className='asset-icon' asset_id={popupsState.aid}/>
          {popupsState.n}
          {' (id:'+popupsState.aid+')'}
        </form>
      </AmountContainer>
    </Popup>
  );
};

export default WithdrawPopup;
