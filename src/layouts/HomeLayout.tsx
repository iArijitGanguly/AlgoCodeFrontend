// import { useContext, useEffect } from 'react';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
// import { SocketContext } from '../contexts/SocketContext';

interface Props {
    children: React.ReactNode
}

const HomeLayout: React.FC<Props> = ({ children }) => {

    // const { socket } = useContext(SocketContext);
    // useEffect(() => {
    //     socket.emit('user', 8);
    // });
    return (
        <div>
            <Navbar />
            <Sidebar />

            <div>
                { children }
            </div>
        </div>
    );
};

export default HomeLayout;