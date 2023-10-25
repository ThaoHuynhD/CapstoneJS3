import { Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { getShowTimeByTheaterGroup } from '../../../api/mainApi';
import { NavLink } from 'react-router-dom';

export default function MovieFilterByName() {
    const [theatherGroupList, setTheatherGroupList] = useState([]);
    const [theatherSelected, setTheatherSelected] = useState(null);
    const [movieSelected, setMovieSelected] = useState(null);
    const [showSelected, setShowSelected] = useState(null);

    const movieNameArr = [];
    const movieTheatherArr = [];
    const movieShowTimeArr = [];

    //gán giá trị cho các state
    const handleMovieSelection = (movieSelected) => {
        setMovieSelected(movieSelected);
    };
    const handleTheatherSelection = (theatherSelected) => {
        setTheatherSelected(theatherSelected);
    };
    const handleShowSelection = (showSelected) => {
        setShowSelected(showSelected);
    };

    // lấy danh sách rạp bằng axios
    let fetchDataTheatherList = async () => {
        try {
            let response = await getShowTimeByTheaterGroup();
            setTheatherGroupList(response.data.content);
        } catch {
            message.error("Đã có lỗi xảy ra");
        }
    };
    useEffect(() => { fetchDataTheatherList(); }, []);

    // Cập nhật các danh sách
    theatherGroupList.forEach(theatherGroup => {
        theatherGroup.lstCumRap
            .filter(theather => theather.maCumRap !== 'glx-nguyen-du\r\n')
            .forEach(theather => {
                theather.danhSachPhim.forEach((movie) => {
                    // Thêm danh sách phim
                    const movieUpdate = {
                        value: movie.maPhim,
                        label: `${movie.tenPhim} - ${movie.maPhim}`,
                    }
                    if (!movieNameArr.some((existingMovie) => existingMovie.value === movieUpdate.value)) {
                        movieNameArr.push(movieUpdate);
                    }
                    // Thêm danh sách rạp chiếu
                    if (movie.maPhim === movieSelected) {
                        const theatherUpdate = {
                            value: theather.maCumRap,
                            label: theather.tenCumRap,
                        }
                        movieTheatherArr.push(theatherUpdate);

                        // Thêm danh sách lịch chiếu
                        movie.lstLichChieuTheoPhim.forEach(show => {
                            if (theather.maCumRap === theatherSelected) {
                                const showUpdate = {
                                    value: show.maLichChieu,
                                    label: `${show.ngayChieuGioChieu.substring(0, 10)} - ${show.ngayChieuGioChieu.substring(14, 20)}`,
                                }
                                movieShowTimeArr.push(showUpdate);
                            }
                        })
                    }
                });
            })
    })
    return (
        <div className="container pt-5 mx-auto">
            <Space wrap>
                <Select
                    defaultValue="Chọn Phim"
                    style={{
                        width: 200,
                    }}
                    options={movieNameArr}
                    onChange={handleMovieSelection}
                />
                <Select
                    defaultValue="Chọn Rạp Phim"
                    style={{
                        width: 200,
                    }}
                    options={movieTheatherArr}
                    onChange={handleTheatherSelection}
                    disabled={movieSelected === null ? true : false}
                />
                <Select
                    defaultValue="Chọn Suất Chiếu"
                    style={{
                        width: 200,
                    }}
                    options={movieShowTimeArr}
                    onChange={handleShowSelection}
                    disabled={theatherSelected === null ? true : false}
                />
                <NavLink to={`/purchasing/:${showSelected}`}>
                    <button
                        className='btn btn-red m-3'
                        disabled={showSelected === null ? true : false}
                    >Mua Vé</button>
                </NavLink>
            </Space>
        </div>
    );
}
