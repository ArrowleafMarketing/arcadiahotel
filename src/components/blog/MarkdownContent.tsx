import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import GithubSlugger from "github-slugger";

export function MarkdownContent({ content }: { content: string }) {
  const slugger = new GithubSlugger();
  slugger.reset();

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children, ...props }) => (
          <h1
            className="mt-10 mb-6 text-[clamp(2.2rem,3.4vw,3rem)] font-light leading-[1.1] tracking-[-0.05em] text-[#111111]"
            {...props}
          >
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => {
          const text = String(children ?? "");
          const id = slugger.slug(text);
          return (
            <h2
              id={id}
              className="mt-12 mb-5 scroll-mt-28 text-[clamp(1.8rem,2.6vw,2.4rem)] font-light leading-[1.15] tracking-[-0.045em] text-[#111111]"
              {...props}
            >
              {children}
            </h2>
          );
        },
        h3: ({ children, ...props }) => (
          <h3
            className="mt-8 mb-4 text-[clamp(1.4rem,1.9vw,1.75rem)] font-light tracking-[-0.04em] text-[#111111]"
            {...props}
          >
            {children}
          </h3>
        ),
        p: ({ children, ...props }) => (
          <p
            className="mb-6 text-[1.08rem] leading-[1.85] tracking-[-0.02em] text-[#4c4c48]"
            {...props}
          >
            {children}
          </p>
        ),
        a: ({ children, ...props }) => (
          <a
            className="font-medium text-[#1f231f] underline decoration-[#9ec29e] decoration-2 underline-offset-4 transition-colors hover:text-[#111111]"
            {...props}
          >
            {children}
          </a>
        ),
        ul: ({ children, ...props }) => (
          <ul
            className="mb-8 list-disc space-y-2 pl-6 text-[1.08rem] leading-[1.85] text-[#4c4c48] marker:text-[#9ec29e]"
            {...props}
          >
            {children}
          </ul>
        ),
        ol: ({ children, ...props }) => (
          <ol
            className="mb-8 list-decimal space-y-2 pl-6 text-[1.08rem] leading-[1.85] text-[#4c4c48] marker:text-[#8a8a84]"
            {...props}
          >
            {children}
          </ol>
        ),
        li: ({ children, ...props }) => (
          <li className="pl-1 leading-[1.8]" {...props}>
            {children}
          </li>
        ),
        strong: ({ children, ...props }) => (
          <strong className="font-semibold text-[#111111]" {...props}>
            {children}
          </strong>
        ),
        blockquote: ({ children, ...props }) => (
          <blockquote
            className="my-8 rounded-r-[12px] border-l-4 border-[#9ec29e] bg-accent-green/40 py-4 pl-6 pr-4 text-[1.08rem] italic leading-[1.8] text-[#3d423c]"
            {...props}
          >
            {children}
          </blockquote>
        ),
        table: ({ children, ...props }) => (
          <div className="my-8 overflow-x-auto rounded-[14px] ring-1 ring-[#e2ded7]">
            <table className="w-full border-collapse text-left text-[1rem]" {...props}>
              {children}
            </table>
          </div>
        ),
        thead: ({ children, ...props }) => (
          <thead className="bg-[#111111] text-white" {...props}>
            {children}
          </thead>
        ),
        tbody: ({ children, ...props }) => (
          <tbody className="divide-y divide-[#e2ded7]" {...props}>
            {children}
          </tbody>
        ),
        tr: ({ children, ...props }) => (
          <tr className="even:bg-[#f7f5f0]" {...props}>
            {children}
          </tr>
        ),
        th: ({ children, ...props }) => (
          <th className="px-4 py-3 text-sm font-medium tracking-[-0.01em]" {...props}>
            {children}
          </th>
        ),
        td: ({ children, ...props }) => (
          <td className="px-4 py-3 text-[#4c4c48]" {...props}>
            {children}
          </td>
        ),
        hr: ({ ...props }) => (
          <hr className="my-10 border-[#e2ded7]" {...props} />
        ),
        img: ({ ...props }) => (
          // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
          <img className="my-8 w-full rounded-[16px]" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
