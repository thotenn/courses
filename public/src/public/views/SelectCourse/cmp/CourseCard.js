import React from 'react'

const CourseCard = ({ title, description, imgsource, cb, value }) => {
    return (
        <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-2 mx-5">
            {imgsource
                ? <div className="flex justify-center md:justify-end -mt-16">
                    <img className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500" src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" />
                </div>
                : <></>}
            <div>
                <h2 className="text-gray-800 text-3xl font-semibold">{title}</h2>
                <p className="mt-2 font-primarydesc leading-6 my-5 text-3xl text-gray-600">{description}</p>
            </div>
            <div className="flex justify-end mt-4">
                <a
                    href="#"
                    className="text-xl font-craftygirl font-medium text-indigo-500"
                    onClick={() => cb(value)}
                >
                    Seleccionar
                </a>
            </div>
        </div>
    )
}

export default CourseCard;