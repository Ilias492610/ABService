import Link from "next/link";
import JsonLd from "@/components/json-ld";
import { buildBreadcrumbSchema } from "@/libs/schema-data.mjs";

export default function Breadcrumbs({ items }) {
  return (
    <>
      <nav className="breadcrumbs shell" aria-label="Kruimelpad">
        <ol>
          {items.map((item, index) => (
            <li key={item.path}>
              {index < items.length - 1 ? (
                <Link href={item.path}>{item.name}</Link>
              ) : (
                <span aria-current="page">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={buildBreadcrumbSchema(items)} id="breadcrumb-schema" />
    </>
  );
}
