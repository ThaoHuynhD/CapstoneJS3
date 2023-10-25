import React from 'react';
import { Button, Form, Input, message, } from 'antd';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SIGN_UP_USER } from '../../constant/constant';
import { getUserSignUp } from '../../api/mainApi';
export default function SignUpPage() {
    const dispatch = useDispatch();
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
    const [form] = Form.useForm();

    const fetchData = async (values) => {
        try {
            const response = await getUserSignUp(values);
            dispatch({
                type: SIGN_UP_USER,
                payload: response.data.content,
            });
            message.success("Đăng ký thành công");
            setTimeout(() => {
                window.location.reload();
                window.location.href = "/sign-in"
            }, 1000);
        } catch (error) {
            message.error(error.response.data.content);
            console.log(error);
        }
    };

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        fetchData(values);
    };
    return (
        <Form className='mx-auto my-5 border p-5 text-center'
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            style={{
                maxWidth: 600,
            }}
            scrollToFirstError
        >
            <h1 className='pb-5'>Đăng ký</h1>
            <Form.Item name="taiKhoan"
                label="taiKhoan"
                tooltip="Bạn muốn được gọi là?"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập tên tài khoản',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="matKhau"
                label="matKhau"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>
            <Form.Item name="soDienThoai"
                label="soDienThoai"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập số điện thoại!',
                        whitespace: true,
                    },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item name="maNhom"
                label="maNhom"
                className='d-none'
                initialValue={'KhachHang'}
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mã nhóm!',
                        whitespace: true,
                    },
                ]}>
                <Input disabled={true} placeholder={'KhachHang'} />
            </Form.Item>
            <Form.Item name="hoTen"
                label="hoTen"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập họ tên của bạn!',
                        whitespace: true,
                    },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item name="email"
                label="e-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Button type="primary" htmlType="submit">
                Đăng Ký
            </Button>
            <p className='text-center pt-3'>Đã có tài khoản, đăng nhập <NavLink to='/sign-in'>tại đây</NavLink></p>
        </Form>
    );
};
