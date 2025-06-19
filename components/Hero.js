import React, { useRef } from 'react'
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

const Controls = () => {
  const orbitRef = useRef()
  const { camera, gl } = useThree()

  useFrame(() => {
    orbitRef.current.update()
  })

  return (
    <orbitControls
      ref={orbitRef}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.1}
      rotateSpeed={0.5}
      maxPolarAngle={Math.PI / 3}
      minPolarAngle={Math.PI / 3}
    />
  )
}

const Cube = () => {
  const ref = useRef()
  const { size, viewport } = useThree()

  const aspect = size.width / viewport.width

  useFrame(() => {
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.01
  })

  return (
    <mesh
      ref={ref}
      onClick={(e) => console.log('click')}
      onPointerMove={(e) => console.log('hover')}
      position={[0, 0, 0]}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color="hotpink"
        roughness={0.6}
        metalness={0.1}
        reflectivity={1}
      />
    </mesh>
  )
}

const Scene = () => {
  return (
    <Canvas>
      <Controls />
      <ambientLight intensity={0.5} />
      <pointLight intensity={0.5} position={[10, 10, 10]} />
      <Cube />
    </Canvas>
  )
}

export default Scene
