import React, { useEffect } from 'react';
import { useFirebaseContext } from '../context/FirebaseContext';
import { useNavigate } from 'react-router-dom';

import "../SCSS/Profile.scss";

const EditPage = () => {

    const navigate = useNavigate();

    const { userData, newUserData, setNewUserData, updateUserData, authenticated } = useFirebaseContext();

    useEffect(() => {
        setNewUserData(userData);
    }, [setNewUserData, userData]);

    const handleUpdateData = (e) => {
        e.preventDefault();

        const alert = document.getElementById("alert");

        const { name, number } = newUserData;

        if (name === "") {
            alert.className = "alert";
            alert.innerText = "Please enter your name";
            return;
        } else if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(name)) {
            alert.className = "alert";
            alert.innerText = "Please enter a valid name";
            return;
        } else if (number === "") {
            alert.className = "alert";
            alert.innerText = "Please enter your number";
            return;
        } else if (number.length !== 10) {
            alert.className = "alert";
            alert.innerText = "Please enter valid number";
            return;
        } else {
            alert.classList.remove("alert");
            alert.innerText = null;

            updateUserData();

            navigate("/profile");
        }
    }

    useEffect(() => {
        if (!authenticated) {
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        }
    }, [authenticated, navigate]);

    if (!authenticated) {
        return <div><h1>Loading....</h1></div>
    }

    return (
        <div className="Profile">

            {newUserData && (
                <form>

                    <section>
                        <h3 className='reg'>Edit</h3>
                        <p className='alert' id='alert'></p>
                    </section>

                    <div className="data">
                        <div className='data-input'>
                            <label htmlFor="name">Change name</label>
                            <input
                                type="text"
                                name="name"
                                value={newUserData.name}
                                onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                            />
                        </div>

                        <div className='data-input'>
                            <label htmlFor="number">Change Number</label>
                            <input
                                type="number"
                                name="number"
                                value={newUserData.number}
                                onChange={(e) => setNewUserData({ ...newUserData, number: e.target.value })}
                            />
                        </div>

                    </div>
                    <div className='buttons'>
                        <button className='green-btn button' onClick={handleUpdateData}>SAVE CHANGES</button>
                        <button className='red-btn button' onClick={() => navigate("/profile")}>CANCEL</button>
                    </div>
                </form>

            )}
        </div>
    )
}

export default EditPage;