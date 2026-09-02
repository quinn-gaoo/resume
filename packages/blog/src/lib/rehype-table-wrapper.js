import { visit } from "unist-util-visit";

/**
 * Wrap Markdown tables in a bounded scroll container so wide tables remain
 * readable on narrow screens without expanding the page viewport.
 */
export default function rehypeTableWrapper() {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (!parent || node.tagName !== "table") {
        return;
      }

      parent.children[index] = {
        type: "element",
        tagName: "div",
        properties: {
          className: ["table-wrapper"],
          tabIndex: 0,
          role: "region",
          ariaLabel: "可横向滚动的表格",
        },
        children: [node],
      };
    });
  };
}
