import { useState } from "react";
import { Form, Input } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import "./password-input.css";

const PasswordInput = (props) => {
    let  rules =  [{ required: true, message: 'Please enter password' }];

    if(props?.rules){
        rules = [...rules, ...props.rules];
    }

    const [visible, setVisible] = useState(false)

    return (
        <Form.Item
            name='password'
            label='Password'
            rules={rules}
            extra={
                <div className="password-eye">
                    {!visible ? (
                        <EyeInvisibleOutline onClick={() => setVisible(true)} />
                    ) : (
                        <EyeOutline onClick={() => setVisible(false)} />
                    )}
                </div>
            }
        >
            <Input
                className="password-input"
                placeholder="Password"
                type={visible ? 'text' : 'password'}
            />
        </Form.Item>
    );
}

export default PasswordInput;