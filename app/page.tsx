import PageSection from "./PageSection";

const uploadDisabled = process.env.ALLOW_UPLOAD !== "YES";

export default function Home() {
 return (<><PageSection 
    uploadDisabled={uploadDisabled}
 /></>)
}
