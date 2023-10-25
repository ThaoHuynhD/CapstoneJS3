import React, { useEffect, useState } from 'react'
import { getMovieList } from '../../../api/mainApi';
import { message } from 'antd';
import { NavLink } from 'react-router-dom';

export default function MovieList() {
    const [movieList, setMovieList] = useState([]);
    let fetchData = async () => {
        try {
            let response = await getMovieList();
            setMovieList(response.data.content);
        } catch {
            message.error("Đã có lỗi xảy ra");
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className='MovieList container mt-5 pt-5'>
            <div className="row">
                {movieList.map((movie, index) => {
                    return (
                        <div className="col-3 p-0" key={index}>
                            <div className='movie_item text-center'>
                                <img src={movie.hinhAnh} alt="" />
                                <h5 className='text-left px-3 pt-3' height={60}>{movie.tenPhim}</h5>
                                <p className='text-left px-3 m-0'>{movie.moTa.substring(0, 50)}
                                    {movie.moTa.length > 50 ? '...' : ''}</p>
                                <p>{movie.maPhim}</p>
                                <NavLink to={`/detail/:${movie.maPhim}`}>
                                    <button type="button" className="btn btn-red m-3">Mua Vé</button>
                                </NavLink>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
