import ReactMarkdown, { Components } from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';

export const SafeMarkdownRenderer = ({
  markdown,
  components
}: {
  markdown: string;
  components: Components | null | undefined;
}) => (
  <ReactMarkdown rehypePlugins={[rehypeSanitize]} components={components}>
    {markdown}
  </ReactMarkdown>
);
