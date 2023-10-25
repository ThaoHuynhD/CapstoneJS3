import React from 'react'
import SliderMovie from './SliderMovie';
import MovieList from './MovieList';
import ShowTimeListByTheater from './ShowTimeListByTheater';
import MovieFilterByName from './MovieFilterByName';

export default function HomePage() {
    return (
        <div className='mt-20'>
            <div id='movieBanner'><SliderMovie /></div>
            <div><MovieFilterByName /></div>
            <div id='schedule'><MovieList /></div>
            <div id='groupcinema'><ShowTimeListByTheater /></div>
            <div id='news'>news</div>
            <div id='app'>app</div>
        </div>
    )
}
