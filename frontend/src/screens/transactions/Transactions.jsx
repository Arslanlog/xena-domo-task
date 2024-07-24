import React, { useEffect, useState } from 'react'
import { Spin, Tabs, Modal, Form, Input, Button, message } from 'antd';
import { FcRating } from "react-icons/fc";
import { Upi, Bank, Result } from '../../components';
import { useNavigate, useParams } from 'react-router-dom'
import { userAPI } from '../../services';
import "./transactions.css"

const Transactions = () => {
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [amount, setAmount] = useState('0.0');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transactionsInformation, setTransactionInformation] = useState(null);
    const [status, setStatus] = useState(null);
    const params = useParams();
    const [timer, setTimer] = useState(10 * 60);

    useEffect(() => {
        if(timer <= 0){
            setStatus({
                status: "403",
                message: "Session has expired!",
            })
            return;
        }
        const timerID = setTimeout(() => tick(), 1000);
        return () => clearTimeout(timerID);
    }, [timer]);

    useEffect(() => {
        handleValidateToken();
    }, [params.token])

    const handleValidateToken = async () => {
        const token = params.token
        setLoading(true);
        const res = await userAPI.validateToken(token);
        setLoading(false);
        if (res.error) {
            setStatus({
                status: res.error?.error?.status || "error",
                message: res.error.message,
            })
            return;
        }
        const data = res.data.data;
        console.log(data.expirationDate);
        setIsModalOpen(true);
        setTransactionInformation(data || null);
        if(data.expirationDate){
            console.log(data.expirationDate);
            const difference = new Date(data.expirationDate).getTime() - new Date().getTime();
            console.log("===> Difference", difference);
            const seconds = Math.floor(difference/1000)
            if(seconds > 0){
                setTimer(seconds);
            }
        }
    }

    const handleUtrNumber = async (data) => {
        setProcessing(true);
        const res = await userAPI.processTransaction(params.token, {
            ...data,
            amount,
        })
        setProcessing(false);
        if (res.error) {
            setStatus({
                status: res.error?.error?.status || "error",
                message: res.error.message,
            })
            return;
        }

        setStatus({
            status: "success",
            message: "Your transaction has processed successfully!",
        })
    }

    const handleAmount = (data) => {
        setIsModalOpen(false);
        setAmount(data.amount)
    }

    function tick() {
        setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
    }

    const formatTime = (time) => {
        const minutes = String(Math.floor(time / 60)).padStart(2, '0');
        const seconds = String(time % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    };
    const formattedTime = formatTime(timer);

    if (loading) {
        return (
            <div className='loader-component'>
                <Spin />
            </div>
        )
    }

    if (status) {
        return <Result {...status} />
    }


    return (
        <div className='main-section'>
            <header>
                <div className="icon">
                    <FcRating size={30} />
                    <p>XiCash</p>
                </div>
            </header>
            <div className='main-content'>
                <Tabs
                    defaultActiveKey="1"
                    className='tabs'
                    type="card"
                    tabBarGutter={10}
                >
                    <Tabs.TabPane tab='Upi' key='1'>
                        <Upi {...transactionsInformation} amount={amount} formattedTime={formattedTime} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Bank Transfer' key='3'>
                        <Bank {...transactionsInformation} amount={amount} formattedTime={formattedTime} />
                    </Tabs.TabPane>
                </Tabs>
                <Form layout='vertical' onFinish={handleUtrNumber}>
                    <div className="utr-number">
                        <Form.Item
                            label="Enter UTR Number"
                            name="utrNumber"
                            rules={[{ required: true, message: 'Please enter amount' }]}
                        >
                            <Input
                                type='text'
                                size='large'
                            />
                        </Form.Item>
                        <Form.Item name="" label=" ">
                            <Button
                                type='primary'
                                size='large'
                                htmlType='submit'
                                loading={processing}
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
            <Modal title="Attention" open={isModalOpen} footer={false}>
                <Form layout='vertical' onFinish={handleAmount}>
                    <div>
                        <Form.Item
                            name='amount'
                            label="Please enter the amount for this transaction"
                            rules={[{ required: true, message: 'Please enter amount' }]}
                        >
                            <Input
                                type='number'
                                placeholder='Enter New Amount'
                                size='large'
                                addonAfter="$"
                            />
                        </Form.Item>
                        <Button type='primary' htmlType='submit'>Submit</Button>
                    </div>
                </Form>
            </Modal>
        </div >

    )
}

export default Transactions
