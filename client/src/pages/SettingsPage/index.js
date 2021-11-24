import React from 'react';
import Topbar from '../../components/Topbar';
import Sidebar from '../../components/Sidebar';

function Settings() {
    return (
        <div>
            <Topbar />
            <div className="main__body">
                <Sidebar />
                <h4 style={{ marginTop: 50 }}>This is Settings page</h4>
            </div>
        </div>
    );
}

export default Settings;
