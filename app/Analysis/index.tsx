'use client';

import Image from "next/image";
import { metadataType, colorsType, analysisType } from "../types";
import Metadata from "./Metadata";
import Colors from "./Colors";
import AnalysisSection from "./Analysis";
import Section from "@/components/Section";
import Title from "@/components/Title";

type Props = {
    imageData: string,
    metadata: metadataType,
    colors: colorsType;
    analysis: analysisType;
}

export default function Analysis({metadata, colors, imageData, analysis }: Props) {
    return ( 
    <section className="w-full flex flex-wrap gap-6 py-10 px-4">
        <Section className=" md:w-[63%]" title="IMAGE">
            <div className="h-[calc(100%-60px)] relative">
                <Image
                    src={imageData}
                    alt={metadata.altText}
                    fill
                    className="object-contain object-center"
                />
            </div>
        </Section>
        <Metadata metadata={metadata} />
        <Colors colors={colors} />
        <AnalysisSection analysis={analysis} />
 
    </section>)
}