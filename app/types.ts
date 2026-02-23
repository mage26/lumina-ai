export type metadataType = {
    title: string;
    description: string;
    altText: string;
    tags: string[];
}
export type colorsType = { 
    primaryHex: string;
    secondaryHex: string;
    accentHex: string;
    primaryIsLight: boolean;
    secondaryIsLight: boolean;
    accentIsLight: boolean;
    vibe: string;
};
export type analysisType = {
    compositionScore: number;
    compositionAnalysis: string;
    primarySubjects: string[];
    spatialAnalysis: string;
    improvements: string;
}