import { colorsType } from '../types';
import Section from '@/components/Section';

type Props = {
    colors: colorsType;
}
export default function Colors({ colors }: Props) {
    return (
        <Section className="md:w-1/3 text-center" title="COLOR INTELLIGENCE">
            <p>{colors.vibe}</p>
            <ul className="flex gap-8 justify-center md:justify-between items-center flex-wrap md:flex-col mt-4">
                <li className="bg-primary text-primarycontrast rounded-full size-36 flex justify-center items-center text-sm text-center">
                    PRIMARY COLOR: {colors.primaryHex}
                   
                </li>
                <li className="bg-secondary text-secondarycontrast rounded-full size-36 flex justify-center items-center text-sm text-center">
                    SECONDARY COLOR: {colors.secondaryHex}
                </li>
                <li className="bg-accent text-accentcontrast rounded-full size-36 flex justify-center items-center text-sm text-center">
                    ACCENT COLOR: {colors.accentHex}
                </li>
            </ul>
        </Section>
    )
}