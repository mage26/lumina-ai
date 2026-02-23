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
        <div className="flex min-h-screen items-center justify-center bg-background font-sans"
            style={{
                "--color-primary" : colors?.primaryHex ? colors.primaryHex : '',
                "--color-secondary" : colors?.secondaryHex ? colors.secondaryHex : '',
                "--color-accent" : colors?.accentHex ? colors.accentHex : '',
                "--color-primarycontrast" : colors?.primaryIsLight ? '#000000' : '#ffffff',
                "--color-secondarycontrast" : colors?.secondaryIsLight ? '#000000' : 'var(--foreground)',
                "--color-accentcontrast" : colors?.accentIsLight ? '#000000' : 'var(--foreground)',
            } as CSSProperties}
        >
            <main className="flex min-h-screen w-full max-w-5xl flex-col items-center text-black sm:items-start">
                {!isLoading && !metadata && !colors && !analysis && (
                    <UploadSection 
                        onUploadBegin={() => setIsLoading(true)}
                        onUploadComplete={(data) => {
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
                <div className="absolute top-0 text-center w-full left-0">
                    Created by <a href="http://www.benberlinfrontend.com" target="_blank" className="underline text-blue-400">Benjamin Berlin</a>
                </div>
            </main>
        </div>
    );
}