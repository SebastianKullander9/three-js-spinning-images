import * as THREE from "three";
import { useRef, useMemo } from "react";
import banner from "/images/banner.jpg";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function Banner({ radius = 1.6, ...props }) {
    const ref = useRef(null);
    
    const texture = useTexture(banner);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    useFrame((_, delta) => {
        texture.offset.x += delta * -0.02;
    })

    const material = useMemo(() => {
        const mat = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            color: "#ffffff",
            toneMapped: false,
        });
        
        texture.anisotropy = 16;
        texture.repeat.set(16, 1);

        mat.onBeforeCompile = (shader) => {
            shader.fragmentShader = shader.fragmentShader.replace(
                `#include <dithering_fragment>`,
                `
                if (!gl_FrontFacing) {
                    float gradientFactor = vMapUv.y;
                    
                    vec3 topColor = vec3(0.0, 0.0, 0.0);
                    vec3 bottomColor = vec3(1.0, 1.0, 1.0);
                    
                    vec3 gradientColor = mix(bottomColor, topColor, gradientFactor);
                    
                    gl_FragColor = vec4(gradientColor, 1.0);
                }
                #include <dithering_fragment>
                `
            );
        };

        return mat;
    }, [texture]);

    return (
        <mesh ref={ref} {...props}>
            <cylinderGeometry args={[radius, radius, radius * 0.07, radius * 80, radius * 10, true]} />
            <primitive object={material} attach="material" />
        </mesh>
    );
}

export default Banner;