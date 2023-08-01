import React from 'react';
import Barcode from 'react-barcode';
import styled from 'styled-components';


const myStyledCompo = styled



const BarcodeComponent = () => {
  return (
    <div>
      <Barcode

      style={{}}
        value="YOUR_BARCODE_VALUE"
        width={2}
        height={80}
        format="CODE128"
        displayValue={false}
      />
    </div>
  );
};

export default BarcodeComponent;
