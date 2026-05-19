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
          const languageClass = className.find((c) =>
            c.startsWith("language-"),
          );
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
                  onclick: `(function(btn, text) {
                    var textarea = document.createElement('textarea');
                    textarea.value = text;
                    textarea.style.cssText = 'position:fixed;top:0;left:0;width:2em;height:2em;padding:0;border:none;outline:none;box-shadow:none;background:transparent;';
                    document.body.appendChild(textarea);
                    textarea.select();
                    textarea.setSelectionRange(0, 99999);
                    var success = false;
                    try {
                      success = document.execCommand('copy');
                    } catch (e) {
                      console.error('Copy failed:', e);
                    }
                    document.body.removeChild(textarea);
                    if (success) {
                      btn.classList.add('copied');
                      var span = btn.querySelector('span');
                      if (span) span.textContent = 'Copied!';
                      setTimeout(function() {
                        btn.classList.remove('copied');
                        if (span) span.textContent = 'Copy';
                      }, 2000);
                    } else {
                      alert('Copy failed. Please copy manually.');
                    }
                  })(this, ${JSON.stringify(codeContent)})`,
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
                      {
                        type: "text",
                        value: `<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>`,
                      },
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
