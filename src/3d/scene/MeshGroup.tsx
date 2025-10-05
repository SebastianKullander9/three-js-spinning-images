import React from "react";
import Billboard from "./Billboard";
import Banner from "./Banner";
import { config } from "../config/config";
import { useThree } from "@react-three/fiber";

const { BILLBORD_BANNER } = config;

const COUNT = BILLBORD_BANNER.COUNT;
const GAP = BILLBORD_BANNER.GAP;

function MeshGroup() {
    const { viewport } = useThree();
    console.log(viewport.width)

    const scale = viewport.width < 5
        ? 0.5
        : viewport.width < 7
        ? 0.7
        : viewport.width < 9
        ? 0.8
        : 1;

    return (
        <group rotation={[-0.15, 0, -0.2]} scale={[scale, scale, scale]}>
            {Array.from({ length: COUNT}).map((_, index) => (
                <React.Fragment key={index}>
                            <Billboard
                                radius={5}
                                position={[0, (index - (Math.ceil(COUNT / 2) - 1)) * GAP, 0]}
                                rotation={[0, index * Math.PI * 0.5, 0]}
                            />
                            <Banner
                                radius={5}
                                position={[0, (index - (Math.ceil(COUNT / 2) - 1)) * GAP - GAP * 0.5, 0]}
                                rotation={[0, 0, 0.085]}
                            />
                </React.Fragment>
            ))}
    </group>
    )
}

export default MeshGroup;