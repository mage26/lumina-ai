import { metadataType } from "../types";
import CopyText from "@/components/CopyText";
import Section from "@/components/Section";

type Props = { 
    metadata: metadataType,
}

export default function Metadata({metadata }: Props) {
    return (
        <Section className="md:w-1/3" title="METADATA">
            <ul className=''>
                <li>
                    <CopyText 
                        name="TITLE"
                        value={metadata.title}   
                    />
                </li>
                <li>
                <CopyText 
                    name="ALT TEXT"
                    value={metadata.altText} 
                />
                </li>
                <li>
                    <CopyText 
                        name="DESCRIPTION"
                        value={metadata.description} 
                    />
                </li>
                <li>
                    <div className="flex justify-between gap-4 mb-5 items-center">
                        <span className="font-bold text-accent">TAGS</span>
                        <button 
                            type="button"
                            className="py-1 px-2 bg-background rounded-lg block cursor-pointer hover:text-accentcontrast hover:bg-accent"
                            onClick={() => { navigator.clipboard.writeText(metadata.tags.join(', '))}}
                        >
                            COPY
                        </button>
                    </div>
                    <ul>
                         {metadata.tags.map((tag, k) => (
                            <li key={`${tag}-${k}`} className='bg-secondary rounded-full p-2 inline-block text-secondarycontrast m-1'>
                                {tag}
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </Section>
    )
}