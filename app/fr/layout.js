import LocalizedRoot from "@/components/localized-root";
export { viewport } from "../(nl)/layout";
export { metadata } from "../(nl)/layout";
export default function FrenchLayout({children}) { return <LocalizedRoot locale="fr-BE">{children}</LocalizedRoot>; }
