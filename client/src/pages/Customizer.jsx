import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio' // это издательская компания, которая выпускает различные газеты. Каждая газета представляет определенное "состояние" в вашем приложении.

import config from '../config/config'
import state from '../store'
import { download } from '../assets'
import { downloadCanvasToImage, reader } from '../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'
import {
  AIPicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab
} from '../components'

const Customizer = () => {
  const snap = useSnapshot(state) // useSnapshot — это как ваш почтовый ящик, который вы проверяете каждый день, чтобы узнать, есть ли новые выпуски газет. Когда вы подписываетесь на газету с помощью useSnapshot, вы автоматически получаете свежие выпуски (обновления состояния), как только они выходят.

  const [file, setFile] = useState('') // Это стайт работает с файлами

  const [prompt, setPrompt] = useState('') // Это стайт который работает с textarea которую пишем сообщение

  const [generatingImg, setGeneratingImg] = useState(false) // Когда идет запрос на изображение через API , она показывает типо идет загрузка и всё

  const [activeEditorTab, setActiveEditorTab] = useState('') // Это проверяет на что именно нажал то на цвет, на выбор файла, или на робота
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false
  }) //

  // Простая проверка
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />
      case 'filepicker':
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />
      case 'aipicker':
        return (
          <AIPicker
            prompt={prompt} // Это стайт который работает с textarea которую пишем сообщение
            setPrompt={setPrompt} // Это стайт который работает с textarea которую пишем сообщение
            generatingImg={generatingImg} // Когда идет запрос на изображение через API , она показывает типо идет загрузка и всё
            handleSubmit={handleSubmit} // Когда Я нажимаю на кнопку ИИ Лого или Полный , то handleSubmit получает в type слово 'logo' или 'full'
          />
        )
      default:
        return null
    }
  }

  // запрос
  const handleSubmit = async type => {
    if (!prompt) return alert('Please enter a prompt')

    try {
      setGeneratingImg(true) // показываем после нажатие на кнопки , типо идет запрос...

      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt
        })
      })

      const data = await response.json()

      handleDecals(type, `data:image/png;base64,${data.photo}`)
      // Сюда в type передаем - то что передали в type в начале , то есть слово 'logo' или 'full'
      // В result передаем - data:image/png;base64,${data.photo}
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false) // Тут убераем нашу загрузку
      setActiveEditorTab('') // Очищаем поля ввода textarea
    }
  }

  const handleDecals = (type, result) => {
    // Здесь мы получаем те данные которые передали в функцие handleSubmit

    const decalType = DecalTypes[type] // Здесь получаем из объекта DecalTypes[тип который Мы передали в handleSubmit]

    state[decalType.stateProperty] = result // Тут наш logoDecal: './threejs.png' из state равен нашему `data:image/png;base64,${data.photo}` то есть = result

    if (!activeFilterTab[decalType.filterTab]) {
      // activeFilterTab[decalType.filterTab] будет значение false то тогда Выполнить код
      handleActiveFilterTab(decalType.filterTab) // Здесь Мы передаем "logoShirt" или "stylishShirt" из объекта decalType
    }
  }

  const handleActiveFilterTab = (tabName) => {
    // Здесь Мы получаем "logoShirt" или "stylishShirt"
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName]
        // если вы вызываете handleActiveFilterTab('logoShirt') и activeFilterTab['logoShirt'] в данный момент true,
        // то функция сначала устанавливает state.isLogoTexture в false (потому что !true это false),
        // затем обновляет activeFilterTab['logoShirt'] на false.
        break
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName]
        // если вы вызываете handleActiveFilterTab('logoShirt') и activeFilterTab['logoShirt'] в данный момент true,
        // то функция сначала устанавливает state.isLogoTexture в false (потому что !true это false),
        // затем обновляет activeFilterTab['logoShirt'] на false.
        break
      default:
        state.isLogoTexture = true
        state.isFullTexture = false
        break
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab(prevState => {
      return {
        ...prevState, // тут получаем предедущие значение 
        [tabName]: !prevState[tabName] // тут вместо true ставим false или наоборот
      }
    })
  }

  const readFile = type => { // Это функция передает в пропсы к компоненту FilePicker.jsx , там дальше разберись
    reader(file).then(result => {
      handleDecals(type, result) // тут в функию передаем наш type и result для дальнейшей обработки
      setActiveEditorTab('') // Сбрасывает стейта. на верху написано про это , прямо перед стейтом 
    })
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key='custom'
            className='absolute top-0 left-0 z-10'
            {...slideAnimation('left')}
          >
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
                {EditorTabs.map(tab => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()} {/*  // Тут она вызывается  */}
              </div>
            </div>
          </motion.div>

          <motion.div
            className='absolute z-10 top-5 right-5'
            {...fadeAnimation}
          >
            <CustomButton
              type='filled'
              title='Домой'
              handleClick={() => (state.intro = true)}
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
            />
          </motion.div>

          <motion.div
            className='filtertabs-container'
            {...slideAnimation('up')}
          >
            {FilterTabs.map(tab => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer
