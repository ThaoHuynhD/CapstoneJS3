import React, { useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { userDetailLocalStorage } from '../../api/localServices';
import { UPDATE_USER } from '../../constant/constant';
import { getUserInfoUpdated } from '../../api/mainApi';
import { useDispatch } from 'react-redux';

export default function PersonalDetail({ userDetail }) {
    const [form] = Form.useForm();
    let dispatch = useDispatch();
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
    useEffect(() => {
        if (userDetail !== null) {
            form.setFieldsValue({
                taiKhoan: userDetail.taiKhoan,
                matKhau: userDetail.matKhau,
                soDT: userDetail.soDT,
                hoTen: userDetail.hoTen,
                email: userDetail.email,
                maLoaiNguoiDung: userDetail.maLoaiNguoiDung,
                maNhom: userDetail.maNhom,
            });
        }
    }, [userDetail, form]);

    if (!userDetail || userDetail.length === 0) {
        return <div>Loading...</div>;
    }

    const fetchData = async (values) => {
        try {
            const response = await getUserInfoUpdated(values);
            console.log("response.data.content: ", response.data.content);
            dispatch({
                type: UPDATE_USER,
                payload: response.data.content,
            });
            userDetailLocalStorage.set(response.data.content);
            message.success("Cập nhật thành công");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            message.error(error.response.data.content);
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
                maxWidth: 600,
            }}
            scrollToFirstError
        >
            <h1 className='pb-5'>Thông tin cá nhân của bạn</h1>
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
            <Form.Item name="soDT"
                label="soDT"
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
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mã nhóm!',
                        whitespace: true,
                    },
                ]}>
                <Input disabled={true} placeholder={userDetail.maNhom} />
            </Form.Item>
            <Form.Item name="maLoaiNguoiDung"
                label="maLoaiNguoiDung"
                className='d-none'
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mã loại người dùng!',
                        whitespace: true,
                    },
                ]}>
                <Input disabled={true} placeholder={userDetail.maLoaiNguoiDung} />
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
                Cập nhật
            </Button>
        </Form>
    );
};
