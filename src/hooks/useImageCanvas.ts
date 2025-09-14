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
            const images = await getImages();

            let validImages = images.filter((url) => url !== null && url !== undefined);
            validImages = validImages.slice(0, 10);

            console.log(`Loading ${validImages.length} images through proxy...`);

            const imgObjs = await Promise.all(
                validImages.map(async (url) => {
                    try {
                        const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;


                        return await preloadImage({
                            imageUrl: proxyUrl,
                            canvasHeight: CANVAS.HEIGHT,
                        });
                    } catch (error) {
                        console.error("Failed to load image:", url, error);
                        return null;
                    }
                })
            );

            const successfulImages = imgObjs.filter(
                (img): img is ImageObject => img !== null
            );

            if (successfulImages.length > 0) {
                const newCanvas = createCanvas(successfulImages);
                setCanvas(newCanvas);
            }
        };

        fetchImages();
    }, []);

    return canvas;
}

export default useImageCanvas;