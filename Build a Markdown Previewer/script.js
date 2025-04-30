const defaultMarkdown = `# Welcome to my Markdown Previewer!

## This is a sub-heading

[Visit FreeCodeCamp](https://www.freecodecamp.org)

Here's some inline code: \`<div></div>\`

\`\`\`
// This is a code block
function helloWorld() {
  console.log("Hello, world!");
}
\`\`\`

- List item one
- List item two

> This is a blockquote.

![FCC Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)

**Bold text is here!**
`;

function App() {
  const [markdown, setMarkdown] = React.useState(defaultMarkdown);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  return React.createElement("div", { className: "container" },
    React.createElement("h1", { className: "title" }, "Markdown Previewer"),
    React.createElement("div", { className: "editor-container" },
      React.createElement("textarea", {
        id: "editor",
        value: markdown,
        onChange: handleChange
      }),
      React.createElement("div", {
        id: "preview",
        dangerouslySetInnerHTML: {
          __html: marked.parse(markdown, { breaks: true })
        }
      })
    )
  );
}

ReactDOM.render(
  React.createElement(App),
  document.getElementById("root")
);
