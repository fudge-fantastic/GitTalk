import ReactMarkdown from "react-markdown";

export default function BeautifiedResponse({ rawText, className, ...props }: Readonly<{ rawText: string; className: string }>) {
  return (
    <div className={`prose prose-sm dark:prose-dark ${className}`}>
      <ReactMarkdown {...props}>{rawText}</ReactMarkdown>
    </div>
  );
}