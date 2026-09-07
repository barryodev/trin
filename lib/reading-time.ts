type DocNode = {
  text?: string;
  children?: DocNode[];
};

const WORDS_PER_MINUTE = 200;

/**
 * Estimates reading time from a Keystatic `document` field's parsed AST
 * (the value you get from `await entry.content()`). Walks every node,
 * summing up text-node word counts.
 */
export function getReadingTime(document: unknown): string {
  const words = countWords(Array.isArray(document) ? (document as DocNode[]) : []);
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

function countWords(nodes: DocNode[]): number {
  return nodes.reduce((total, node) => {
    let count = total;
    if (typeof node.text === "string" && node.text.trim().length > 0) {
      count += node.text.trim().split(/\s+/).length;
    }
    if (node.children) {
      count += countWords(node.children);
    }
    return count;
  }, 0);
}
