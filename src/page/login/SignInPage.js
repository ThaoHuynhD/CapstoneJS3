import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserSignIn } from '../../api/mainApi';
import { userLocalStorage } from '../../api/localServices';
import { Button, Form, Input, message } from "antd";
import { SIGN_IN_USER } from '../../constant/constant';

export default function SignInPage() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };

    const fetchData = async (values) => {
        try {
            const response = await getUserSignIn(values);
            dispatch({
                type: SIGN_IN_USER,
                payload: response.data.content,
            });
            userLocalStorage.set(response.data.content);
            message.success("Đăng nhập thành công");
            setTimeout(() => {
                window.location.reload();
                window.location.href = "/"
            }, 1000);
        } catch (error) {
            message.error("Tài khoản hoặc mật khẩu không chính xác");
            console.log(error);
        }
    };

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        fetchData(values);
    }

    return (
        <Form className='mx-auto my-5 border p-5 text-center'
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            style={{
                maxWidth: 800,
            }}
            scrollToFirstError
        >
            <h1 className='pb-5'>Đăng nhập</h1>
            <Form.Item name="taiKhoan" label="Tài Khoản"
                rules={[
                    {
                        type: 'taiKhoan',
                        message: 'Tài khoản nhập sai hoặc không tồn tại!',
                    },
                    {
                        required: true,
                        message: 'Vui lòng nhập thông tin tài khoản!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="matKhau" label="Mật Khẩu"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập thông tin mật khẩu!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>
            <Button type="primary" htmlType="submit">Đăng nhập</Button>
            <p className='pt-3'>Chưa có tài khoản, đăng ký <NavLink to='/sign-up'>tại đây</NavLink></p>
        </Form>
    )
}