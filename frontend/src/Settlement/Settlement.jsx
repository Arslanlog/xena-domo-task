import { useEffect, useState, useRef } from 'react';
import { Table, Button, Pagination, Modal, Form, Select, Input } from 'antd'
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdRefresh } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { addSettlementAction, getSettlementAction } from '../redux/actions/settlement';
import { getMerchantAction } from '../redux/actions/marchant';
import { Columns } from './Columns';

function Settlement() {

    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const method = Form.useWatch("method", form);
    const timer = useRef(null);
    const mounted = useRef(false);
    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useState({});
    const [pagination, setPagination] = useState({
        page: 1,
        take: 10,
    })
    const {
        total,
        isLoading,
        addLoading,
        data,
    } = useSelector(state => state.settlement);
    const merchants = useSelector(state => state.merchant.data) || [];

    useEffect(() => {
        handleGetMerchants();
        handleGetSettlements();
    }, []);

    useEffect(()=>{
        // reset the pagination
        // if anything changes in filters
        setPagination({
            page: 1,
            take: 10,
        })
    }, [filters]);

    useEffect(() => {
        // to prevent the double call on first load
        // it may has no effect in dev mode due to react.strict
        handleGetSettlements({
            ...pagination,
            ...filters,
        }, true);
    }, [pagination, filters])

    const handleGetSettlements = async (queryObj = {}, debounced = false) => {
        if (!debounced) {
            dispatch(getSettlementAction(queryObj));
            return;
        }
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            dispatch(getSettlementAction(queryObj))
        }, 1500);
    }

    const handleGetMerchants = async () => {
        dispatch(getMerchantAction())
    }

    const handleToggleModal = () => {
        setOpen(!open);
        form.resetFields();
    };

    const handlePageChange = (page, pageSize) => {
        setPagination({
            page,
            take: pageSize,
        })
    }

    const handleShowTotal = (total, range) => {
        if (!total) {
            return;
        }
        return (
            <p className='text-base'>
                {range[0]}-{range[1]} of {total} items
            </p>
        )
    }

    const handleSubmit = async (data) => {
        dispatch(addSettlementAction(data))
            .unwrap()
            .then(() => {
                setOpen(false);
                handleGetSettlements();
            })
            .catch((rejectedValueOrSerializedError) => {
                // handle error here
            })
    }

    const onFilterChange = async (name, value)=>{
        setFilters({
            ...filters,
            [name]: value,
        })
    }


    const merchantOptions = merchants
        .map(el => ({
            value: el.id,
            label: el.name,
        }))

    const labelCol = { span: 6 };
    const RequiredRule = [
        {
            required: true,
            message: "${label} is Required!",
        }
    ]

    return (
        <section className='h-full w-full bg-[#F4F7FF] flex justify-center items-start overflow-auto'>
            <div className='bg-white w-[95%] my-[30px] rounded-[8px] p-[8px]'>
                <div className='flex justify-between mb-[10px] max-[500px]:flex-col max-[500px]:gap-[10px]'>
                    <p className='text-lg font-medium p-[5px]'>Settlement List</p>
                    <div className='flex items-center gap-4 max-[500px]:justify-end'>
                        <Button
                            icon={<AiOutlinePlus />}
                            className='settlement-btn'
                            type='primary'
                            onClick={handleToggleModal}
                        >
                            New Settlement
                        </Button>
                        <Button type="text" className='rounded-full h-[40px] w-[40px] p-[0px]' onClick={() => handleGetSettlements({...pagination, ...filters})}>
                            <IoMdRefresh size={24} />
                        </Button>
                    </div>
                </div>
                <div className='overflow-x-auto'>
                    <Table
                        rowKey="id"
                        dataSource={[{}, ...(Array.isArray(data) ? data : [])]}
                        pagination={false}
                        loading={isLoading}
                        rowSelection={{
                            type: "checkbox",
                        }}
                    >
                        {Columns(merchantOptions, filters, onFilterChange)}
                    </Table>
                </div>
                <div className='flex justify-end mt-[10px]'>
                    <Pagination
                        total={total}
                        pageSize={pagination.take}
                        current={pagination.page}
                        showTotal={handleShowTotal}
                        onChange={handlePageChange}
                    />
                </div>
            </div>

            <Modal title="Add Settlement" onCancel={handleToggleModal} open={open} footer={false}>
                <Form
                    form={form}
                    className='pt-[10px]'
                    labelAlign='left'
                    labelCol={labelCol}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="code"
                        label="Merchant"
                        rules={RequiredRule}
                    >
                        <Select
                            options={merchantOptions}
                        />
                    </Form.Item>
                    <Form.Item
                        name="amount"
                        label="Amount"
                        rules={RequiredRule}
                    >
                        <Input type="number" min={1} addonAfter="$" />
                    </Form.Item>
                    <Form.Item
                        name="method"
                        label="Method"
                        rules={RequiredRule}
                    >
                        <Select
                            options={methodOptions}
                        />
                    </Form.Item>
                    {
                        method === "BANK" &&
                        <>
                            <Form.Item name="acc_name" label="Name" rules={RequiredRule}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="acc_no" label="Bank Details" rules={RequiredRule}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="ifsc" label="IFSC" rules={RequiredRule}>
                                <Input />
                            </Form.Item>
                        </>
                    }
                    {
                        method === "CRYPTO" &&
                        <>
                            <Form.Item name="wallet" label="Wallet" rules={RequiredRule}>
                                <Select options={walletOptions} />
                            </Form.Item>
                            <Form.Item name="wallet_address" label="Wallet Address" rules={RequiredRule}>
                                <Input />
                            </Form.Item>
                        </>
                    }
                    <div className='flex justify-end'>
                        <Button type='primary' loading={addLoading} htmlType='submit'>
                            Save
                        </Button>
                    </div>
                </Form>
            </Modal>
        </section>
    );
}

export default Settlement;


export const statusOptions = ["SUCCESS", "ASSIGNED", "DROPPED"]
    .map(el => ({
        value: el,
        label: el.toLowerCase(),
    }))

export const methodOptions = ["BANK", "CASH", "AED", "CRYPTO"]
    .map(el => ({
        value: el,
        label: el.toLowerCase(),
    }))

export const walletOptions = ["WALLET1", "WALLET2"]
    .map(el => ({
        value: el,
        label: el.toLowerCase(),
    }))

