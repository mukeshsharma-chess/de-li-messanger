'use client'

import React, { useEffect, useState } from 'react'
import WorkspaceSidebar from '../WorkSidebar';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { loadState } from '@/utils/localstorage';
import { fetchWorkSpaceAction } from '@/redux/actions/workSpaceAction';

const ParentSidebar = () => {

    const dispatch = useDispatch();
    const [user, setUser] = useState(null);

    const { allWorkSpace, selectedWorkSpace, allChannel, selectedChannel } = 
      useSelector((state) => state.wrokSpace)

    useEffect(() => {
        const storedUser = loadState('user');
        setUser(storedUser);

        if (storedUser) {
            dispatch(fetchWorkSpaceAction());
        }
    }, [dispatch]);

  if (!user) return null; // 👈 Important

  return (
    <>
        <WorkspaceSidebar 
          allWorkSpace={allWorkSpace} 
          selectedWorkSpace={selectedWorkSpace}  
        />
        <Sidebar 
          user={user} 
          allChannel={allChannel} 
          selectedChannel={selectedChannel} 
          selectedWorkSpaceId={selectedWorkSpace?.id}  
        />
    </>
  )
}

export default ParentSidebar;