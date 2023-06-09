import React from 'react'
import { easing } from 'maath' //  библиотека "maath" с функцией "easing" является вашей магической шкатулкой, предоставляющей вам инструменты и методы для создания плавных и эффектных анимаций в вашем приложении
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'

// Decal: - это наклейки, которые можно "приклеить" к поверхности 3D объектов
// useGLTF: Это хук, предоставляемый библиотекой drei, который упрощает загрузку GLTF моделей. GLTF (GL Transmission Format) - это стандартный формат для передачи 3D моделей в реальном времени, включая информацию о геометрии, материалах и анимации.
// useTexture: Еще один хук из библиотеки drei, который упрощает загрузку текстур. Текстуры обычно используются для добавления деталей и реализма на поверхность 3D объектов.

import state from '../store'

const Shirt = () => {
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF('/shirt_baked.glb')

  const logoTexture = useTexture(snap.logoDecal)
  const fullTexture = useTexture(snap.fullDecal)

  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
  )

  /* Да, в библиотеке @react-three/fiber, хук useFrame используется для создания кастомных анимаций или 
  обновления состояния сцены в каждом кадре. Он особенно полезен для создания динамического поведения, 
  такого как анимация камеры.

useFrame получает callback-функцию, которая вызывается на каждом кадре (обычно 60 раз в секунду при 60FPS).
 Эта функция получает два аргумента:

  state: Объект с данными о текущем состоянии сцены, включая камеру, сцену, размеры холста и многое другое.
  delta: Время в секундах, прошедшее с момента последнего кадра.
  Это позволяет создавать плавные анимации и реагировать на изменения в реальном времени. 
  В контексте камеры, useFrame может быть использован для обновления позиции камеры, 
  её ориентации или любого другого параметра, которым вы хотите управлять. */


  const stateString = JSON.stringify(snap)

  return (
    <group key={stateString}> // Группы используются для объединения нескольких 3D объектов вместе, так что они могут быть перемещены или трансформированы как единое целое.
      <mesh                  // Сетка это основной объект в 3D графике, представляющий геометрию объекта.
        scale={20}
        // visible={visible}
        // castShadow // Представьте, что ваш 3D объект — это здание в городе. Когда солнце светит на здание, оно создаёт тень на улицах и других зданиях рядом. castShadow указывает, будет ли здание (в нашем случае 3D объект) проецировать тень или нет.
        geometry={nodes.T_Shirt_male.geometry} //  Подумайте об этом как о форме или чертеже здания. Вы используете планы из книги архитектуры (здесь "nodes" от GLTF файла) для построения здания (3D объекта) определенной формы.
        material={materials.lambert1} //  Это свойство определяет материал сетки — то, как объект взаимодействует со светом и как он выглядит. Значение берется из материала lambert1, который был загружен вместе с 3D моделью.
        // material-roughness={1} // Это свойство определяет шероховатость материала. Шероховатость влияет на то, как свет отражается от поверхности объекта. Значение 1 означает максимальную шероховатость, что делает объект менее блестящим и более матовым.
        // dispose={null} // Это свойство используется для управления процессом очистки ресурсов, связанных с этой сеткой. Установка этого свойства в null предотвращает автоматическую очистку этих ресурсов. Это может быть полезно, если вы планируете повторно использовать геометрию или материал в других объектах, чтобы сэкономить память и улучшить производительность.
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]} // position={[0, 0, 0]}: Это определяет положение декаля в трехмерном пространстве. [0, 0, 0] обозначает, что декаль будет помещён в центр сцены.
            rotation={[0, 0, 0]} // rotation={[0, 0, 0]}: Это определяет поворот декаля вокруг осей X, Y и Z. [0, 0, 0] обозначает, что декаль не будет повёрнут.
            scale={1} //  Это определяет размер декаля. Значение 1 означает, что декаль будет в своём исходном размере.
            map={fullTexture} // Это определяет текстуру декаля. fullTexture это - текстура, загруженная с помощью функции useTexture
          />
        )}

        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]} // position={[0, 0, 0]}: Это определяет положение декаля в трехмерном пространстве. [0, 0, 0] обозначает, что декаль будет помещён в центр сцены.
            rotation={[0, 0, 0]} // rotation={[0, 0, 0]}: Это определяет поворот декаля вокруг осей X, Y и Z. [0, 0, 0] обозначает, что декаль не будет повёрнут.
            scale={0.2} //  Это определяет размер декаля. Значение 1 означает, что декаль будет в своём исходном размере.
            map={logoTexture} // Это определяет текстуру декаля. fullTexture это - текстура, загруженная с помощью функции useTexture
            map-anisotropy={16} // Представьте, что вы смотрите на билборд под острым углом. map-anisotropy - это как четкость изображения на билборде при просмотре под таким углом.
            depthTest={false} //  это как решение не прятать билборд за другими объектами, независимо от их положения. 
            depthWrite={true} // это как учет того, что билборд есть на этом месте, так что другие объекты знают, что он там находится.
          />
        )}
      </mesh>
    </group>
  )
}

export default Shirt
