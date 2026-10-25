import { RootDocument } from "@/components/root-document";
import { content } from "@/content";
import { buildMetadata, viewport } from "@/lib/site";

export const metadata = buildMetadata(content.en);
export { viewport };

export default function Layout({ children }: LayoutProps<"/en">) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
