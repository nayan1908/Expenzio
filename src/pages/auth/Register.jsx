import { Link } from 'react-router-dom';
import { Form, Input, Button, Dialog } from 'antd-mobile';
import Logo from '../../component/Loader/Logo/Logo';

const Register = () => {

    const onFinish = (values) => {
        Dialog.alert({
            content: <pre>{JSON.stringify(values, null, 2)}</pre>,
        })
    }

    return (
        <div style={{ padding: "0 20px" }}>
            <Form
                onFinish={onFinish}
                footer={
                    <Button block type='submit' color='primary' size='large'>
                        Register
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
                    rules={[{ required: true, message: 'Please enter first name' }]}
                >
                    <Input placeholder='First Name' />
                </Form.Item>

                <Form.Item
                    name='last_name'
                    label='Last Name'
                    normalize={value => value.trim()}
                    rules={[{ required: true, message: 'Please enter last name' }]}
                >
                    <Input placeholder='Last Name' />
                </Form.Item>

                <Form.Item
                    name='email'
                    label='Email'
                    normalize={value => value.trim()}
                    rules={[{ required: true, message: 'Please enter email' }]}
                >
                    <Input placeholder='Email' />
                </Form.Item>

                <Form.Item
                    name='mobile'
                    label='Mobile'
                    rules={[{ required: true, message: 'Please enter mobile' }]}
                >
                    <Input placeholder='Mobile' />
                </Form.Item>

                <Form.Item
                    name='password'
                    label='Password'
                    rules={[{ required: true, message: 'Please enter password' }]}
                >
                    <Input type="password" placeholder='Password' />
                </Form.Item>
            </Form>
            <p>Already have an account <Link to="/login">Login</Link></p>
        </div>
    );
}

export default Register;
