// Changing the allowed HTML tags in rich text widgets
module.exports = {
  sanitizeHtml: {
    allowedTags: [
      'h2', 'h3', 'h4', 'p', 'a', 'ul', 'ol', 'li', 'strong', 'em', 'blockquote', 'iframe'
    ],
    allowedAttributes: {
      '*': ['style', 'class'],
      a: [ 'style', 'name', 'href', 'target', 'rel', 'class' ]
    },
    allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'tel']
  }
};
