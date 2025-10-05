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

    useEffect(() => {
        document.title = "Kinetic Images"
    }, [])

    return (
        <div className="fixed w-screen h-screen inset-0 bg-white">
            <Canvas
                gl={{
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2,
                    outputColorSpace: THREE.SRGBColorSpace,
                    localClippingEnabled: true,
                 }}
                
            >
                <Camera />
                <MeshGroup/>
            </Canvas>
        </div>
    )
}

export default Canvas3d;