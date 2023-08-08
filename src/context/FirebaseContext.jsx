import { createContext, useState, useEffect, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyD32JQGqZoSWgzuETFxCMpKdA0t8c6ahe8",
    authDomain: "clone-fdb69.firebaseapp.com",
    databaseURL: "https://clone-fdb69-default-rtdb.firebaseio.com",
    projectId: "clone-fdb69",
    storageBucket: "clone-fdb69.appspot.com",
    messagingSenderId: "712689308759",
    appId: "1:712689308759:web:dbf2b7f20cfb6d3def7f12",
    measurementId: "G-1EKJFD030Z"
};

// Initializing firebase app
const firebase = initializeApp(firebaseConfig);

// Creating context
const FirebaseContext = createContext(null);

// Custom hook to use FirebaseContext
export const useFirebaseContext = () => useContext(FirebaseContext);

// Initializing firebase services
const firebaseAuth = getAuth(firebase);
const firebaseDatabase = getDatabase(firebase);

export const FirebaseProvider = ({ children }) => {

    // Creating states to store data and know authentication status
    const [userData, setUserData] = useState(null);
    const [userFirebaseData, setUserFirebaseData] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [videoIds, setVideoIds] = useState([]);
    const [error, setError] = useState(null);
    const [userFirebaseId, setUserFirebaseId] = useState(null);
    const [newUserData, setNewUserData] = useState(null);
    const [userLoginData, setUserLoginData] = useState(null);
    const [userSignUpData, setUserSignUpData] = useState({
        name: "",
        email: "",
        number: "",
        password: "",
    });

    // SHOWING ERRORS
    useEffect(() => {
        if (error !== null) {
            alert(error);
            setError(null);
        }
    }, [error]);

    // Extracting user's ID
    useEffect(() => {
        if (userFirebaseData !== null) {
            setUserFirebaseId(userFirebaseData.uid);
        } else {
            setUserFirebaseId(null);
        }
    }, [userFirebaseData]);

    // USER SIGNUP
    const signUpUser = (em, pass) => {
        createUserWithEmailAndPassword(firebaseAuth, em, pass)
            .catch((err) => {
                setError(err);
            })
    };

    // USER SIGNIN
    const signInUser = (em, pass) => {
        signInWithEmailAndPassword(firebaseAuth, em, pass)
            .catch((err) => {
                setError(err);
            })
    };

    // checking authentication status
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setAuthenticated(true);
                setUserFirebaseData(user);
            } else {
                setAuthenticated(false);
                setUserFirebaseData(null);
                setUserData(null);
            }
        });
        return () => unsubscribe();
    }, []);

    // FETCHING PROFILE DATA FROM FIREBASE
    useEffect(() => {
        if (userFirebaseData && userFirebaseId) {
            onValue(ref(firebaseDatabase, `users/${userFirebaseId}/profile`), (snapshot) => {
                if (snapshot.exists()) {
                    const fetchedData = snapshot.val();
                    setUserData(fetchedData);
                } else {
                    setUserData(null);
                }
            });
        }
    }, [userFirebaseData, userFirebaseId]);

    const updateUserData = () => {
        setUserData(newUserData);
    }

    // SAVING USER DATA IN FIREBASE
    useEffect(() => {
        if (authenticated && userFirebaseData !== null && userData !== null) {
            if (userFirebaseId) {
                if (userData.name !== userFirebaseData.displayName) {
                    set(ref(firebaseDatabase, `users/${userFirebaseId}/profile`), {
                        ...userData,
                    });
                }
            }
        }
    }, [authenticated, userFirebaseData, userData, userFirebaseId]);

    // SAVING VIDEO IDs DATA IN FIREBASE
    useEffect(() => {
        if (authenticated && userFirebaseId && videoIds.length > 0) {
            try {
                const uniqueVideoIds = [...new Set(videoIds)];
                set(ref(firebaseDatabase, `users/${userFirebaseId}/videoids`), uniqueVideoIds);
            } catch (error) {
                console.log("Error sending data to the Realtime Database:", error);
            }
        }
    }, [userFirebaseId, videoIds, authenticated]);

    // FETCHING VIDEO IDs FROM FIREBASE
    useEffect(() => {
        if (authenticated && userFirebaseId) {
            const videoIdsRef = ref(firebaseDatabase, `users/${userFirebaseId}/videoids`);
            onValue(videoIdsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setVideoIds([...new Set(data)]);
                }
            });
        }
    }, [authenticated, userFirebaseId]);

    const signOutUser = () => {
        if (authenticated) {
            signOut(firebaseAuth)
                .then(() => {
                    setAuthenticated(false);
                    setUserFirebaseData(null);
                    setUserData(null);
                    setError(null);
                })
                .catch((error) => {
                    setError("Error signing out: " + error.message);
                });
        }
    };

    const deleteHistory = (id) => {
        const filteredData = videoIds.filter((ids) => id !== ids);
        setVideoIds(filteredData);
    };

    return (
        <FirebaseContext.Provider value={{
            signUpUser, signInUser, signOutUser,
            authenticated, setAuthenticated,
            userData, setUserData,
            videoIds, setVideoIds,
            deleteHistory, 
            newUserData, setNewUserData,
            userSignUpData, setUserSignUpData,
            userLoginData, setUserLoginData,
            updateUserData
        }}>
            {children}
        </FirebaseContext.Provider>
    );
};
