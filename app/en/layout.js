import LocalizedRoot from "@/components/localized-root";
export { viewport } from "../(nl)/layout";
export { metadata } from "../(nl)/layout";
export default function EnglishLayout({children}) { return <LocalizedRoot locale="en-BE">{children}</LocalizedRoot>; }
