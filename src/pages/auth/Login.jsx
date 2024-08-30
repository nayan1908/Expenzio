import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Dialog } from 'antd-mobile';
import Logo from '../../component/Loader/Logo/Logo';
import { apiRequest } from '../../helper/general';
import DotLoader from '../../component/Loader/DotLoader';
import { setSession } from '../../helper/auth';
import PasswordInput from '../../component/PasswordInput/PasswordInput';

const Login = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);

    const onFinish = async (values) => {
        try {
            setIsLogin(true);

            const apiParams = {
                method: "POST",
                apiParams: {
                    email: values.email,
                    password: values.password
                }
            };
            const apiRes = await apiRequest("auth/login", apiParams);
            if (apiRes?.settings?.success === 1) {
                setSession(apiRes.data); // set session data
                navigate("/dashboard");
            } else {
                Dialog.alert({ content: apiRes.settings.message });
            }
        } catch ({ message }) {
            Dialog.alert({ content: message || "Something went wrong!" });
        } finally {
            setIsLogin(false);
        }
    }

    return (
        <>
            <Form
                onFinish={onFinish}
                footer={
                    <Button block type='submit' color='primary' size='middle' disabled={isLogin ? 'disabled' : ''}>
                        Login {isLogin && <DotLoader />}
                    </Button>
                }
            >
                <Form.Header>
                    <Logo />
                </Form.Header>
                <Form.Item

                    name='email'
                    label='Email'
                    rules={[{ required: true, message: 'Please enter email' }]}
                    normalize={value => value.trim()}
                >
                    <Input placeholder='Email' />
                </Form.Item>

                <PasswordInput />
            </Form>
            <p className="text-center">Don't have an account <Link to="/register">Register</Link></p>
        </>
    );
}

export default Login;

