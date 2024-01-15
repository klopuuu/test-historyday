import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import btn from '../assets/icons/next.svg';
import { Navigation, Pagination } from 'swiper/modules';
import jsonHistory from '../json/history.json';
import { useTypedSelector } from "../hooks/useTypedSelector";
import Cards from "../components/Cards";
import gsap from 'gsap';


const SwiperModules: React.FC = () => {

  const jsonData: Record<string, any> = jsonHistory;
  const state = useTypedSelector(state => state.name)
  const [data, setData] = useState<Record<string, any>>({})
  const [keys, setKeys] = useState<string[]>([])

  const fadeRef = useRef<HTMLDivElement>(null)

  var tl = gsap.timeline({});

  function fadeSwiper () {
    tl.to(fadeRef.current, {opacity: 0 })
    .to(fadeRef.current, {opacity: 1, duration: 3})
  }

  useEffect(() => {
    const keys = Object.keys(jsonData[`${state}`].history)
    const data = jsonData[`${state}`].history
    
    setData(data)
    setKeys(keys)

    fadeSwiper()

  }, [state])

  
    return (
      <div ref={fadeRef} className='swiper-container' style={{opacity: 0, display: 'flex', gap: '15px', alignItems: 'center', paddingBottom: '70px'}}>

        <div className="btn__left">
          <img src={btn} alt="left" />
        </div>
        

        <div className='swiper-history'>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={80}
            slidesPerView={3}
            navigation = {{nextEl: '.btn__rigth', prevEl: '.btn__left', disabledClass: 'my-button-disabled'}}
            allowSlideNext={true}
            breakpoints={
              {
                375: {
                  slidesPerView: 1,
                },
                380: {
                  slidesPerView: 3
                }
              }
            }
          >
            
            {
              keys.map(item => (
                <SwiperSlide>
                  <Cards date={item} text={data[`${item}`]}/>
                </SwiperSlide>
              ))
              
            }
            
          </Swiper>
        </div>
        
        <div className="btn__rigth">
          <img src={btn} alt="rigth" />
        </div>
    </div>
  );
}

export default SwiperModules;