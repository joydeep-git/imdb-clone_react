import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AppContext } from "./context/ContextApi";

import Header from "./components/Header";
import Feed from "./components/Feed";
import SearchResult from "./components/SearchResult";
import VideoDetails from "./components/VideoDetails";
import History from "./components/History";
import LeftNav from "./components/LeftNav";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import EditPage from "./components/EditPage";

function App() {
  return (
    <AppContext>
      <Router>
        <div className="flex flex-col h-full">
          <Header />
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/searchResult/:searchQuery" element={<SearchResult />} />
            <Route path="/video/:id" element={<div className="flex"><LeftNav /><VideoDetails /></div>} />
            <Route path="/history" element={<div className="flex"><LeftNav /><History /></div>} />
            <Route path="/profile" element={<div className="flex"><LeftNav /><Profile /></div>} />
            <Route path="/signup" element={<div className="flex"><LeftNav /><SignUp /></div>} />
            <Route path="/login" element={<div className="flex"><LeftNav /><LogIn /></div>} />
            <Route path="/edit" element={<div className="flex"><LeftNav /><EditPage /></div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AppContext>
  );
}

export default App;