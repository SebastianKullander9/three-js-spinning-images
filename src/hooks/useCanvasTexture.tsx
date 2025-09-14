import * as THREE from "three";
import { useMemo } from "react";


function useCanvasTexture(canvas: HTMLCanvasElement | null) {
    const texture = useMemo(() => {
        if (!canvas) return null;
        const tex = new THREE.CanvasTexture(canvas);

        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;

        tex.needsUpdate = true;
        return tex;
    }, [canvas]);

    return texture;
}

export default useCanvasTexture;
