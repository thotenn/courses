import React from "react";
import GoBack from "./GoBack";

const NavBar = () => {
    return (
        <div
            className="sticky top-0 flex flex-wrap items-left"
        >
            <GoBack />
        </div>
    )
}

export default NavBar;