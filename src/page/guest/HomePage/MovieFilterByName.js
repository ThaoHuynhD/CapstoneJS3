import React, { useEffect, useState } from 'react';
import { Select, message } from 'antd';
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
        setTheatherSelected(null);
        setShowSelected(null);
    };
    const handleTheatherSelection = (theatherSelected) => {
        setTheatherSelected(theatherSelected);
        setShowSelected(null);
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
                        label: `${movie.tenPhim}`,
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
                                console.log("movieShowTimeArr: ", movieShowTimeArr);
                            }
                        })
                    }
                });
            })
    })
    return (
        <div className='pt-20'>
            <div className=" relative">
                <p className=' absolute -top-6 left-0 text-center w-full'>
                    <span className='px-5 py-3 lg:text-3xl text-2xl mx-auto font-semibold bg-red-700 text-white rounded-lg'
                    >Tìm kiếm lịch chiếu</span>
                </p>
                <div className="container mt-20 pt-12 pb-4 px-8 bg-slate-800 text-center rounded">
                    <div className='grid lg:grid-cols-4 grid-cols-1 gap-8'>
                        <Select
                            defaultValue="Chọn Phim"
                            className='w-full'
                            options={movieNameArr}
                            onChange={handleMovieSelection}
                        />
                        <Select
                            className='w-full'
                            options={movieTheatherArr}
                            onChange={handleTheatherSelection}
                            disabled={movieSelected === null}
                            value={{ label: theatherSelected === null ? "Chọn Rạp Phim" : theatherSelected.tenCumRap, value: theatherSelected }}
                        />
                        <Select
                            className='w-full'
                            options={movieShowTimeArr}
                            onChange={handleShowSelection}
                            disabled={theatherSelected === null}
                            value={{ label: showSelected === null ? "Chọn Suất Chiếu" : showSelected.ngayChieuGioChieu, value: showSelected }}
                        />
                        <NavLink to={`/purchasing/:${showSelected}`}>
                            <button
                                className='btn btn-red w-full'
                                disabled={showSelected === null}
                            >Mua Vé</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
