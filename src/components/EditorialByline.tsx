import Link from "next/link";
import { person } from "@/resources/content";
import { formatDate } from "@/utils/formatDate";

export function EditorialByline({ updatedAt }: { updatedAt: string }) {
  return <p className="editorialByline">By <Link rel="author" href="/professional-experience">{person.name}</Link>
    <span aria-hidden="true"> · </span>Updated <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
  </p>;
}
