import React, { useState, useEffect, createContext } from "react";

import { fetchDataFromApi } from "../utils/api";

export const Context = createContext();

export const AppContext = (props) => {
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState(false);
    const [selectedCatagories, setSelectedCatagories] = useState("New");
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        fetchSelectedCatagoryData(selectedCatagories);
    }, [selectedCatagories]);

    const fetchSelectedCatagoryData = (query) => {
        setLoading(true)
        fetchDataFromApi(`search/?q=${query}`).then((res) => {
            console.log(res);
        })
    }

    return (
        <Context.Provider value={{
            loading, setLoading, searchResults, selectedCatagories, setSelectedCatagories, mobileMenu, setMobileMenu
        }}>
            {props.children}
        </Context.Provider>
    )
}