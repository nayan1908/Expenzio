import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Dialog } from 'antd-mobile';
import Logo from '../../component/Loader/Logo/Logo';
import { apiRequest } from '../../helper/general';
import { useState } from 'react';
import DotLoader from '../../component/Loader/DotLoader';
import PasswordInput from '../../component/PasswordInput/PasswordInput';

const Register = () => {
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);

    const onFinish = async (values) => {
        try {
            setIsSaving(true);

            const apiParams = {
                method: "POST",
                apiParams: {
                    first_name: values.first_name.trim(),
                    last_name: values.last_name.trim(),
                    password: values.password,
                    email: values.email.trim(),
                    mobile: values.mobile.trim()
                }
            };

            const apiRes = await apiRequest("auth/register", apiParams);
            if (apiRes.settings?.success === 1) {
                Dialog.alert({
                    content: apiRes.settings?.message,
                    onConfirm: () => {
                        navigate("/login");
                    },
                });
            } else {
                Dialog.alert({ content: apiRes.settings?.message });
            }
        } catch ({ message }) {
            Dialog.alert({ content: message || "Something went wrong!" });
        } finally {
            setIsSaving(false);
        }
    }



    return (
        <>
            <Form
                onFinish={onFinish}
                footer={
                    <Button block type='submit' color='primary' size='middle' disabled={isSaving ? 'disabled' : ''}>
                        Register {isSaving && <DotLoader />}
                    </Button>
                }
            >
                <Form.Header>
                    <Logo />
                </Form.Header>

                <Form.Item
                    name='first_name'
                    label='First Name'
                    normalize={value => value.trim()}
                    rules={[
                        { required: true, message: 'Please enter first name' },
                        { min: 2 },
                        { max: 20 }
                    ]}
                >
                    <Input placeholder='First Name' />
                </Form.Item>

                <Form.Item
                    name='last_name'
                    label='Last Name'
                    normalize={value => value.trim()}
                    rules={[
                        { required: true, message: 'Please enter last name' },
                        { min: 2 },
                        { max: 20 }
                    ]}
                >
                    <Input placeholder='Last Name' />
                </Form.Item>

                <Form.Item
                    name='email'
                    label='Email'
                    normalize={value => value.trim()}
                    rules={[
                        { required: true, message: 'Please enter email' },
                        { type: 'email', message: 'Please enter valid email' }
                    ]}
                >
                    <Input placeholder='Email' />
                </Form.Item>

                <Form.Item
                    name='mobile'
                    label='Mobile'
                    rules={[
                        { required: true, message: 'Please enter mobile' },
                    ]}
                >
                    <Input placeholder='Mobile' />
                </Form.Item>

                <PasswordInput rules={[{ min: 6 }, { max: 15 }]} />
            </Form>
            <p className="text-center">Already have an account <Link to="/login">Login</Link></p>
        </>
    );
}

export default Register;
