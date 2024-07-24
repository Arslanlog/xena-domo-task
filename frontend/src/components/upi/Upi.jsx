import React, { useEffect, useState } from 'react'
import { MdOutlineTimer } from "react-icons/md";
import { Divider } from 'antd';
import { RiFileCopyFill } from "react-icons/ri";
import { QrGenerator } from '../qr-generator'
import { copyToClipboard } from '../../utils';
import "./Upi.css";

const Upi = ({ code, amount, upiId,formattedTime }) => {
  return (
    <section className='upi-section'>
      <div className="bank-container">
        <p className='text'>Payment Time Left</p>
        <div className="right-area">
          <MdOutlineTimer size={20} color='white' />
          <p className='timer-text'>00:{formattedTime}</p>
        </div>
      </div>
      <div className="section-container">
        <div className="section-to">
          <span>Scan & Paythe exact amount only<br /> (upto lakh ) submit UTR</span>
        </div>
        <Divider />
        <div className="amount-container">
          <p className='amount-text'>Transfer Amount</p>
          <p className='price'>${amount}/-</p>
        </div>
        <div className='qr-container'>
          <QrGenerator upiId={upiId} amount={amount} code={code} />
        </div>
        <div className="details-section">
          <p>UPI ID</p>
          <div className="Upi-details">
            <span className='text-value'>{upiId}</span>
            <div className="icon-copy" >
              <RiFileCopyFill size={20} color='white' onClick={() => copyToClipboard(upiId)} />
            </div>

          </div>
        </div>
        <Divider />
        <div className="details-section">
          <p>Code</p>
          <div className="Upi-details">
            <span className='text-value'>{code}</span>
            <div className="icon-copy" >
              <RiFileCopyFill size={20} color='white' onClick={() => copyToClipboard(code)} />
            </div>
          </div>
        </div>
        <Divider />
      </div>
    </section>
  )
}

export default Upi;
