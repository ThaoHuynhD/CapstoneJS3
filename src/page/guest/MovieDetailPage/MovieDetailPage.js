import React from 'react'
import MovieInfo from './MovieInfo'
import ShowTimeListByMovie from './ShowTimeListByMovie'
import { useParams } from 'react-router-dom';
import MyHeader from '../../../component/MyHeader';

export default function MovieDetailPage() {
  let params = useParams();
  let maPhim = params.maPhim.substring(1, params.maPhim.length);
  return (
    <div>
      <MyHeader />
      <div className='container'>
        <MovieInfo maPhim={maPhim} />
        <ShowTimeListByMovie maPhim={maPhim} />
      </div>
    </div>
  )
}
