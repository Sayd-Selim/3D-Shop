import React from 'react'

import CustomButton from './CustomButton';

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
  return (
    <div className="aipicker-container">
      <textarea 
        placeholder="Вопрос к ИИ"
        rows={5} // хоть Я её удаляю , нечего не меняется)))
        value={prompt} // Ну здесь понятно 
        onChange={(e) => setPrompt(e.target.value)} // здесь тоже
        className="aipicker-textarea"  // здесь тоже
      />
       <div className="flex flex-wrap gap-3"> {/* здесь тоже и до конца , всё понятно */}
        {generatingImg ? (
          <CustomButton 
            type="outline"
            title="Выполняется Запрос"
            customStyles="text-xs"
          />
        ) : (
          <>
            <CustomButton 
              type="outline"
              title="ИИ Лого"
              handleClick={() => handleSubmit('logo')}
              customStyles="text-xs"
            />

            <CustomButton 
              type="filled"
              title="Полный"
              handleClick={() => handleSubmit('full')}
              customStyles="text-xs"
            />
          </>
        )}
      </div>
    </div>
  )
}

export default AIPicker