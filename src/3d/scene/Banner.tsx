import * as THREE from "three";
import { useRef } from "react";
import banner from "/banner.jpg";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function Banner({ radius = 1.6, ...props }) {
    const ref = useRef(null);
    
    const texture = useTexture(banner);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    useFrame((_, delta) => {
        texture.offset.x += delta * -0.02;
    })

    return (
        <>
            <mesh ref={ref} {...props}>
                <cylinderGeometry args={[radius, radius, radius * 0.07, radius * 80, radius * 10, true]} />
                <meshBasicMaterial map={texture} map-anisotropy={16} map-repeat={[16, 1]} color="#ffffff" side={THREE.DoubleSide} />
            </mesh>
        </>
    );
}

export default Banner;