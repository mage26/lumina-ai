'use client';
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import analyzeImage from "@/app/api/analyzeImage";
import { metadataType, colorsType, analysisType } from "@/app/types";

type uploadCompleteType = {
    assetMetadata: metadataType,
    designTokens: colorsType,
    aiAnalysis: analysisType,
    imageData: string;
}

type Props = {
    uploadDisabled: boolean;
    onUploadBegin: () => void;
    onUploadComplete: (data: uploadCompleteType) => void;
    onUploadError: (error: string) => void;
    errorMessage?: string;
};

export default function UploadSection({uploadDisabled, onUploadBegin, onUploadComplete, onUploadError, errorMessage}: Props) {

    const onDrop = useCallback((acceptedFiles: File[]) => {
        
        if(acceptedFiles.length === 0) { 
            onUploadError("Please upload a single image that is 2mb or less.")
            return; 
        }

        const selectedFile = acceptedFiles[0];
        onUploadBegin();
        const reader = new FileReader();
        reader.onloadend = async (e) => {
            const imageData = reader.result as string;
            const base64 = (imageData).split(",")[1];
            const data = await analyzeImage(base64, selectedFile.type);
            if(data.response === 'success' && data.data) {
                onUploadComplete({
                    ...data.data,
                    imageData,
                });
            } 
            else if(data.response === 'error') {
                onUploadError(data.error);
            }
        }
        reader.readAsDataURL(selectedFile);
        
    }, [onUploadBegin, onUploadComplete, onUploadError]);

    const {getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxFiles: 1,
        maxSize: 2000000,
    });

    return (
       <section className="bg-foreground p-16 min-h-screen text-center w-full relative mx-auto flex flex-col gap-6">
            <h1 className="font-black text-2xl">AI-Driven Media Orchestrator</h1>
            <p className="font-bold text-xl">Upload an image to Extract its DNA:</p>
            <ul className="list-disc list-inside">
                <li><strong>Accessible Metadata</strong>: Including Alt Text, Title, Description and Tags</li>
                <li><strong>Design System Analysis</strong>: Primary, Secondary, and Accent colors</li>
                <li><strong>Image Analysis</strong>: Composition, Spacial Analysis</li>
            </ul>
            <p>Because this is a free app, uploads are limited to 2mb and 1 image at a time</p>
            <p>No information is saved on any servers. All image data is sent to Gemini inline with the request and is not saved.</p>
            {errorMessage && (
                <p className="text-red-500">{errorMessage}</p>
            )}
            {!uploadDisabled && (
                <div {...getRootProps()} className="flex justify-center items-center text-center h-75 w-full max-w-md border-2 border-dashed border-black mx-auto cursor-pointer">
                    <input {...getInputProps()} />
                    <p>Drag n Drop your image here. Or click to select an image.</p>
                </div>
            )}
            {uploadDisabled && (
                <p className="text-red-500 text-xl">Thank you for your interest in this app. It is currently unavailable. Please check again soon.</p>
            )}
            
            
        </section>
    )
}