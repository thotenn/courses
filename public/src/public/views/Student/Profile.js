import React from 'react'
import { ProfileCardOne } from '../../../plugins/windreact/src/cmp/Dashboard'
import RowExampleOne from '../../../plugins/windreact/src/cmp/Tables/Rows/RowExampleOne';
import TableProject from '../../../plugins/windreact/src/cmp/Tables/TableProject';
import TableProjectFour from '../../../plugins/windreact/src/cmp/Tables/TableProjectFour';
import TableProjectSecond from '../../../plugins/windreact/src/cmp/Tables/TableProjectSecond';
import TableProjectThree from '../../../plugins/windreact/src/cmp/Tables/TableProjectThree';

const dataExample = [
    {
        img: "https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        name: "Joseph One",
        desc: "Programmer",
        age: "25",
        status: "Acceptable",
        date: "17/10/1995",
        statusClass: "text-green-700 bg-green-100 "
    },
    {
        img: "https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        name: "Joseph Two",
        desc: "Programmer",
        age: "25",
        status: "Acceptable",
        date: "17/10/1995",
        statusClass: "text-green-700 bg-green-100 "
    },
    {
        img: "https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        name: "Joseph 3",
        desc: "Programmer",
        age: "25",
        status: "Acceptable",
        date: "17/10/1995",
        statusClass: "text-green-700 bg-green-100 "
    },
    {
        img: "https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        name: "Joseph 4",
        desc: "Programmer",
        age: "25",
        status: "Acceptable",
        date: "17/10/1995",
        statusClass: "text-green-700 bg-green-100 "
    },
    {
        img: "https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        name: "Joseph 5",
        desc: "Programmer",
        age: "25",
        status: "Acceptable",
        date: "17/10/1995",
        statusClass: "text-green-700 bg-green-100 "
    },
    {
        img: "https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        name: "Joseph",
        desc: "Programmer",
        age: "25",
        status: "Acceptable",
        date: "17/10/1995",
        statusClass: "text-green-700 bg-green-100 "
    },
    {
        img: "https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        name: "Joseph",
        desc: "Programmer",
        age: "25",
        status: "Acceptable",
        date: "17/10/1995",
        statusClass: "text-green-700 bg-green-100 "
    },
    {
        img: "https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        name: "Joseph",
        desc: "Programmer",
        age: "25",
        status: "Innacceptable",
        date: "17/10/1995",
        statusClass: "text-red-700 bg-red-100"
    },
    {
        img: "https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        name: "Joseph",
        desc: "Programmer",
        age: "25",
        status: "Pending",
        date: "17/10/1995",
        statusClass: "text-orange-700 bg-gray-100"
    },
    {
        img: "https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        name: "Joseph",
        desc: "Programmer",
        age: "25",
        status: "Acceptable",
        date: "17/10/1995",
        statusClass: "text-green-700 bg-green-100 "
    },
]


const Profile = () => {
    return (
        <div className="flex h-screen">
            <div className="flex w-screen ">
                <ProfileCardOne
                    name="Jose Enrique"
                    desc="lorem insput"
                >
                    <div className="flex w-11/12 overflow-y-scroll">
                        
                        {/* <TableProject extra=""/> */}
                        {/* <TableProjectSecond
                            data={dataExample}
                            RowCmp={RowExampleOne}
                        /> */}
                        {/* <TableProjectFour /> */}
                    </div>
                </ProfileCardOne>
            </div>
        </div>
    )
}

export default Profile;