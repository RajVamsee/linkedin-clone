import React, { useState } from 'react'
import './Login.css'
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const dispatch = useDispatch();

    const loginToApp = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // Dispatch the user data to Redux store
                dispatch(
                    login({
                        email: user.email,
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    })
                );
            })
            .catch((error) => {
                console.error(error);
                alert(error.message);
            });
    };
    const register = () => {
        if (!name || !email || !password) {
            return alert('Please enter all required fields!');
        }
        //const authInstance = getAuth(auth);
        createUserWithEmailAndPassword(auth, email, password) // Create user with email and password
            .then((userCredential) => {
                const user = userCredential.user;

                updateProfile(user, {
                    displayName: name,
                    photoURL: profilePic
                }).then(() => {
                    // Dispatch the user data to Redux store
                    dispatch(
                        login({
                            email: user.email,
                            uid: user.uid,
                            displayName: user.displayName,
                            photoURL: user.photoURL,
                        })
                    );
                });
            })
            .catch((error) => {
                console.error(error);
                alert(error.message);
            });
    };


    return (
        <div className='login'>
            <img src='loginLinkedIn.png' alt='' />
            <form>
                <input value={name} onChange={e => setName(e.target.value)} placeholder='Full name (required if registering)' type='text' />
                <input value={profilePic} onChange={e => setProfilePic(e.target.value)} placeholder='Profile pic URL (optional)' type='text' />
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' type='email' />
                <input value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' type='password' />
                <button type='submit' onClick={loginToApp}>Sign In</button>
            </form>
            <p>Not a member?{" "}
                <span className='login__register' onClick={register}>Register Now</span>
            </p>
        </div>
    )
}

export default Login
