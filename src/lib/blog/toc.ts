import GithubSlugger from "github-slugger";

export type TocItem = { id: string; label: string };

/**
 * Extract a TOC from markdown by reading H2 headings (##).
 * Returns items with stable ids (GitHub style) that match our Markdown renderer.
 */
export function extractTocFromMarkdown(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  slugger.reset();

  const lines = markdown.split("\n");
  const items: TocItem[] = [];

  for (const line of lines) {
    // Only H2 headings become TOC items for the sidebar
    if (!line.startsWith("## ")) continue;

    const label = line.replace(/^##\s+/, "").trim();
    if (!label) continue;

    const id = slugger.slug(label);
    items.push({ id, label });
  }

  return items;
}
