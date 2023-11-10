import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select, message, DatePicker, TimePicker, Modal } from 'antd';
import { getMovieDetail, getMovieList, getTheaterByTheaterGroup, getTheaterGroup } from '../../../api/mainApi';
import { getShowTimeCreate } from '../../../api/adminApi';
import ShowTimeListByMovie from '../../guest/MovieDetailPage/ShowTimeListByMovie';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import moment from 'moment';
import MovieInformation from './MovieInformation'



export default function ShowTimeManagement({ selectedMaPhim }) {
    const [movieList, setMovieList] = useState([]);
    const [movieSelected, setMovieSelected] = useState(selectedMaPhim !== null ? selectedMaPhim : '13189');
    const [theaterGroupList, setTheaterGroupList] = useState([]);
    const [theaterList, setTheaterList] = useState([]);

    const [theaterGroupSelected, setTheaterGroupSelected] = useState(null);
    const [theaterSelected, setTheaterSelected] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();
    const formItemLayout = {
        labelCol: { xs: { span: 24, }, sm: { span: 8, }, },
        wrapperCol: { xs: { span: 24, }, sm: { span: 16, }, },
    };
    dayjs.extend(customParseFormat);

    const movieArr = [];
    const theaterGroupArr = [];
    const theaterArr = [];

    //gán giá trị cho các state
    const handleMovieSelection = (movieSelected) => {
        setMovieSelected(movieSelected);
        setTheaterGroupSelected(null);
        setTheaterSelected(null);
    };
    const handleTheaterGroupSelection = (theaterGroupSelected) => {
        setTheaterGroupSelected(theaterGroupSelected);
        setTheaterSelected(null);
    };
    const handleTheaterSelection = (theaterSelected) => {
        setTheaterSelected(theaterSelected);
    };

    let fetchDataMovieList = async () => {
        try {
            let response = await getMovieList();
            setMovieList(response.data.content);
        } catch {
            message.error("Đã có lỗi xảy ra");
        }
    };

    let fetchDataTheaterGroupList = async () => {
        try {
            let response = await getTheaterGroup();
            setTheaterGroupList(response.data.content);
        } catch {
            message.error("Đã có lỗi xảy ra");
        }
    };

    let fetchDataTheaterList = async (theaterGroupSelected) => {
        if (theaterGroupSelected === null) return;
        try {
            let response = await getTheaterByTheaterGroup(theaterGroupSelected);
            setTheaterList(response.data.content);
        } catch {
            message.error("Đã có lỗi xảy ra");
        }
    };
    useEffect(() => {
        fetchDataMovieList();
        fetchDataTheaterGroupList();
    }, []);
    useEffect(() => {
        fetchDataTheaterList(theaterGroupSelected)
    }, [theaterGroupSelected]);

    // Cập nhật các danh sách

    movieList.forEach((movie) => {
        const movieUpdate = {
            value: movie.maPhim,
            label: `${movie.tenPhim} - ${movie.maPhim}`,
        }
        movieArr.push(movieUpdate);
    })

    theaterGroupList.forEach((theaterGroup) => {
        const TheaterGroupUpdate = {
            value: theaterGroup.maHeThongRap,
            label: theaterGroup.tenHeThongRap,
        }
        theaterGroupArr.push(TheaterGroupUpdate);

        theaterList.forEach((theater) => {
            if (theaterGroup.maHeThongRap === theaterGroupSelected) {
                const theaterUpdate = {
                    value: theater.maCumRap,
                    label: theater.tenCumRap,
                }
                theaterArr.push(theaterUpdate);
            }
        })
    })


    const handleAddShowTime = async (values) => {
        let ngayChieuGioChieu = moment(values.ngayChieu).format('DD-MM-YYYY') + ' ' + moment(values.gioChieu).format('HH:mm:ss')
        let showTimeUpdate = {
            maPhim: movieSelected,
            maRap: theaterSelected,
            ngayChieuGioChieu: ngayChieuGioChieu,
            giaVe: values.giaVe,
        }
        try {
            await getShowTimeCreate(showTimeUpdate);
            message.success("Tạo Lịch Chiếu thành công");
            hiddenModal();
        } catch (error) {
            message.error("Đã có lỗi xảy ra");
            console.log(error);
        }
    };

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
            form.setFieldsValue(updatedMovie);
        } catch (error) {
            message.error("Đã có lỗi xảy ra");
            console.log(error.response.data);
        }
    };
    const showModal = (maPhim) => {
        fetchDataMovieInfo(maPhim);
        setIsModalOpen(true);
    };
    const hiddenModal = () => { setIsModalOpen(false); };
    return (
        <div>
            <div className='grid grid-cols-2'>
                <div>
                    <Select
                        defaultValue="Chọn Phim Khác"
                        style={{
                            width: 250, margin: 20
                        }}
                        options={movieArr}
                        onChange={handleMovieSelection}
                    />
                    <MovieInformation maPhim={movieSelected} />
                </div>
                <div>
                    <ShowTimeListByMovie maPhim={movieSelected} />
                    <div className="text-center"><Button className='btn btn-red' onClick={() => { showModal(movieSelected) }}>Tạo Lịch Chiếu Mới</Button></div>
                </div>
            </div>
            <Modal title="Tạo Lịch Chiếu Mới" open={isModalOpen} onOk={showModal}
                onCancel={hiddenModal} width={900} footer={null}
            >
                <Form className='mx-auto my-5 border p-5'
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={handleAddShowTime}
                    style={{
                        maxWidth: 800,
                    }}
                    scrollToFirstError
                >
                    <Form.Item name="maHeThongRap" label="Mã Hệ Thống Rạp">
                        <Select
                            defaultValue="Chọn Hệ Thống Rạp"
                            options={theaterGroupArr}
                            onChange={handleTheaterGroupSelection}
                        />
                    </Form.Item>
                    <Form.Item name="maCumRap" label="Mã Cụm Rạp">
                        <Select
                            options={theaterArr}
                            onChange={handleTheaterSelection}
                            disabled={theaterGroupSelected === null}
                            value={{
                                label: theaterSelected === null ? 'Chọn Cụm Rạp' : theaterSelected,
                                value: theaterSelected
                            }}
                        />
                    </Form.Item>
                    <div className='flex flex-auto'>
                        <div className='w-32 mr-2'></div>
                        <Form.Item name="ngayChieu"
                            label="Ngày Chiếu"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập ngày Chiếu!',
                                },
                            ]}
                        >
                            <DatePicker
                                size="large"
                                format="YYYY-MM-DD"
                                className='mx-2'
                            />
                        </Form.Item>
                        <Form.Item name="gioChieu"
                            label="Giờ Chiếu"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập giờ Chiếu!',
                                },
                            ]}
                        >
                            <TimePicker
                                size="large"
                                format="HH:mm"
                            />
                        </Form.Item>
                    </div>
                    <Form.Item name="giaVe"
                        label="Giá Vé"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập giá vé!',
                                whitespace: true,
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <div className='text-center'>
                        <Button className='btn btn-red' htmlType="submit">
                            Tạo Lịch Chiếu
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}
