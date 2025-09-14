import { Canvas } from "@react-three/fiber";
import Camera from "../camera/Camera";
import * as THREE from "three";
import { useEffect } from "react";
import useCanvasTexture from "../../hooks/useCanvasTexture";
import useImageCanvas from "../../hooks/useImageCanvas";
import MeshGroup from "../scene/MeshGroup";
import { useTextureStore } from "../../store/store";

export type ImageObject = {
    img: HTMLImageElement;
    width: number;
    height: number;
}

function Canvas3d() {
    const { setTexture } = useTextureStore();
    
    const canvas = useImageCanvas();
    const texture = useCanvasTexture(canvas);
    
    useEffect(() => {
        if (texture) {
            setTexture(texture);
        }
    }, [texture, setTexture]);

    return (
        <div className="fixed w-screen h-screen inset-0 bg-linear-to-bl from-gray-300 to-gray-400">
            <Canvas
                gl={{ toneMapping: THREE.NoToneMapping }}
                
            >
                <Camera />
                <MeshGroup/>
            </Canvas>
        </div>
    )
}

export default Canvas3d;