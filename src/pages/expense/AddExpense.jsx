import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, TextArea } from "antd-mobile";
import CustomHeader from "../../component/CustomHeader/CustomHeader";
import { apiRequest, systemDate } from "../../helper/general";
import MaskLoader from "../../component/Loader/MaskLoader";
import dayjs from "dayjs";
import CustomDatePicker from "../../component/CustomDatePicker/CustomDatePicker";

const AddExpense = () => {
    const navigate = useNavigate();
    const initialValues = {};
    const [form] = Form.useForm();
    const [date, setDate] = useState(dayjs());
    const [isSaving, setIsSaving] = useState(false);

    const dateOnChange = (value) => {
        setDate(value);
    }

    const onFinish = async (values) => {
        try {
            setIsSaving(true);

            const apiParams = {
                method: "POST",
                apiParams: {
                    title: values.title,
                    description: values.description,
                    price: values.price,
                    date: systemDate(date)
                }
            };

            const apiRes = await apiRequest("expense/add", apiParams);
            if (apiRes?.settings?.success === 1) {
                navigate("/expense");
            }
        } catch ({ message }) {

        } finally {
            setIsSaving(false);
        }
    }

    return (
        <CustomHeader title="Add Expense" className="expense">
            <MaskLoader isVisible={isSaving} />
            <Form
                className="add-expense"
                form={form}
                onFinish={onFinish}
                initialValues={initialValues}
                footer={
                    <div className="button-container">
                        <Button block type='button' size='middle' onClick={() => navigate('/expense')}>
                            Cancel
                        </Button>

                        <Button block type='submit' color='primary' size='middle'>
                            Save
                        </Button>
                    </div>
                }
            >
                <Form.Item
                    name='title'
                    label='Title'
                    normalize={value => value.trimStart()}
                    rules={[
                        { required: true, message: 'Please enter title' },
                        { min: 2 },
                        { max: 30 }
                    ]}
                >
                    <Input placeholder='Title' />
                </Form.Item>

                <Form.Item
                    name='description'
                    label='Description'
                    normalize={value => value.trimStart()}
                    rules={[
                        { max: 150 }
                    ]}
                >
                    <TextArea rows={3} placeholder="Description" />
                </Form.Item>

                <Form.Item
                    name='price'
                    label='price'
                    normalize={value => value.trim()}
                    rules={[
                        { required: true, message: 'Please enter price' },
                    ]}
                >
                    <Input type="number" placeholder='Price' step="1" />
                </Form.Item>

                <CustomDatePicker date={date} onChange={dateOnChange} />
            </Form>
        </CustomHeader>

    );
}

export default AddExpense;