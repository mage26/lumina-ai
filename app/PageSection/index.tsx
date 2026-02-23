'use client';

import { useState, CSSProperties } from "react";
import UploadSection from "../Upload";
import Analysis from "../Analysis";
import Loading from '../Loading';
import { metadataType, colorsType, analysisType } from "../types";

export default function PageSection({uploadDisabled} : {uploadDisabled: boolean;}) {
    const [isLoading, setIsLoading] = useState(false);
    const [metadata, setMetadata] = useState<metadataType | null>(null);
    const [colors, setColors] = useState<colorsType | null>(null);
    const [analysis, setAnalysis] = useState<analysisType | null>(null);
    const [imageData, setImageData] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string>('');

    return (
        <main className="flex flex-col min-h-screen items-center justify-center bg-background font-sans"
            style={{
                "--color-primary" : colors?.primaryHex ? colors.primaryHex : '',
                "--color-secondary" : colors?.secondaryHex ? colors.secondaryHex : '',
                "--color-accent" : colors?.accentHex ? colors.accentHex : '',
                "--color-primarycontrast" : colors?.primaryIsLight ? '#000000' : '#ffffff',
                "--color-secondarycontrast" : colors?.secondaryIsLight ? '#000000' : 'var(--foreground)',
                "--color-accentcontrast" : colors?.accentIsLight ? '#000000' : 'var(--foreground)',
            } as CSSProperties}
        >
            <div className="w-full max-w-5xl text-black">
                {!isLoading && !metadata && !colors && !analysis && (
                    <UploadSection 
                        onUploadBegin={() => setIsLoading(true)}
                        onUploadComplete={(data) => {
                            console.log("DATA", data);
                            setIsLoading(false);
                            setMetadata(data.assetMetadata);
                            setColors(data.designTokens);
                            setAnalysis(data.aiAnalysis);
                            setImageData(data.imageData);
                        }}
                        onUploadError={(error) => {
                            setErrorMessage(error);
                            setIsLoading(false);
                        }}
                        errorMessage={errorMessage}
                        uploadDisabled={uploadDisabled}
                    /> 
                )}
                {isLoading && (
                    <Loading />
                )}
                {metadata && colors && analysis && imageData && (
                   <Analysis
                        metadata={metadata}
                        colors={colors}
                        imageData={imageData}
                        analysis={analysis}
                    />
                )}
                
            </div>
            <footer className="relative text-center w-full p-4 flex flex-col gap-4 bg-primary text-primarycontrast max-w-5xl">
                <p>Created by <a href="http://www.benberlinfrontend.com" target="_blank" className="underline">Benjamin Berlin</a></p>
                <p>Analyzed with Google AI.</p> 
                <p>AI-generated content may be inaccurate or misleading. Verify important information and do not rely on this analysis for professional, medical, or legal advice.</p>
                <p>No image or personal information is saved on any servers. This is not being used to train any AI models.</p>
                <p>Use of AI is intended only for users age 18 or older.</p>
            </footer>
        </main>
    );
}