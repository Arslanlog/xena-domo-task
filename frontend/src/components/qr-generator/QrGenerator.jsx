import React from 'react'
import QRCode from 'react-qr-code';

const QrGenerator = ({upiId, amount, code}) => {
    return (
        <div>
           <QRCode value={`upi://pay?pa=${upiId}&pn=xi-cash&am=${amount}&cu=usd`} />
        </div>
    )
}

export default QrGenerator;