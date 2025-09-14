import { PerspectiveCamera } from "@react-three/drei";

function Camera() {
    return (
        <PerspectiveCamera makeDefault fov={7} position={[0, 0, 70]}/>
    );
}

export default Camera;