import { createContext, useState, useEffect, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAitVENc5zs7csWhAaH-OyK_rQZkySgYkM",
    authDomain: "clone-25bbd.firebaseapp.com",
    databaseURL: "https://clone-25bbd-default-rtdb.firebaseio.com",
    projectId: "clone-25bbd",
    storageBucket: "clone-25bbd.appspot.com",
    messagingSenderId: "328160633124",
    appId: "1:328160633124:web:81e968be73a620c73093b1",
    measurementId: "G-D13B8V03Q3"
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
    const [authenticated, setAuthenticated] = useState(false);
    const [videoIds, setVideoIds] = useState([]);

    // Extracting user's ID
    const userId = userData ? userData.uid : null;

    // Google auth provider
    const googleAuth = new GoogleAuthProvider();

    // Google sign-in function
    const googleSignIn = () => {
        signInWithPopup(firebaseAuth, googleAuth);
        setVideoIds([]);
    };

    // checking authentication status
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setAuthenticated(true);
                setUserData(user);
            } else {
                setAuthenticated(false);
                setUserData(user);
            }
        });
    }, []);

    useEffect(() => {
        if (authenticated && userId && videoIds.length > 0) {
            try {
                const uniqueVideoIds = [...new Set(videoIds)];
                set(ref(firebaseDatabase, `users/${userId}`), uniqueVideoIds);
            } catch (error) {
                console.log("Error sending data to the Realtime Database:", error);
            }
        }
    }, [userId, videoIds, authenticated]);

    useEffect(() => {
        if (authenticated && userId) {
            // Import existing values from the database
            const videoIdsRef = ref(firebaseDatabase, `users/${userId}`);
            onValue(videoIdsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setVideoIds([...new Set(data)]);
                }
            });
        }
    }, [authenticated, userId]);

    const signOutUser = () => {
        signOut(firebaseAuth);
        setAuthenticated(false);
    };

    const deleteHistory = (id) => {
        const filteredData = videoIds.filter((ids) => id !== ids);
        setVideoIds(filteredData);
    };

    return (
        <FirebaseContext.Provider value={{ googleSignIn, authenticated, setAuthenticated, userData, signOutUser, videoIds, setVideoIds, deleteHistory }}>
            {children}
        </FirebaseContext.Provider>
    );
};