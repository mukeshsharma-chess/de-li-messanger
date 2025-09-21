'use client'

import React, { useEffect } from 'react'
import WorkspaceSidebar from '../WorkSidebar';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { loadState } from '@/utils/localstorage';
import { fetchWorkSpaceAction } from '@/redux/actions/workSpaceAction';

const ParentSidebar = () => {

    const dispatch = useDispatch();

    const user = loadState('user')

    const { allWorkSpace, selectedWorkSpace, allChannel, selectedChannel } = useSelector((state) => state.wrokSpace)

    useEffect(() => {
        user && dispatch(fetchWorkSpaceAction())
    },[])

    // console.log("allWorkSpaceallWorkSpace", allWorkSpace)
    // console.log("selectedWorkSpaceselectedWorkSpace", selectedWorkSpace)
    // console.log("allChannelallChannel", allChannel)

  return (
    <>
        <WorkspaceSidebar allWorkSpace = {allWorkSpace} selectedWorkSpace = {selectedWorkSpace}  />
        <Sidebar user = {user} allChannel = {allChannel} selectedChannel = {selectedChannel} selectedWorkSpaceId={selectedWorkSpace?.id}  />
    </>
  )
}

export default ParentSidebar;