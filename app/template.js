export default ({ body, title }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
      </head>

      <body>
        <div id="app">${body}</div>
        <script src="/bundle.js" type="javascript"></script>
      </body>
    </html>
  `;
};
