export default ({ body, title, preloadedState }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="styles.css">
        <title>${title}</title>
      </head>

      <body>
        <div id="app">${body}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `;
};
