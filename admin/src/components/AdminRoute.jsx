import React from 'react'
import { useEffect, useState } from 'react'
import axios from '../lib/axios'
import { useContext } from 'react'
import {adminContext} from '../context/AdminContext'
import {Outlet, useNavigate} from 'react-router-dom'

const AdminRoute = () => {
    const {backendUrl} = useContext(adminContext)
    const [isAdmin, setIsAdmin] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        const checkIsAdmin = async () => {
            const {data} = axios.get(`${backendUrl}/auth/is-admin`)
           setIsAdmin(data.success)
        }
        checkIsAdmin()
    }, [backendUrl])
    if(isAdmin === null){
        return <div className="">Loading...</div>
    }
    if(isAdmin === false){
        navigate('/signin')
    }
    return <Outlet />
}

export default AdminRoute