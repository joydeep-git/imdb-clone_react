import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AppContext } from "./context/contextApi";

import Header from "./components/Header";
import Feed from "./components/Feed";
import SearchResult from "./components/SearchResult";
import VideoDetails from "./components/VideoDetails";
import History from "./components/History";
import LeftNav from "./components/LeftNav";
import Profile from "./components/Profile";

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
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AppContext>
  );
}

export default App;