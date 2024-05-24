import React, { useEffect, useState } from 'react'
import './Feed.css'
import InputOptions from './InputOptions';
import Post from './Post';
import CreateIcon from '@mui/icons-material/Create';
import ImageIcon from '@mui/icons-material/Image';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import "firebase/firestore";
import { db } from './firebase';
import { getDocs, collection, serverTimestamp, orderBy, addDoc, query } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import FlipMove from 'react-flip-move';

function Feed() {
    const user = useSelector(selectUser);
    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);


    const fetchData = async () => {
        try {
            const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
            const snapshot = await getDocs(q);
            const postData = snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }));
            setPosts(postData);
            console.log(postData);
        } catch (error) {
            console.error("Error getting documents: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const sendPost = async (e, input) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'posts'), {
                name: user.displayName,
                description: user.email,
                message: input,
                photoUrl: user.photoURL || ' ',
                timestamp: serverTimestamp()
            });
            console.log('Post added successfully!');
            fetchData();
        } catch (error) {
            console.error('Error adding post: ', error);
        }
        setInput("");
    };

    return (
        <div className='feed'>
            <div className='feed__inputContainer'>
                <div className='feed__input'>
                    <CreateIcon />
                    <form onSubmit={(e) => sendPost(e, input)}>
                        <input value={input} onChange={e => setInput(e.target.value)} type='text'></input>
                        <button type='submit'>Send</button>
                    </form>
                </div>
                <div className='feed__inputOptions'>
                    <InputOptions Icon={ImageIcon} title='Photo' color='#70B5F9' />
                    <InputOptions Icon={SubscriptionsIcon} title='Video' color='#E7A33E' />
                    <InputOptions Icon={EventNoteIcon} title='Event' color='#C0CBCD' />
                    <InputOptions Icon={CalendarViewDayIcon} title='Write article' color='#7FC15E' />
                </div>
            </div>
            <FlipMove>
                {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
                    <Post
                        key={id}
                        name={name}
                        description={description}
                        message={message}
                        photoUrl={photoUrl}
                    />
                ))}
            </FlipMove>
        </div>
    );
}

export default Feed

