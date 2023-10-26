import React from 'react'
import SliderMovie from './SliderMovie';
import MovieList from './MovieList';
import ShowTimeListByTheater from './ShowTimeListByTheater';
import MovieFilterByName from './MovieFilterByName';
import MyHeader from '../../../component/MyHeader';

export default function HomePage() {
    return (
        <div>
            <MyHeader />
            <div className='mt-20'>
                <div id='movieBanner'><SliderMovie /></div>
                <div><MovieFilterByName /></div>
                <div id='schedule'><MovieList /></div>
                <div id='groupcinema'><ShowTimeListByTheater /></div>
                <div id='news'>news</div>
                <div id='app'>app</div>
            </div>
        </div>
    )
}
