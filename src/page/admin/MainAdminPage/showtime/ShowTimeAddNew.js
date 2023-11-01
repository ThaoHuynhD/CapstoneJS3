import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, message, DatePicker, TimePicker } from 'antd';
import { getMovieList, getTheaterByTheaterGroup, getTheaterGroup } from '../../../../api/mainApi';
import MovieInfo from '../../../guest/MovieDetailPage/MovieInfo';
import { getShowTimeCreate } from '../../../../api/adminApi';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import moment from 'moment';

export default function ShowTimeAddNew({ maPhim }) {
    const [movieList, setMovieList] = useState([]);
    const [movieSelected, setMovieSelected] = useState([maPhim]);
    const [theaterGroupList, setTheaterGroupList] = useState([]);
    const [theaterGroupSelected, setTheaterGroupSelected] = useState(null);
    const [theaterList, setTheaterList] = useState([]);
    const [theaterSelected, setTheaterSelected] = useState(null);
    const [form] = Form.useForm();
    const formItemLayout = {
        labelCol: { xs: { span: 24, }, sm: { span: 8, }, },
        wrapperCol: { xs: { span: 24, }, sm: { span: 16, }, },
    };
    dayjs.extend(customParseFormat);
    const movieArr = [];
    const theaterGroupArr = [];
    const theaterArr = [];
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

    let fetchDataTheaterList = async () => {
        if (!theaterGroupSelected) return;
        try {
            let response = await getTheaterByTheaterGroup(theaterGroupSelected);
            setTheaterList(response.data.content);
        } catch {
            message.error("Đã có lỗi xảy ra");
        }
    };
    useEffect(() => {
        fetchDataMovieList();
    }, []);
    useEffect(() => {
        fetchDataTheaterGroupList();
    }, [movieSelected]);
    useEffect(() => {
        fetchDataTheaterList();
    }, [theaterGroupSelected]);
    //gán giá trị cho các state
    const handleMovieSelection = (movieSelected) => {
        setMovieSelected(movieSelected);
    };
    const handleTheaterGroupSelection = (theaterSelected) => {
        setTheaterGroupSelected(theaterSelected);
    };
    const handleTheaterSelection = (theaterSelected) => {
        setTheaterSelected(theaterSelected);
    };
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
    })

    theaterList.forEach((theater) => {
        const theaterUpdate = {
            value: theater.maCumRap,
            label: theater.tenCumRap,
        }
        theaterArr.push(theaterUpdate);
    })
    const fetchData = async (values) => {
        let ngayChieuGioChieu = moment(values.ngayChieu).format('DD-MM-YYYY') + ' ' + moment(values.gioChieu).format('HH:mm:ss')
        let showTimeUpdate = {
            maPhim: movieSelected,
            maRap: theaterSelected,
            ngayChieuGioChieu: ngayChieuGioChieu,
            giaVe: values.giaVe,
        }
        try {
            console.log("showTimeUpdate: ", showTimeUpdate);
            await getShowTimeCreate(showTimeUpdate);
            message.success("Tạo Lịch Chiếu thành công");
            // setTimeout(() => {
            //     window.location.reload();
            //     window.location.href = "/"
            // }, 1000);
        } catch (error) {
            message.error("Đã có lỗi xảy ra");
            console.log(error);
        }
    };

    const handleAddShowTime = (values) => {
        console.log("values: ", values);
        fetchData(values);
    }
    return (
        <div className="container pt-5 mx-auto">
            <Select
                defaultValue="Chọn Phim"
                style={{
                    width: 250, margin: 20
                }}
                options={movieArr}
                onChange={handleMovieSelection}
            />
            <MovieInfo maPhim={movieSelected} />
            <div className="p-5">
                <Form className='mx-auto my-5 border p-5 text-center'
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
                            style={{
                                width: 250,
                            }}
                            options={theaterGroupArr}
                            onChange={handleTheaterGroupSelection}
                        />
                    </Form.Item>
                    <Form.Item name="maCumRap" label="Mã Cụm Rạp">
                        <Select
                            defaultValue="Chọn Cụm Rạp"
                            style={{
                                width: 250,
                            }}
                            options={theaterArr}
                            onChange={handleTheaterSelection}
                            disabled={theaterGroupSelected === null ? true : false}
                        />
                    </Form.Item>
                    <Form.Item name="ngayChieu"
                        label="ngayChieu"
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
                        label="gioChieu"
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
                    <Button type="primary" htmlType="submit">
                        Tạo Lịch Chiếu
                    </Button>
                </Form>
            </div>
        </div>
    );
}
