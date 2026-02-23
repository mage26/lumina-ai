const prompt = `Act as a Senior Media Analyst. Analyze the image and return ONLY a JSON object:

{
  "assetMetadata": { "title": "", "description": "", "altText": "", "tags": [] },
  "designTokens": { "primaryHex": "", "primaryIsLight": bool, "secondaryHex": "", "secondaryIsLight": bool, "accentHex": "", "accentIsLight": bool, "vibe": "" },
  "aiAnalysis": { "compositionScore": 0.0-1.0, "compositionAnalysis": "", "primarySubjects": [], "spatialAnalysis": "", "improvements": "" }
}

GUIDELINES:
- description: max 160 chars.
- tags: top 5.
- HEX codes: high-contrast, UI-ready.
- All suggested colors should stand out against a white background.
- spatialAnalysis: subjects' relation & placement.
- Return valid JSON only. No markdown or prose.`;

export default prompt;