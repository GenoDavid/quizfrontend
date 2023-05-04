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
    const [showresult, setShowresult] = useState(false)
    const [select, setSelect] = useState(null)
    const [answer, setAnswer] = useState('')
    const [finish, setFinish] = useState({
        score: 0,
        correctanswer: 0,
        wronganswer: 0
    })

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
    // const { questions } = quizs
    const { question, choose, correctanswer } = find.questions?.[activeno] || {}
    console.log(question);
    const selectanswer = (items, key) => {
        setSelect(key)
        if (items === correctanswer) {
            setAnswer(true)
            console.log(true);
        }
        else {
            setAnswer(false)
        }
    }
    const addbutton = () => {
        setSelect(null)
        setFinish((pre) => {
            answer ? {
                ...pre,
                score: pre.score + 1,
                correctanswer: pre.correctanswer + 1,
            } : {
                ...pre,
                wronganswer: pre.wronganswer + 1
            }
        })
        if (activeno !== question.length - 1) {
            setActiveno(pre => pre + 1)
        }
        else {
            setActiveno(0)
            setShowresult(true)
        }
        console.log(setShowresult);
    }

    return (
        <div>
            {
                !showresult ? (
                    <div>
                        {/* {find.questions && find.questions.map((values, key) => {
                return (
                    <h1 key={key}>{values.question}</h1>
                )
            })} */}
                        {/* <h1>{question}</h1> */}
                        <h1>Quiz</h1>
                        <h1>{question}</h1>
                        <ul>
                            {
                                choose?.map((items, key) => {
                                    return (
                                        <li className={select == key ? 'active' : null} onClick={() => selectanswer(items, key)} key={key}>{items}</li>
                                    )
                                })
                            }
                        </ul>

                        {/* {
                activeno === (find.questions?.length == 0) ? <button onClick={() => setActiveno(activeno - 1)}>Back</button> : null
            } */}
                        {
                            activeno == (find.questions?.length > 1) ? <button onClick={() => setActiveno(activeno - 1)}>Back</button> : null
                        }

                        {
                            activeno === (find.questions?.length - 1) ? <button onClick={() => setShowresult(true)}>Finish</button> : <button onClick={() => addbutton()}>Next</button>
                        }
                        {/* <button onClick={() => addbutton()}>
                            {
                                activeno === (find.questions?.length - 1) ? 'finish' : 'Next'
                            }
                        </button> */}
                    </div>
                ) :
                    (<div>
                        <h1>result</h1>
                    </div>)
            }
        </div>
    )
}

export default Questions