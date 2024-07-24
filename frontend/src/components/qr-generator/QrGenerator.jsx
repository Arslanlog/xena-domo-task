import React from 'react'
import QRCode from 'react-qr-code';

const QrGenerator = ({upiId, amount, code}) => {

    const payload = JSON.stringify({
        upi_id: upiId,
        amount,
        code,
    })

    return (
        <div>
           <QRCode value={payload} />
        </div>
    )
}

export default QrGenerator;