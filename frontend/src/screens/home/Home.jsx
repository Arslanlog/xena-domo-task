import { Button, message } from 'antd';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../../services';

const Home = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateUuid = async () => {
    setLoading(true);
    const res = await userAPI.generateToken({
      upiId: "415132446341215",
      bankName: "Test Bank Name",
      code: "3413",
      accountNumber: "3441251512",
      ifscCode: "4215214312",
      name: "Test Name",
    });
    setLoading(false);
    if (res.error) {
      message.error(res.error.message);
      return;
    }
    const uuid = res.data.data.uuid;
    navigate(`/transaction/${uuid}`);
  }

  return (
    <div>
      <p>Welcome!</p>
      <Button
        type='primary'
        loading={loading}
        onClick={handleGenerateUuid}
      >
        Proceed
      </Button>
    </div>
  )
}

export default Home;