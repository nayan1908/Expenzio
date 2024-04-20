import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Dialog } from 'antd-mobile';
import Logo from '../../component/Loader/Logo/Logo';

const Login = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        // Dialog.alert({
        //     content: <pre>{JSON.stringify(values, null, 2)}</pre>,
        // })

        navigate("/dashboard");
    }

    return (
        <div style={{ padding: "0 20px" }}>
            <Form
                onFinish={onFinish}
                footer={
                    <Button block type='submit' color='primary' size='large'>
                        Login
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

                <Form.Item
                    name='password'
                    label='Password'
                    rules={[{ required: true, message: 'Please enter password' }]}
                >
                    <Input type="password" placeholder='Password' />
                </Form.Item>
            </Form>
            <p>Don't have an account <Link to="/register">Register</Link></p>
        </div>
    );
}

export default Login;

