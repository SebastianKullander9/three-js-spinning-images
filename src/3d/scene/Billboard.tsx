import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTextureStore } from "../../store/store";

interface BillboardProps {
  radius?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

function Billboard({ radius = 5, ...props }: BillboardProps) {
    const ref = useRef(null);
    const texture = useTextureStore(state => state.texture);

    useFrame((_, delta) => {
        if (texture) texture.offset.x += delta * 0.001;
    });

    const material = useMemo(() => {
        const mat = new THREE.MeshBasicMaterial({
            map: texture || null,
            side: THREE.DoubleSide,
        });

        mat.onBeforeCompile = (shader) => {
        shader.fragmentShader = shader.fragmentShader.replace(
            `#include <dithering_fragment>`,
            `
            if (!gl_FrontFacing) {
                gl_FragColor.rgb *= 0.5; // Darken backside
            }
            #include <dithering_fragment>
            `
        );
    };

        return mat;
    }, [texture]);

    return (
        <>
            <mesh ref={ref} {...props}>
                <cylinderGeometry args={[radius, radius, 2, 100, 1, true]} />
                <primitive object={material} attach="material" />
            </mesh>
        </>
    );
}

export default Billboard;