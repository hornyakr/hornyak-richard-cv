import { RootDocument } from "@/components/root-document";
import { content } from "@/content";
import { buildMetadata, viewport } from "@/lib/site";

export const metadata = buildMetadata(content.hu);
export { viewport };

export default function Layout({ children }: LayoutProps<"/">) {
  return <RootDocument locale="hu">{children}</RootDocument>;
}
