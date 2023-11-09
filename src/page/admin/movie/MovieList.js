import React, { useEffect, useState } from 'react'
import { getMovieList, getMovieDetail, getMovieListSearchByName } from '../../../api/mainApi';
import { getDataMovieDeleteIfNoShowTime, getDataMovieUpdated } from '../../../api/adminApi';
import { Form, Input, Switch, message, Button, Image, Modal, DatePicker } from 'antd';
import { FormOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import TextArea from 'antd/es/input/TextArea';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import AddMovie from './AddMovie';

dayjs.extend(customParseFormat);

export default function MovieList({ setSelectedItem, setSelectedMaPhim }) {
    const [movieList, setMovieList] = useState([]);
    const [movieSearchList, setMovieSearchList] = useState([]);
    const [isSearch, setIsSearch] = useState(false);

    const fetchDataMovieList = async () => {
        try {
            let response = await getMovieList();
            setMovieList(response.data.content);
        } catch {
            message.error("Đã có lỗi xảy ra");
        }
    };
    const fetchDataMovieSearch = async (searchValue) => {
        try {
            if (searchValue === undefined || searchValue === '' || searchValue === null) return;
            let response = await getMovieListSearchByName(searchValue);
            const updatedMovieSearchList = response.data.content;
            setMovieSearchList(updatedMovieSearchList);
            setIsSearch(true);
            message.success(`Có ${updatedMovieSearchList.length} kết quả tìm kiếm tương tự`)
        } catch {
            message.error("Đã có lỗi xảy ra");
        }
    };
    const handleSearchCancel = () => { setIsSearch(false); };

    const handleMovieDel = async (maPhim) => {
        try {
            await getDataMovieDeleteIfNoShowTime(maPhim);
            message.success("Xóa phim thành công");
        } catch (error) {
            message.error(error.response.data.content);
            console.log(error);
        }
    };

    const handleShowTime = (maPhim) => {
        setSelectedItem('showtime');
        setSelectedMaPhim(maPhim);
    }
    const renderList = () => {
        let list = isSearch ? movieSearchList : movieList;
        return (
            <table className='table text-center'>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>MÃ PHIM</th>
                        <th>HÌNH ẢNH</th>
                        <th>TÊN PHIM</th>
                        <th>MÔ TẢ</th>
                        <th>NGÀY KHỞI CHIẾU</th>
                        <th>THAO TÁC</th>
                    </tr>
                </thead>
                <tbody>{list.map((movie, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{movie.maPhim}</td>
                            <td><Image width={50} height={80} src={movie.hinhAnh} alt='' /></td>
                            <td>{movie.tenPhim}</td>
                            <td>{movie.moTa.substring(0, 30)}{movie.moTa.length > 30 ? '...' : ''}</td>
                            <td>{movie.ngayKhoiChieu.substring(0, 10)}</td>
                            <td>
                                <button className='btn btn-warning' onClick={() => { showFixModal(movie.maPhim) }}><FormOutlined /></button>
                                <button className='btn btn-danger mx-1 ' onClick={() => { handleMovieDel(movie.maPhim) }}><DeleteOutlined /></button>
                                <button className='btn btn-success' onClick={() => { handleShowTime(movie.maPhim) }}><CalendarOutlined /></button>
                            </td>
                        </tr>
                    )
                })
                }</tbody>
            </table>
        )

    }
    useEffect(() => {
        fetchDataMovieList();
        fetchDataMovieSearch();
    }, []);

    const formItemLayout = {
        labelCol: {
            xs: { span: 24, },
            sm: { span: 8, },
        },
        wrapperCol: {
            xs: { span: 24, },
            sm: { span: 16, },
        },
    };
    const [form] = Form.useForm();
    const [movieInfo, setMovieInfo] = useState([]);
    const [isFixModalOpen, setIsFixModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

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

    const handleMovieFix = async (values) => {

        console.log("values: ", values);
        const parsedDate = dayjs(values.ngayKhoiChieu, { timeZone: "GMT" });
        const formattedDate = parsedDate.format('DD/MM/YYYY');

        const formFix = new FormData();
        formFix.append("maPhim", values.maPhim);
        formFix.append("tenPhim", values.tenPhim);
        formFix.append("trailer", values.trailer);
        formFix.append("moTa", values.moTa);
        formFix.append("ngayKhoiChieu", formattedDate);
        formFix.append("sapChieu", values.sapChieu);
        formFix.append("dangChieu", values.dangChieu);
        formFix.append("hot", values.hot);
        formFix.append("maNhom", values.maNhom);
        formFix.append("danhGia", values.danhGia);
        if (selectedFile) {
            formFix.append("hinhAnh", selectedFile, selectedFile.name);
        }
        try {
            for (const entry of formFix.entries()) {
                const [key, value] = entry;
                console.log(`${key}: ${value}`);
            }
            let response = await getDataMovieUpdated(formFix);
            console.log("response: ", response);
            message.success("Cập nhật thông tin phim thành công");
        } catch (error) {
            message.error('Đã có lỗi xảy ra!!!');
            console.log(error);
        }
    };
    useEffect(() => {
        setSelectedImage(movieInfo.hinhAnh);
    }, [movieInfo]);
    const fetchDataMovieInfo = async (maPhim) => {
        try {
            let response = await getMovieDetail(maPhim);
            let movie = response.data.content;
            const parsedDate = dayjs(movie.ngayKhoiChieu);
            const formattedDate = dayjs(parsedDate.format('DD/MM/YYYY'), 'DD/MM/YYYY');

            let updatedMovie = {
                maPhim: movie.maPhim,
                tenPhim: movie.tenPhim,
                trailer: movie.trailer,
                moTa: movie.moTa,
                sapChieu: movie.sapChieu,
                dangChieu: movie.dangChieu,
                hot: movie.hot,
                danhGia: movie.danhGia,
                maNhom: movie.maNhom,
                ngayKhoiChieu: formattedDate,
            }
            setMovieInfo(updatedMovie);
            form.setFieldsValue(updatedMovie);
        } catch (error) {
            message.error("Đã có lỗi xảy ra");
            console.log(error.response.data);
        }
    };
    const showFixModal = async (maPhim) => {
        try {
            await fetchDataMovieInfo(maPhim);
            setIsFixModalOpen(true);
        } catch (error) {
            console.log(error);
        }
    };
    const hiddenFixModal = () => { setIsFixModalOpen(false); };
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];


    const showAddModal = async (maPhim) => {
        try {
            await fetchDataMovieInfo(maPhim);
            setIsAddModalOpen(true);
        } catch (error) {
            console.log(error);
        }
    };
    const hiddenAddModal = () => { setIsAddModalOpen(false); };
    return (
        <div>
            <div className='ModalFixMovie'>
                <Modal title="Cập nhật Phim" open={isFixModalOpen} onOk={showFixModal}
                    onCancel={hiddenFixModal} width={900} footer={null}
                >
                    <Form className='mx-auto my-5 border p-3 text-center'
                        {...formItemLayout} form={form}
                        name="FormFixMovie" onFinish={handleMovieFix}
                        scrollToFirstError
                    >
                        <Form.Item name="maPhim" label="Mã Phim">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item name="tenPhim" label="Tên Phim"
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
                        <Form.Item name="trailer" label="Trailer"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập trailer của bạn!',
                                    whitespace: true,
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="moTa" label="Mô Tả"
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
                        <Form.Item name="ngayKhoiChieu" label="Ngày Khởi Chiếu"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập ngày khởi chiếu!',
                                },
                            ]}
                        >
                            <DatePicker format={dateFormatList} />
                        </Form.Item>
                        <div className="grid grid-cols-4">
                            <div></div>
                            <Form.Item name="sapChieu" label="Sắp Chiếu" className='flex-auto'>
                                <Switch />
                            </Form.Item>
                            <Form.Item name="dangChieu" label="Đang Chiếu" className='flex-auto'>
                                <Switch />
                            </Form.Item>
                            <Form.Item name="hot" label="Hot" className='flex-auto'>
                                <Switch />
                            </Form.Item>
                        </div>
                        <Form.Item name="maNhom" label="Mã Nhóm"
                            className='hidden'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mã nhóm!',
                                    whitespace: true,
                                },
                            ]}>
                            <Input readOnly />
                        </Form.Item>
                        <Form.Item name="danhGia" label="Đánh Giá">
                            <Input />
                        </Form.Item>
                        <Form.Item name="hinhAnh" label="Hình Ảnh">
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                            {selectedImage && (
                                <Image
                                    src={selectedImage}
                                    alt="Selected Image"
                                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                                />
                            )}
                        </Form.Item>
                        <Button className='btn btn-red mb-1' htmlType="submit">
                            Cập nhật Phim
                        </Button>
                    </Form>
                </Modal>
            </div>
            <div className='ModalAddMovie'>
                <Modal title="Thêm Phim Mới" open={isAddModalOpen} onOk={showAddModal}
                    onCancel={hiddenAddModal} width={900} footer={null}
                >
                    <AddMovie />
                </Modal>
            </div>
            <div className="m-3">
                <div className="text-right mb-2"><button className='btn btn-success' onClick={() => { showAddModal() }}>Thêm Phim Mới</button></div>
                <div className="flex">
                    <Search
                        enterButton size="large" onSearch={fetchDataMovieSearch}
                        placeholder="input search text(phone number/name)"
                        className='bg-blue-500 overflow-hidden rounded-lg'

                    />
                    <button className={`btn btn-danger ${isSearch ? 'block' : 'hidden'}`}
                        onClick={() => { handleSearchCancel() }}>CancleSearch</button>
                </div>
            </div>
            {renderList()}
        </div >
    )
}
