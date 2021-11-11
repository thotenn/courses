import React from "react";

const LoaderSpinner = ({active, size='5'}) => {
    // const sizeStr = ` h-${size} w-${size}`;
    return (
        <div className="flex justify-center items-center">
            <div
                className={"animate-spin rounded-full border-b-2 border-gray-900 h-5 w-5 "}
            ></div>
        </div>
    )
}

export default LoaderSpinner;