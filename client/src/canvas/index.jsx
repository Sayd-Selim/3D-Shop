import { Canvas } from '@react-three/fiber' // Представьте, что вы художник, и ваши инструменты - это JavaScript и библиотека React Three Fiber. Холст (Canvas) из @react-three/fiber - это ваша пустая рама или холст, на котором вы собираетесь создать свое искусство
import { Environment, Center } from '@react-three/drei' // внизу есть описание
import Shirt from './Shirt'
import Backdrop from './Backdrop'
import CameraRig from './CameraRig'
import Alimpik from './Alimpik'
import state from '../store'
import { useSnapshot } from 'valtio'
const CanvasModel = () => {
  const snap = useSnapshot(state)

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }} // position - это позиция вашей "камеры" или глаз в трехмерном пространстве. fov - это "поле зрения" вашей камеры, которое можно сравнить с углом зрения человеческого глаза
      gl={{ preserveDrawingBuffer: true }} // вы говорите рендереру сохранить свой "буфер рисования" после того, как он закончил рисовать кадр.
      className='w-full max-w-full g-full transition-all ease-in'
    >
      <ambientLight intensity={0} /> // это как бы уровень освещения в вашей
      студии футболки
      <Environment preset='city' />
      // Environment - текстура , которое будет проецироваться вокруг всей
      сцены, создавая иллюзию окружающего мира или пространства. Это может быть
      полезно для создания определенной атмосферы или чувства присутствия в
      3D-пространстве. // preset - это как бы текстуры которые наложили на нашу
      футболку
      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel
