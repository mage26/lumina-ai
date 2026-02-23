import { analysisType } from "../types";
import Section from "@/components/Section";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';

ChartJS.register(ArcElement);

export default function Analysis({analysis} : {analysis: analysisType}) {
    const compositionScore = Math.round(analysis.compositionScore * 100);
    const compositionColor = compositionScore >= 75 ? '#6bb63c' :
                            compositionScore >= 45 ? '#ead71b' : '#f1173a';
    return (
        <Section className="md:w-[63%]" title="IMAGE DIAGNOSTICS">
            <p className="font-bold text-accent mt-4 mb-2">PRIMARY SUBJECTS</p>
            <p className="capitalize">{analysis.primarySubjects.join(', ')}</p>
            <p className="font-bold text-accent mt-4 mb-2">COMPOSITION ANALYSIS</p>
            <div className="flex gap-8 items-center flex-col-reverse md:flex-row">
                <p>{analysis.compositionAnalysis}</p>
                <div className="size-40 relative">
                    <Doughnut data={{
                        datasets: [
                            {
                                data: [compositionScore, 100 - compositionScore],
                                backgroundColor: [compositionColor, '#cccccc']
                            }]
                        }} 
                        options={{
                            cutout: '75%'
                        }}
                    />
                    <span className="absolute text-xl font-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{color: compositionColor}}>{compositionScore}%</span>
                </div>
            </div>
            <p className="font-bold text-accent mt-4 mb-2">SPATIAL ANALYSIS</p>
            <p>{analysis.spatialAnalysis}</p>
            <p className="font-bold text-accent mt-4 mb-2">SUGGESTED IMPROVEMENTS</p>
            <p>{analysis.improvements}</p>
        </Section>
    )
}