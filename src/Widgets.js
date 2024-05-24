import React from 'react'
import './Widgets.css'
import InfoIcon from '@mui/icons-material/Info';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function Widgets() {

    const newsArticle = (heading, subtitle) => (
        <div className='widgets__article'>
            <div className='widgets__articleLeft'>
                <FiberManualRecordIcon />
            </div>
            <div className='widgets__articleRight'>
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    );

    return (
        <div className='widgets'>
            <div className='widgets__header'>
                <h2>LinkedIn News</h2>
                <InfoIcon />
            </div>
            {newsArticle("TANUJA VARMA is backk!","Top news - The voice of Hyderabad")}
            {newsArticle("Pet Updates: CUTEST DOG ALERT!","Top news - Junnu steals the show")}
            {newsArticle("Celeb Story: CHARMER ALERT!","Google lady employees go crazy over Raj Vamsee")}
            {newsArticle("No more fancy dressing: Dangerous Goa!","Girl kidnapped for wearing short clothes in Goa")}
        </div>
    )
}

export default Widgets
