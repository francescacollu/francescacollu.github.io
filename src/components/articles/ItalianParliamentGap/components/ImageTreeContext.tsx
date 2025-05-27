import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ImageTree, ImageId, OriginalSrcNode, ColorNode } from './MathUtils';

interface ImageTreeContextType {
    imageTree: ImageTree | undefined;
    isLoading: boolean;
    error: Error | null;
}

const ImageTreeContext = createContext<ImageTreeContextType | undefined>(undefined);

const convertGrayscaleToColor = (
    imageId: ImageId, 
    callback: (dataUrl: string) => void
) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx?.drawImage(img, 0, 0);
        
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        if (!imageData) return;
        
        const targetRGB = {
            r: parseInt(imageId.color.slice(1, 3), 16),
            g: parseInt(imageId.color.slice(3, 5), 16),
            b: parseInt(imageId.color.slice(5, 7), 16)
        };
        
        for (let i = 0; i < imageData.data.length; i += 4) {
            const gray = imageData.data[i+3];
            
            imageData.data[i] = targetRGB.r;    
            imageData.data[i + 1] = targetRGB.g; 
            imageData.data[i + 2] = targetRGB.b; 
            imageData.data[i + 3] = gray;
        }
        
        ctx?.putImageData(imageData, 0, 0);
        callback(canvas.toDataURL());
    };
    
    img.src = imageId.source;
};

export const ImageTreeProvider: React.FC<{ children: React.ReactNode, images: string[], colors: string[] }> = ({ children, images, colors }) => {
    const [imageTree, setImageTree] = useState<ImageTree>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const convertAllImages = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            const promises: Promise<{key: ImageId, value: string}>[] = [];
            
            for (const color of colors) {
                for (const image of images) {
                    const imageId: ImageId = {source: image, color: color};
                    const promise = new Promise<{key: ImageId, value: string}>((resolve) => {
                        convertGrayscaleToColor(imageId, (coloredImage) => {
                            resolve({key: imageId, value: coloredImage});
                        });
                    });
                    promises.push(promise);
                }
            }
            
            const results = await Promise.all(promises);
            const originalSrcNodes: OriginalSrcNode[] = images.map((image) => ({src: image, colorNodes: [] as ColorNode[]}));
            
            for (const originalSrcNode of originalSrcNodes) {
                for (const color of colors) {
                    const coloredSrc = results.find(({key}) => key.source === originalSrcNode.src && key.color === color)?.value;
                    if (!coloredSrc) {
                        throw new Error(`Colored src not found for image: ${originalSrcNode.src}, color: ${color}`);
                    }
                    originalSrcNode.colorNodes.push({color: color, coloredSrc});
                }
            }
            console.log('Image tree completed.');
            setImageTree({ originalSrcNodes });
            setIsLoading(false);
        } catch (err) {
            console.error('Error occurred');
            setError(err instanceof Error ? err : new Error('Unknown error occurred'));
            setIsLoading(false);
        }
    }, [images, colors]);

    useEffect(() => {
        const loadImages = async () => {
            await convertAllImages();
        };

        loadImages();
    }, [convertAllImages]);

    return (
        <ImageTreeContext.Provider value={{ imageTree, isLoading, error }}>
            {children}
        </ImageTreeContext.Provider>
    );
};

export const useImageTree = () => {
    const context = useContext(ImageTreeContext);
    if (context === undefined) {
        throw new Error('useImageTree must be used within an ImageTreeProvider');
    }
    return context;
}; 