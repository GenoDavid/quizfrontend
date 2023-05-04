import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const Questions = () => {

    const { links } = useSelector(state => state.link)
    // console.log(links);
    const navi = useNavigate()
    const param = useParams()

    // const [data, setData] = useState([])
    // const [find, setFind] = useState({})

    // useEffect(() => {
    //     question()
    //     filtervalues()
    // }, [find])

    // const question = async () => {
    //     const getdata = await axios.get(`${links}/admin/get`)
    //     // console.log(getdata);
    //     setData(getdata.data)
    //     // const finddata = data.find(value => value._id == param.id)
    //     // setFind(finddata)
    //     // console.log(finddata);
    // }

    // const filtervalues = () => {
    //     const finddata = data.find(value => value._id == param.id)
    //     setFind(finddata)
    //     console.log(finddata);
    // }
    // console.log(find);

    const [activeno, setActiveno] = useState(0)
    const [find, setFind] = useState({})

    useEffect(() => {
        ques()
    }, [])

    const ques = async () => {
        const getdata = await axios.get(`${links}/admin/get`)
        // setData(getdata.data)
        const finddata = getdata.data.find(value => value._id == param.id)
        setFind(finddata)
        console.log(finddata);
    }
    console.log(find.questions);

    // const { question } = find.questions && find.questions[0]
    const { question } = find.questions?.[activeno] || {}
    console.log(question);
    return (
        <div>
            {/* {find.questions && find.questions.map((values, key) => {
                return (
                    <h1 key={key}>{values.question}</h1>
                )
            })} */}
            {/* <h1>{question}</h1> */}
            {question && <h1>{question}</h1>}
            <button onClick={() => setActiveno(activeno + 1)}>Next</button>
        </div>
    )
}

export default Questions