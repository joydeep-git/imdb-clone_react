import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "../SCSS/Profile.scss";

import { useFirebaseContext } from '../context/FirebaseContext';

const Profile = () => {

    const navigate = useNavigate();

    const { authenticated, userData,
        handleDeleteAccount, signOutUser } = useFirebaseContext();

    const [del, setDel] = useState(false);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (!authenticated) {
            navigate("/login");
        }
    }, [authenticated, navigate]);

    if (!authenticated || userData === null) {
        return <h1 className='text-center text-white text-3xl'>Loading....</h1>
    }

    return (
        <div className='Profile'>

            <form>
                <section>
                    <h1 className='rag'>PROFILE</h1>
                </section>

                {userData && (
                    <div className="data">
                        <div className='data-input'>
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" disabled value={userData.name} />
                        </div>

                        <div className='data-input'>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" disabled value={userData.email} />
                        </div>

                        <div className='data-input'>
                            <label htmlFor="number">Number</label>
                            <input type="number" name="number" disabled value={userData.number} />
                        </div>
                    </div>
                )}

                <div className='buttons'>
                    <button
                        onClick={() => navigate("/edit")}
                        className='button'>
                        EDIT ACCOUNT
                    </button>

                    {
                        !edit
                            ? <button
                                className='button red-btn'
                                onClick={() => setEdit(true)}>
                                SIGN OUT
                            </button>

                            : <div className='deleteBtn'>

                                <button
                                    className='button red-btn'
                                    onClick={signOutUser} >
                                    CONFIRM
                                </button>

                                <button
                                    className='button green-btn' onClick={() => setEdit(false)}>
                                    CANCEL
                                </button>

                            </div>
                    }

                    {
                        !del
                            ? <button
                                onClick={() => setDel(true)}
                                className='button red-btn' >
                                DELETE ACCOUNT
                            </button>
                            : <div
                                className='deleteBtn'>
                                <button
                                    className='button red-btn'
                                    onClick={() => handleDeleteAccount(userData.email, userData.password)} >
                                    CONFIRM
                                </button>
                                <button
                                    className='button green-btn' onClick={() => setDel(false)}>
                                    CANCEL
                                </button>
                            </div>
                    }
                </div>

            </form>
        </div>
    );
};

export default Profile;