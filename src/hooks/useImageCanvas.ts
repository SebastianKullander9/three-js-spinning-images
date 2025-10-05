import { useEffect, useState } from "react";
import { preloadImage, createCanvas } from "../helper/getCanvasTexture";
import getImages from "../helper/getImages";
import { config } from "../3d/config/config";

const { CANVAS } = config;

export type ImageObject = {
    img: HTMLImageElement;
    width: number;
    height: number;
};

function useImageCanvas() {
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            const images = getImages();

            const imgObjs: ImageObject[] = await Promise.all(
                images.map(url => preloadImage({ imageUrl: url, canvasHeight: CANVAS.HEIGHT }))
            );

            const newCanvas = createCanvas(imgObjs);
            setCanvas(newCanvas);
        };

        fetchImages();
    }, []);

    return canvas;
}

export default useImageCanvas;