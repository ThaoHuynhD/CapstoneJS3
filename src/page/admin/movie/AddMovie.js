import { Button, Form, Image, Input, Switch, message } from 'antd';
import React, { useState } from 'react'
import { getDataMovieAddNew } from '../../../api/adminApi';
import TextArea from 'antd/es/input/TextArea';

export default function AddMovie() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
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
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleMovieAdd = async (values) => {
        const formAdd = new FormData();
        formAdd.append("tenPhim", values.tenPhim);
        formAdd.append("trailer", values.trailer);
        formAdd.append("moTa", values.moTa);
        formAdd.append("ngayKhoiChieu", values.ngayKhoiChieu);
        formAdd.append("sapChieu", values.sapChieu);
        formAdd.append("dangChieu", values.dangChieu);
        formAdd.append("hot", values.hot);
        formAdd.append("maNhom", values.maNhom);
        if (selectedFile) {
            formAdd.append("hinhAnh", selectedFile, selectedFile.name);
        }
        try {
            for (const entry of formAdd.entries()) {
                const [key, value] = entry;
                console.log(`${key}: ${value}`);
            }
            await getDataMovieAddNew(formAdd);
            message.success("Thêm Phim thành công");
        } catch (error) {
            message.error(error.response.data.content);
            console.log(error);
        }
    };
    return (
        <div className='ModalAddMovie'>
            <Form className='mx-auto my-5 border p-5 text-center'
                {...formItemLayout}
                form={form}
                name="FormAddMovie"
                onFinish={handleMovieAdd}
                style={{
                    maxWidth: 1000,
                }}
                scrollToFirstError
                initialValues={{ sapChieu: false, dangChieu: false, hot: false }}
            >
                <Form.Item name="tenPhim"
                    label="Tên Phim"
                    initialValue={'Người đàn ông mang tên Ove'}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên phim',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="trailer"
                    label="Trailer"
                    initialValue={'https://www.phimconggiao.com/phim-nguoi-dan-ong-mang-ten-ove/'}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập trailer của bạn!',
                            whitespace: true,
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item name="moTa"
                    label="Mô Tả"
                    initialValue={'Phim A Man Called Ove 2015 kể về một người đàn ông góa vợ 59 tuổi Ove Lindahl (Rolf Lassgård), Ông là bị trầm cảm sau cái chết của người vợ của mình. Vợ ông tên Sonja, một giáo viên, người chết vì ung thư sáu tháng trước. Sau khi làm việc tại các công ty trong 43 năm, ông được nghỉ hưu.'}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mô tả!',
                        },
                    ]}
                    hasFeedback
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item name="ngayKhoiChieu"
                    label="Ngày Khởi Chiếu"
                    initialValue={'26/10/2023'}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập ngày khởi chiếu!',
                        },
                    ]}
                >
                    <Input placeholder='example: 10/10/2022' />
                </Form.Item>
                <Form.Item name="sapChieu"
                    label="Sắp Chiếu"
                >
                    <Switch defaultChecked={false} />
                </Form.Item>
                <Form.Item name="dangChieu"
                    label="Đang Chiếu">
                    <Switch defaultChecked={false} />
                </Form.Item>
                <Form.Item name="hot"
                    label="Hot">
                    <Switch defaultChecked={false} />
                </Form.Item>
                <Form.Item name="maNhom"
                    label="Mã Nhóm"
                    initialValue={'GP09'}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mã nhóm!',
                            whitespace: true,
                        },
                    ]}>
                    <Input placeholder={'GP09'} />
                </Form.Item>
                <Form.Item name="hinhAnh" label="Hình Ảnh"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn hình ảnh!',
                            whitespace: true,
                        },
                    ]}>

                    <Input type="file" accept="image/*" onChange={handleFileChange} />
                    {selectedImage && (
                        <Image
                            src={selectedImage}
                            alt="Selected Image"
                            style={{ maxWidth: '100%', maxHeight: '200px' }}
                        />
                    )}
                </Form.Item>
                <Button className='btn btn-red' htmlType="submit">
                    Thêm Phim
                </Button>
            </Form>
        </div>
    )
}
