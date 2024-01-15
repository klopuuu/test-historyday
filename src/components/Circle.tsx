import React, { useEffect, useRef } from "react";
import gsap from 'gsap';
import jsonHistory from '../json/history.json';
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useAction } from "../hooks/useAction";


const Circle: React.FC = () => {

    const jsonData: Record<string, any> = jsonHistory;
    const historyArr: string[] = Object.keys(jsonData)

    const state = useTypedSelector(state => state.name)
    const dispatch = useAction()

    const circleRef = useRef<SVGSVGElement>(null);
    const textRef = gsap.utils.selector(circleRef)

    
    const searchNumber = (e: CSSStyleDeclaration) => {return Number(e.transform.replace(/[^\d\s]/g, '').split(' ')[0])}

    const turningCircle = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        dispatch(e.currentTarget.id)

        const newValue = 300 - searchNumber(e.currentTarget.style)
        const targetText = e.currentTarget.querySelector('.text')
        const targetNumber = e.currentTarget.querySelector('.number')

        gsap.to(textRef('.text'), {opacity: 0})
        gsap.to(textRef('.number'), {opacity: 0})

        gsap.to(targetNumber, {opacity: 1})

        gsap.to(textRef('.circle'), {r: '3', fill: '#42567A'})
        gsap.to(e.currentTarget.querySelector('.circle'), {r: '28', fill: '#F4F5F9', stroke: '#303e5880'})
        gsap.to(circleRef.current, {rotate: `${newValue}deg`, duration: 5, transformOrigin:"50% 50%"})

        gsap.to(targetText, {opacity: 1})

    }

    const turningCircleEffect = (e: HTMLElement) => {

        const newValue = 300 - searchNumber(e.style)
        const targetText = e.querySelector('.text')
        const targetNumber = e.querySelector('.number')

        gsap.to(textRef('.text'), {opacity: 0})
        gsap.to(textRef('.number'), {opacity: 0})

        gsap.to(targetNumber, {opacity: 1, duration: 2})

        gsap.to(textRef('.circle'), {r: '3', fill: '#42567A'})
        gsap.to(e.querySelector('.circle'), {r: '28', fill: '#F4F5F9', stroke: '#303e5880'})
        gsap.to(circleRef.current, {rotate: `${newValue}deg`, duration: 5, transformOrigin:"50% 50%"})
        
        gsap.to(targetText, {opacity: 1})
    }
    
    useEffect(() => {
        
        const event = circleRef.current?.getElementById(`${state}`) as HTMLElement

        turningCircleEffect(event)

    }, [state])

        

    return (
        <div className="circle-svg">
            <svg viewBox="-293 -293 586 586" width="586" ref={circleRef} >
                <circle r="265" fill="none" stroke="#42567A" strokeWidth="0.5" style={{opacity:'0.2'}} />
                {historyArr.map((name, index) => (
                    <g id={name} key={jsonData[name].id} style={{transform: `rotate(calc(${index}turn / 6)) translate(265px) rotate(calc(-${index}turn / 6))`}} onClick={(e) => turningCircle(e)}>
                        <circle r="3" fill="#42567A" className="circle" />
                        <text textAnchor="middle" fill="white" fontSize="12" alignmentBaseline="middle" className="number">
                            {index + 1}
                        </text>
                        <text textAnchor="middle" x='77px' fill="white" fontSize="12" alignmentBaseline="middle" className="text">
                            {name}
                        </text>
                    </g>
                    ))}  
            </svg>
        </div>


    )
    }

    export default Circle;
