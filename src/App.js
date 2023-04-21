import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AppContext } from "./context/contextApi";

import Header from "./components/Header";
import Feed from "./components/Feed";
// import LeftNav from "./components/LeftNav";
// import LeftNavMenuItem from "./components/LeftNavMenuItem";
import SearchResult from "./components/SearchResult";
// import SearchResultVideo from "./components/SearchResultVideo";
// import VideoCard from "./components/VideoCard";
import VideoDetails from "./components/VideoDetails";

function App() {
  return (
    <AppContext>
      <Router>
        <div className="flex flex-col h-full">
          <Header />
          <Routes>
            <Route path="/" exact element={<Feed />} />
            <Route path="/searchResult:/searchQuery" element={<SearchResult />} />
            <Route path="/video/:id" element={<VideoDetails />} />
          </Routes>
        </div>
      </Router>
    </AppContext>
  );
}
export default App;