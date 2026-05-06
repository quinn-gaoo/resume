import { visit } from "unist-util-visit";

const languageNames = {
  javascript: "JavaScript",
  js: "JavaScript",
  python: "Python",
  py: "Python",
  typescript: "TypeScript",
  ts: "TypeScript",
  go: "Go",
  rust: "Rust",
  html: "HTML",
  css: "CSS",
  sql: "SQL",
  bash: "Bash",
  shell: "Shell",
  json: "JSON",
  yaml: "YAML",
  markdown: "Markdown",
  md: "Markdown",
  java: "Java",
  cpp: "C++",
  c: "C",
  ruby: "Ruby",
  php: "PHP",
  swift: "Swift",
  kotlin: "Kotlin",
  dart: "Dart",
  scala: "Scala",
  haskell: "Haskell",
  lua: "Lua",
  perl: "Perl",
  r: "R",
  matlab: "MATLAB",
  dockerfile: "Dockerfile",
  toml: "TOML",
  vue: "Vue",
  react: "React",
  jsx: "JSX",
  tsx: "TSX",
  sass: "Sass",
  scss: "SCSS",
};

export default function rehypeCodeBlock() {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "pre" && node.children.length > 0) {
        const codeNode = node.children[0];
        if (codeNode && codeNode.tagName === "code") {
          const className = codeNode.properties?.className || [];
          const languageClass = className.find((c) => c.startsWith("language-"));
          let language = "Code";
          
          if (languageClass) {
            const lang = languageClass.replace("language-", "");
            language = languageNames[lang] || lang || "Code";
          }

          const codeContent = codeNode.children[0]?.value || "";
          
          const headerNode = {
            type: "element",
            tagName: "div",
            properties: { className: ["code-header"] },
            children: [
              {
                type: "element",
                tagName: "span",
                properties: { className: ["language-label"] },
                children: [{ type: "text", value: language }],
              },
              {
                type: "element",
                tagName: "button",
                properties: {
                  className: ["copy-btn"],
                  onclick: `navigator.clipboard.writeText(${JSON.stringify(codeContent)}).then(() => { this.classList.add('copied'); setTimeout(() => this.classList.remove('copied'), 2000); })`,
                  title: "Copy code",
                },
                children: [
                  {
                    type: "element",
                    tagName: "svg",
                    properties: {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "14",
                      height: "14",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                    },
                    children: [
                      { type: "text", value: `<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>` },
                    ],
                  },
                  { type: "text", value: "Copy" },
                ],
              },
            ],
          };

          node.children.unshift(headerNode);
        }
      }
    });
  };
}
