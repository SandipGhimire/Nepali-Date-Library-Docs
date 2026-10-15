"use client";

import React, { useState } from "react";
import { Copy, Check, Terminal, Code2, Info } from "lucide-react";

interface MDXRendererProps {
  content: string;
}

interface CodeBlockItem {
  type: "code";
  language: string;
  code: string;
}

interface TextBlockItem {
  type: "text";
  text: string;
}

type BlockItem = CodeBlockItem | TextBlockItem;

export function MDXRenderer({ content }: MDXRendererProps) {
  if (!content) return null;

  const blocks = parseBlocks(content);

  return (
    <div className="mdx-content space-y-6 text-fd-foreground leading-relaxed">
      {blocks.map((block, idx) => {
        if (block.type === "code") {
          return (
            <CodeBlock
              key={idx}
              language={block.language || "bash"}
              code={block.code}
            />
          );
        }

        return <MarkdownTextBlock key={idx} text={block.text} />;
      })}
    </div>
  );
}

function parseBlocks(raw: string): BlockItem[] {
  const blocks: BlockItem[] = [];
  const lines = raw.split("\n");
  let inCode = false;
  let currentLang = "";
  let codeBuffer: string[] = [];
  let textBuffer: string[] = [];

  const flushText = () => {
    if (textBuffer.length > 0) {
      const text = textBuffer.join("\n").trim();
      if (text) {
        blocks.push({ type: "text", text });
      }
      textBuffer = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith("```")) {
      if (inCode) {
        blocks.push({
          type: "code",
          language: currentLang,
          code: codeBuffer.join("\n"),
        });
        codeBuffer = [];
        inCode = false;
      } else {
        flushText();
        inCode = true;
        currentLang = line.trim().slice(3).trim();
      }
    } else if (inCode) {
      codeBuffer.push(line);
    } else {
      textBuffer.push(line);
    }
  }

  if (inCode && codeBuffer.length > 0) {
    blocks.push({
      type: "code",
      language: currentLang,
      code: codeBuffer.join("\n"),
    });
  } else {
    flushText();
  }

  return blocks;
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 overflow-hidden rounded-xl border border-fd-border bg-fd-card shadow-sm">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between border-b border-fd-border/70 bg-fd-muted/50 px-4 py-2 text-xs font-mono text-fd-muted-foreground">
        <div className="flex items-center gap-1.5">
          {language === "bash" || language === "sh" || language === "shell" ? (
            <Terminal className="h-3.5 w-3.5 text-fd-primary" />
          ) : (
            <Code2 className="h-3.5 w-3.5 text-fd-primary" />
          )}
          <span className="font-semibold uppercase tracking-wider">{language || "code"}</span>
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-fd-border/60 bg-fd-background px-2.5 py-1 text-xs font-medium text-fd-muted-foreground transition-all hover:bg-fd-accent hover:text-fd-foreground"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-emerald-500 font-sans text-[11px]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span className="font-sans text-[11px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-fd-foreground bg-fd-background/50">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function MarkdownTextBlock({ text }: { text: string }) {
  const paragraphs = text.split("\n\n");

  return (
    <div className="space-y-4">
      {paragraphs.map((p, pIdx) => {
        const trimmed = p.trim();
        if (!trimmed) return null;

        // Heading 1
        if (trimmed.startsWith("# ")) {
          return (
            <h1 key={pIdx} className="text-3xl font-extrabold tracking-tight text-fd-foreground mt-8 mb-4 border-b border-fd-border/60 pb-3">
              {renderInline(trimmed.slice(2))}
            </h1>
          );
        }
        // Heading 2
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={pIdx} className="text-2xl font-bold tracking-tight text-fd-foreground mt-8 mb-4 border-b border-fd-border/60 pb-2">
              {renderInline(trimmed.slice(3))}
            </h2>
          );
        }
        // Heading 3
        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={pIdx} className="text-xl font-bold tracking-tight text-fd-foreground mt-6 mb-3">
              {renderInline(trimmed.slice(4))}
            </h3>
          );
        }
        // Heading 4
        if (trimmed.startsWith("#### ")) {
          return (
            <h4 key={pIdx} className="text-lg font-semibold tracking-tight text-fd-foreground mt-5 mb-2">
              {renderInline(trimmed.slice(5))}
            </h4>
          );
        }

        // Horizontal Rule
        if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
          return <hr key={pIdx} className="my-6 border-fd-border/60" />;
        }

        // Blockquote
        if (trimmed.startsWith("> ")) {
          const lines = trimmed.split("\n").map((l) => l.replace(/^>\s?/, ""));
          return (
            <blockquote key={pIdx} className="my-4 flex gap-3 rounded-xl border-l-4 border-fd-primary bg-fd-muted/30 p-4 text-sm text-fd-muted-foreground">
              <Info className="h-5 w-5 shrink-0 text-fd-primary mt-0.5" />
              <div className="space-y-1">{lines.map((l, i) => <p key={i}>{renderInline(l)}</p>)}</div>
            </blockquote>
          );
        }

        // Unordered List
        if (trimmed.split("\n").every((line) => /^\s*[-*]\s/.test(line))) {
          const items = trimmed.split("\n").map((l) => l.replace(/^\s*[-*]\s/, ""));
          return (
            <ul key={pIdx} className="my-4 ml-6 list-disc space-y-1.5 text-sm text-fd-foreground">
              {items.map((item, i) => (
                <li key={i}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }

        // Ordered List
        if (trimmed.split("\n").every((line) => /^\s*\d+\.\s/.test(line))) {
          const items = trimmed.split("\n").map((l) => l.replace(/^\s*\d+\.\s/, ""));
          return (
            <ol key={pIdx} className="my-4 ml-6 list-decimal space-y-1.5 text-sm text-fd-foreground">
              {items.map((item, i) => (
                <li key={i}>{renderInline(item)}</li>
              ))}
            </ol>
          );
        }

        // Regular Paragraph
        const lines = trimmed.split("\n");
        return (
          <p key={pIdx} className="text-sm leading-relaxed text-fd-foreground/90">
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {lIdx > 0 && <br />}
                {renderInline(line)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

function renderInline(text: string): React.ReactNode[] {
  const regex = /(`[^`]+`|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|_[^_]+_|\*[^*]+\*)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Inline Code: `code`
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      const codeText = part.slice(1, -1);
      return (
        <code
          key={index}
          className="rounded-md border border-fd-border/70 bg-fd-muted px-1.5 py-0.5 font-mono text-xs font-semibold text-fd-primary"
        >
          {codeText}
        </code>
      );
    }

    // Link: [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target={linkMatch[2].startsWith("http") ? "_blank" : undefined}
          rel={linkMatch[2].startsWith("http") ? "noreferrer noopener" : undefined}
          className="font-medium text-fd-primary underline underline-offset-4 transition-colors hover:text-fd-primary/80"
        >
          {linkMatch[1]}
        </a>
      );
    }

    // Bold: **text**
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={index} className="font-bold text-fd-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Italic: *text* or _text_
    if (
      (part.startsWith("*") && part.endsWith("*") && part.length > 2) ||
      (part.startsWith("_") && part.endsWith("_") && part.length > 2)
    ) {
      return (
        <em key={index} className="italic text-fd-foreground/90">
          {part.slice(1, -1)}
        </em>
      );
    }

    return part;
  });
}
