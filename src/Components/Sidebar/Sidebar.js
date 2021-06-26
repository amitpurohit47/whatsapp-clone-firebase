import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import {Avatar,IconButton} from '@material-ui/core';
import { DonutLarge,Chat, MoreVert, SearchOutlined } from '@material-ui/icons';
import Sidebarchat from './Sidebarchat/Sidebarchat';
import db from '../../firebase';
import Loader from '../Loader/Loader';
import { useStateValue } from '../../StateProvider/StateProvider';

function Sidebar() {

    const [groups,setGroups] = useState([]);
    const [isLoading,setLoading] = useState(true);
    const [{user},dispatch] = useStateValue();

    useEffect(()=>{
        const unsubscribe = db.collection('groups').onSnapshot(snapshot => setGroups(
            snapshot.docs.map( doc => {
                // console.log(doc.data.name);
                return ({
                    id : doc.id,
                    data : doc.data()
                })
            })
        ));
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        // console.log(groups);

        return () => {
            unsubscribe(); // detaches the listener for retrieving data for optimization
        }
    },[]);

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <Chat />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start a new chat" type="text" />
                </div>
            </div>
            <div className="sidebar_chats">
                <Sidebarchat addNewChat/>
                {isLoading ? <Loader /> : groups.map(group => <Sidebarchat key={group.id} id={group.id} name={group.data.name} />)}

            </div>
        </div>
    )
}

export default Sidebar
