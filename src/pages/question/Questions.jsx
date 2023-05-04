import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const Questions = () => {

    const { links } = useSelector(state => state.link)
    console.log(links);
    const navi = useNavigate()
    const param = useParams()

    const [data, setData] = useState([])
    const [find, setFind] = useState({})

    useEffect(() => {
        // question()
        filtervalues()
    }, [find])

    const question = async () => {
        const getdata = await axios.get(`${links}/admin/get`)
        console.log(getdata);
        setData(getdata.data)
        const finddata = data.find(value => value._id == param.id)
        setFind(finddata)
        console.log(finddata);
    }

    const filtervalues = () => {
        const finddata = data.find(value => value._id == param.id)
        setFind(finddata)
        console.log(finddata);
    }
    console.log(find);

    return (
        <div>{param.id}</div>
    )
}

export default Questions