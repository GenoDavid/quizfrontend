import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './Question.module.css'

const Questions = () => {

    const { links } = useSelector(state => state.link)
    const param = useParams()
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
        const finddata = getdata.data.find(value => value._id == param.id)
        setFind(finddata)
        console.log(finddata);
    }
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
            return answer ? {
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
    const sub = () => {
        setSelect(null)
        setFinish((pre) => {
            return answer ? {
                ...pre,
                score: pre.score + 1,
                correctanswer: pre.correctanswer + 1,
            } : {
                ...pre,
                wronganswer: pre.wronganswer + 1
            }
        })
        setShowresult(true)
    }

    const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)

    return (
        <div className={classes.quizcontainer}>
            {
                !showresult ? (
                    <div>
                        <span className={classes.activequestionno}>
                            {addLeadingZero(activeno + 1)}
                        </span>
                        <span className={classes.totalquestion}>
                            /{addLeadingZero(find.questions?.length)}
                        </span>
                        <h1>Quiz</h1>
                        <h1>{question}</h1>
                        <ul>
                            {
                                choose?.map((items, key) => {
                                    return (
                                        <li className={select == key ? classes.active : null} onClick={() => selectanswer(items, key)} key={key}>{items}</li>
                                    )
                                })
                            }
                        </ul>

                        <div className={classes.flexright}>
                            {
                                activeno >= 1 ? <button onClick={() => setActiveno(activeno - 1)}>Back</button> : null
                            }

                            {
                                activeno === (find.questions?.length - 1) ? <button onClick={() => sub()}>Finish</button> : <button onClick={() => addbutton()}>Next</button>
                            }
                        </div>
                    </div>
                ) :
                    (
                        <div className={classes.result}>
                            <h3>Result</h3>
                            <p>
                                Total Question: <span>{find.questions.length}</span>
                            </p>
                            <p>
                                Total Score:<span> {finish.score}</span>
                            </p>
                            <p>
                                Correct Answers:<span> {finish.correctanswer}</span>
                            </p>
                            <p>
                                Wrong Answers:<span> {finish.wronganswer}</span>
                            </p>
                        </div>
                    )
            }
        </div>
    )
}

export default Questions