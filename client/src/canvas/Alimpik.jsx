import React from 'react'
import { easing } from 'maath' //  библиотека "maath" с функцией "easing" является вашей магической шкатулкой, предоставляющей вам инструменты и методы для создания плавных и эффектных анимаций в вашем приложении
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'

// Decal: - это наклейки, которые можно "приклеить" к поверхности 3D объектов
// useGLTF: Это хук, предоставляемый библиотекой drei, который упрощает загрузку GLTF моделей. GLTF (GL Transmission Format) - это стандартный формат для передачи 3D моделей в реальном времени, включая информацию о геометрии, материалах и анимации.
// useTexture: Еще один хук из библиотеки drei, который упрощает загрузку текстур. Текстуры обычно используются для добавления деталей и реализма на поверхность 3D объектов.

import state from '../store'

const Alimpik = () => {
  const snap = useSnapshot(state)
  console.log(snap)
  const { nodes, materials } = useGLTF('/jacket.glb')
console.log(materials);

  useFrame((state, delta) =>
  {if (snap.Alimpik) {
    easing.dampC(materials['Material.001'].color, snap.color, 0.25, delta);
}}
)


  const stateString = JSON.stringify(snap)

  return (
    <group key={stateString}>
     
      // Группы используются для объединения нескольких 3D объектов вместе, так
      что они могут быть перемещены или трансформированы как единое целое.
      <mesh
        // visible={visible} // Сетка это основной объект в 3D графике, представляющий геометрию объекта.
        scale={1}
        castShadow // Представьте, что ваш 3D объект — это здание в городе. Когда солнце светит на здание, оно создаёт тень на улицах и других зданиях рядом. castShadow указывает, будет ли здание (в нашем случае 3D объект) проецировать тень или нет.
        geometry={nodes.Lp_jacket.geometry} //  Подумайте об этом как о форме или чертеже здания. Вы используете планы из книги архитектуры (здесь "nodes" от GLTF файла) для построения здания (3D объекта) определенной формы.
        material={materials['Material.001']}  //  Это свойство определяет материал сетки — то, как объект взаимодействует со светом и как он выглядит. Значение берется из материала lambert1, который был загружен вместе с 3D моделью.
        material-roughness={1} // Это свойство определяет шероховатость материала. Шероховатость влияет на то, как свет отражается от поверхности объекта. Значение 1 означает максимальную шероховатость, что делает объект менее блестящим и более матовым.
        dispose={null} // Это свойство используется для управления процессом очистки ресурсов, связанных с этой сеткой. Установка этого свойства в null предотвращает автоматическую очистку этих ресурсов. Это может быть полезно, если вы планируете повторно использовать геометрию или материал в других объектах, чтобы сэкономить память и улучшить производительность.
      >
       
      </mesh>
    </group>
  )
}

export default Alimpik
