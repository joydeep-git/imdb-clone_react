import React, {useContext, useState} from "react";
import LeftNav from "./LeftNav";

function feed() {
    return(
        <div className="h-[calc(100%-56px)] flex flex-row">
            <LeftNav />
        </div>
    )
}

export default feed;
