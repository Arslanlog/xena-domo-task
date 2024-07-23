import React from 'react'
import QRCode from 'react-qr-code';

const QrGenerator = ({upiId, amount}) => {

    const payload = JSON.stringify({
        upi_id: upiId,
        amount,
    })

    return (
        <div>
           <QRCode value={payload} />
        </div>
    )
}

export default QrGenerator;