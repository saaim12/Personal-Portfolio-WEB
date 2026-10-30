import Link from "next/link";

export function EditorialContents({ items }: { items: { id: string; title: string }[] }) {
  return <nav className="engineeringContents" aria-label="On this page">
    <h2>On this page</h2>
    <ol>{items.map(item => <li key={item.id}><Link href={`#${item.id}`}>{item.title}</Link></li>)}</ol>
  </nav>;
}
