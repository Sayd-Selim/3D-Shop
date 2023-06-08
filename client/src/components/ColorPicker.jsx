import React from 'react'
import { SketchPicker } from 'react-color' // SketchPicker — это панель выбора цвета
import { useSnapshot } from 'valtio' // Это наш художник

import state from '../store'

const ColorPicker = () => {
  const snap = useSnapshot(state)

  return (
    <div className='absolute left-full ml-3'>
      <SketchPicker
        color={snap.color} // это текущий выбранный цвет.Это значение берется из глобального состояния 
        // приложения (snap.color), которое, в свою очередь, получается с помощью хука useSnapshot 
        
        onChange={color => (state.color = color.hex)} // это функция, которая вызывается при изменении выбранного
        //  цвета. В данном случае, когда пользователь выбирает новый цвет на панели SketchPicker,
        //  state.color обновляется до нового выбранного цвета (color.hex).
      />
    </div>
  )
}

export default ColorPicker

{/* Итак, метафорически, 
SketchPicker можно представить как палитру художника, на которой художник 
может смешивать краски для получения нужного оттенка. color - это текущий цвет краски, который художник 
использовал последним, а onChange - это действие художника по выбору нового оттенка на палитре и смешиванию 
его для дальнейшего использования в своем искусстве. */}
