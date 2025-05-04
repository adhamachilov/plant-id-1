import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Group, Box3, Vector3, Mesh, MeshStandardMaterial } from 'three'

interface BeeModelProps {
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
}

// HSL interface for proper typing
interface HSL {
  h: number;
  s: number;
  l: number;
}

export function BeeModel({ 
  scale = 0.35, 
  position = [0, 0, 0], 
  rotation = [0, Math.PI / 4, 0] 
}: BeeModelProps) {
  const groupRef = useRef<Group>(null)
  
  // Use the EXACT same path as the working test implementation
  const modelPath = './3d/flying_bee.glb'
  const { scene, animations } = useGLTF(modelPath)
  const { actions, mixer } = useAnimations(animations, scene)
  
  // Apply the same setup as the working test implementation
  useEffect(() => {
    if (scene) {
      // Center and scale the model like in the test implementation
      const box = new Box3().setFromObject(scene);
      const center = box.getCenter(new Vector3());
      const size = box.getSize(new Vector3());
      
      // Get max dimension and scale model appropriately
      const maxDim = Math.max(size.x, size.y, size.z);
      const newScale = 2 / maxDim;
      scene.scale.set(newScale, newScale, newScale);
      
      // Center the model
      scene.position.x = -center.x * newScale;
      scene.position.y = -center.y * newScale;
      scene.position.z = -center.z * newScale;
      
      // Enhanced material handling to ensure proper color display
      scene.traverse((node) => {
        if (node instanceof Mesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          
          // Apply more vibrant materials with enhanced colors
          if (Array.isArray(node.material)) {
            node.material.forEach((mat) => {
              if (mat instanceof MeshStandardMaterial) {
                // Enhance material properties for better visual appearance
                mat.roughness = 0.2;  // Even lower roughness for more shine
                mat.metalness = 0.1;  // Lower metalness for more color
                
                // Boost the existing colors
                if (mat.color) {
                  const color = mat.color.clone();
                  // Make colors more vibrant by increasing saturation and brightness
                  const hsl: HSL = { h: 0, s: 0, l: 0 };
                  color.getHSL(hsl);
                  // Increase saturation and lightness for more vibrant colors
                  color.setHSL(hsl.h, Math.min(hsl.s * 2.0, 1.0), Math.min(hsl.l * 1.2, 1.0));
                  mat.color = color;
                  
                  // Increase the emissive factor to make it glow slightly
                  mat.emissive.set(color.r * 0.2, color.g * 0.2, color.b * 0.2);
                  mat.emissiveIntensity = 0.3;
                }
                
                // Force material to update
                mat.needsUpdate = true;
              }
            });
          } else if (node.material instanceof MeshStandardMaterial) {
            const material = node.material;
            
            // Enhance material properties
            material.roughness = 0.2;
            material.metalness = 0.1;
            
            // Boost existing colors
            if (material.color) {
              const color = material.color.clone();
              // Make colors more vibrant
              const hsl: HSL = { h: 0, s: 0, l: 0 };
              color.getHSL(hsl);
              // Increase saturation and lightness for more vibrant colors
              color.setHSL(hsl.h, Math.min(hsl.s * 2.0, 1.0), Math.min(hsl.l * 1.2, 1.0));
              material.color = color;
              
              // Increase the emissive factor to make it glow slightly
              material.emissive.set(color.r * 0.2, color.g * 0.2, color.b * 0.2);
              material.emissiveIntensity = 0.3;
            }
            
            // Force material update
            material.needsUpdate = true;
          }
        }
      });
      
      // Start animation if available
      if (animations && animations.length > 0 && actions) {
        const action = Object.values(actions)[0];
        if (action) {
          action.play();
        }
      }
    }
  }, [scene, animations, actions]);
  
  // Animate the bee with the same hover effect as the test
  useFrame((state) => {
    if (groupRef.current && !animations.length) {
      const time = state.clock.elapsedTime;
      groupRef.current.position.y = Math.sin(time * 1.5) * 0.1 + position[1];
      groupRef.current.rotation.y = time * 0.25 + rotation[1];
    }
    
    // Update the animation mixer
    if (mixer) {
      mixer.update(state.clock.getDelta());
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  )
}

// Preload the model from the correct path
useGLTF.preload('./3d/flying_bee.glb')
