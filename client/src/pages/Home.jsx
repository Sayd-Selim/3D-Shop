import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion'
import state from '../store' // Тюрьма наша
import { CustomButton } from '../components'

const Home = () => {
  const snap = useSnapshot(state) // это наш надзиратель в тюрьме
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [futbolka, setFutbolka] = React.useState(false)
  const [alimpik, setAlimpik] = React.useState(false)
  return (
    <AnimatePresence>
      {/* ЛОГОТИП НАШЕГО САЙТА */}
      {snap.intro && (
        <motion.section className='home' {...slideAnimation('left')}>
          <motion.header {...slideAnimation('down')}>
            <img
              src='./threejs.png'
              alt='logo'
              className='w-8 h-8 object-contain'
            />
          </motion.header>
          {/* КОНЕЦ */}

          {/* ЗАГОЛОВОК НАШЕГО САЙТА */}

          <motion.div className='home-content' {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className='head-text'>
                ТВОИ <br className='xl:block hidden' /> МЕЧТЫ
              </h1>
            </motion.div>

            {/* КОНЕЦ */}

            {/* Текст нашего сайта  */}
            <motion.div
              {...headContentAnimation}
              className='flex flex-col gap-1'
            >
              <p className='maw-w-md font-normal text-gray-600 text-base'>
                Создайте свою уникальную и эксклюзивную рубашку с помощью нашего
                совершенно нового инструмента 3D-настройки.
                <strong>Дайте волю своему воображению</strong> и определите свой
                собственный стиль.
              </p>
              {/* КОНЕЦ  */}

              {/* Кнопка нашего сайта */}

              <CustomButton
                type='filled'
                title='Создай её'
                handleClick={() => (state.intro = false)}
                customStyles='w-fit px-4 py-2.5 font-bold text-sm mt-6'
              />
              <CustomButton
                type='filled'
                title='Гардеробная'
                handleClick={() => setDropdownOpen(!dropdownOpen)}
                customStyles='w-fit px-4 py-2.5 font-bold text-sm mt-6'
              />
              {dropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <li>
                    <button
                      onClick={() => {
                        state.futbolka = true
                        state.Alimpik = false
                      }}
                    >
                      Футболка
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        state.futbolka = false
                        state.Alimpik = true
                      }}
                    >
                      Алимпик
                    </button>
                  </li>
                </motion.ul>
              )}
              {/* КОНЕЦ */}
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home
