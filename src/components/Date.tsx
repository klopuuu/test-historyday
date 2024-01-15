import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TextPlugin } from 'gsap/TextPlugin';
import btn from '../assets/icons/prev.svg';
import { useTypedSelector } from "../hooks/useTypedSelector";
import jsonHistory from '../json/history.json';
import { useAction } from "../hooks/useAction";

gsap.registerPlugin(TextPlugin);


const Date: React.FC = () => {

    const jsonData: Record<string, any> = jsonHistory;
    const historyArr: any[] = Object.entries(jsonData);

    const [dateIndex, setDateIndex] = useState<number>(0)

    const textLeftRef = useRef<HTMLDivElement|null>(null);
    const textRightRef = useRef<HTMLDivElement|null>(null);

    const state = useTypedSelector(state => state.name)

    const tl = gsap.timeline({});

    const dispatch = useAction()

    const btnPrev = (id: number) => {
        dispatch(historyArr[id-2][0])
        animatePrev(id-1)
    }

    const btnNext = (id: number) => {
        dispatch(historyArr[id][0])
        animateNext(id)
    }

    // Функция для анимации следующего элемента массива
    function animateNext(id: number) {

        let index = dateIndex

        while(index < id){

            tl.fromTo(textRightRef.current, {text: textRightRef.current?.innerText}, {text: `${historyArr[index][1].dateRight}`, duration:0.5})
            tl.fromTo(textLeftRef.current, {text: textLeftRef.current?.innerText}, {text: `${historyArr[index][1].dateLeft}`, duration:0.5})

            if (textLeftRef.current && textRightRef.current) {
                textLeftRef.current.innerText = `${historyArr[index][1].dateLeft}`
                textRightRef.current.innerText = `${historyArr[index][1].dateRight}`
            }

            index++
        }

        setDateIndex(id)
    }

    // Функция для анимации предыдущего элемента массива
    function animatePrev(id:number) {
        console.log(id)

        let index = dateIndex
    
        while(index >= id){
            --index
            tl.fromTo(textRightRef.current, {text: textRightRef.current?.innerText}, {text: `${historyArr[index][1].dateRight}`, duration:0.5})
            tl.fromTo(textLeftRef.current, {text: textLeftRef.current?.innerText}, {text: `${historyArr[index][1].dateLeft}`, duration:0.5})

            if (textLeftRef.current && textRightRef.current) {
                textLeftRef.current.innerText = `${historyArr[index][1].dateLeft}`
                textRightRef.current.innerText = `${historyArr[index][1].dateRight}`
            }
        }

        setDateIndex(id)
    }
    
    useEffect(() => {
        if (textLeftRef.current && textRightRef.current) {
            textLeftRef.current.innerText = `${jsonData[`${state}`].dateLeft}`
            textRightRef.current.innerText = `${jsonData[`${state}`].dateRight}`
        }

        setDateIndex(jsonData[`${state}`].id)
    }, []);

    
    
    useEffect(() => {
        const id = jsonData[`${state}`].id

        if((id - dateIndex) < 0) {
            animatePrev(id)
        }
        else if((id - dateIndex) !== id) {
            animateNext(id)
        }

    },[state])


  
    return (
        <>
            <div className="date">
                <div className="date__left" ref={textLeftRef}></div>
                <div className="date__right" ref={textRightRef}></div>
            </div>

            <div className="date__span">
                <span>0{dateIndex}</span>/<span>06</span>
            </div>

            <div className="btn">
                <button onClick={() => btnPrev(dateIndex)} style={{opacity: dateIndex - 1 !== 0 ? 1 : 0.6}} disabled={dateIndex - 1 !== 0 ? false : true}>
                    <img src={btn} alt="prev" />
                </button>
                <button onClick={() => btnNext(dateIndex)} style={{opacity: dateIndex !== 6 ? 1 : 0.6}} disabled={dateIndex !== 6 ? false : true}>
                    <img src={btn} alt="next" style={{transform: 'rotate(180deg)'}}/>
                </button>
            </div>

            <div className="text-history">{state}</div>
        </>
    )
}

export default Date