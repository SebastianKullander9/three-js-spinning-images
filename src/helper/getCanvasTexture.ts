interface preloadImageProps {
    imageUrl: string;
    canvasHeight: number;
}

type ImageObject = {
    img: HTMLImageElement;
    width: number;
    height: number;
}

async function preloadImage({imageUrl, canvasHeight}: preloadImageProps) {
    const img = new Image();
    img.crossOrigin = "anonymous";

    await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = imageUrl;
    });

    const imgAspectRatio = img.naturalWidth / img.naturalHeight;

    const calculatedHeight = canvasHeight;
    const calculatedWidth = canvasHeight * imgAspectRatio;
    
    return {img, width: calculatedWidth, height: calculatedHeight };
}

function createCanvas(imageData: ImageObject[]) {
    const totalWidth = imageData.reduce((acc, data) => acc + data.width, 0)

    const canvas = document.createElement("canvas");

    canvas.width = totalWidth;
    canvas.height = 512;

    const ctx = canvas.getContext("2d");

    let posX = 0;
    const posY = 0;
    imageData.forEach((obj) => {
        ctx?.drawImage(obj.img, posX, posY, obj.width, obj.height);
        posX += obj.width;
    });

    return canvas;
}


export { preloadImage, createCanvas };