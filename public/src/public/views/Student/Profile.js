import React from 'react'
import { ProfileCardOne } from '../../../plugins/windreact/src/cmp/Dashboard'
import TableProject from '../../../plugins/windreact/src/cmp/Tables/TableProject';

const Profile = () => {
    return (
        <div className="h-screen">
            <ProfileCardOne
                name="Jose Enrique"
                desc="lorem insput"
            >
                <TableProject/>
            </ProfileCardOne>
        </div>
    )
}

export default Profile;