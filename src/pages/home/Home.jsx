import React, { useEffect, useState } from 'react'
import classes from './Home.module.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const { links } = useSelector(state => state.link)
    console.log(links);
    const navi = useNavigate()

    const [data, setData] = useState([])

    useEffect(() => {
        question()
    }, [])

    const question = async () => {
        const getdata = await axios.get(`${links}/admin/get`)
        console.log(getdata);
        setData(getdata.data)
    }
    // const handleclick = (id) => {
    //     navi(`question/${id}`)
    // }

    return (
        <div>
            {
                data.map((value) => {
                    return (
                        <div>

                            <div onClick={() => {
                                navi(`question/${value._id}`)
                            }}>
                                {value.topic}
                            </div>
                        </div>
                    )
                })
            }
        </div >
    )
}

export default Home