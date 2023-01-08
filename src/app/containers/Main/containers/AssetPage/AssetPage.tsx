import React, { useState, useRef } from 'react';
import { styled } from '@linaria/react';
import { Button, Window, Table } from '@app/shared/components';
import { css } from '@linaria/core';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Container = styled.div`
  margin: 0 auto;
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
 

  return (
    <Window>
     
    </Window>
  );
};

export default CreatePage;
