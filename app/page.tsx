import PageSection from "./PageSection";
import { Analytics } from "@vercel/analytics/next"

const uploadDisabled = process.env.ALLOW_UPLOAD !== "YES";

export default function Home() {
 return (
 <>
    <PageSection uploadDisabled={uploadDisabled}/>
    <Analytics />
 </>)
}
