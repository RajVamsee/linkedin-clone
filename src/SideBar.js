import React from 'react';
import './SideBar.css';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

function SideBar() {

    const user = useSelector(selectUser);

    const recentItem = (topic) => (
        <div className='sideBar__RecentItem'>
            <span className='sideBar__Hash'>#</span>
            <p>{topic}</p>
        </div>
    )

    return (
        <div className='sideBar'>
            <div className='sideBar__Top'>
                <img src='accenture.png' alt='' />
                <Avatar src= {user.photoURL} className='sideBar__Avatar'>{user.email[0]}</Avatar>
                <h2>{user.displayName}</h2>
                <h4>{user.email}</h4>
            </div>
            <div className='sideBar__Stats'>
                <div className='sideBar__Stat'>
                    <p>Who viewed you</p>
                    <p className='sideBar__StatNumber'>831</p>
                </div>
                <div className='sideBar__Stat'>
                    <p>Views on post</p>
                    <p className='sideBar__StatNumber'>143</p>
                </div>
            </div>
            <div className='sideBar__Bottom'>
                <p>Recent</p>
                {recentItem("amazonjobs")}
                {recentItem("stmarys")}
                {recentItem("riskanalyst")}
                {recentItem("masters")}
                {recentItem("informationsystems")}
            </div>
        </div>
    )
}

export default SideBar
