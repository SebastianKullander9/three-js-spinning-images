import { create } from "zustand";
import * as THREE from "three";

type TextureState = {
    texture: THREE.Texture | null;
    setTexture: (texture: THREE.Texture | null) => void;
}

export const useTextureStore = create<TextureState>((set) => ({
    texture: null,
    setTexture: (texture: THREE.Texture | null) => set({ texture }),
}));