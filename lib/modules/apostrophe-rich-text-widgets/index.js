module.exports = {
  sanitizeHtml: {
    allowedTags: [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
      'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
      'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre',
      'sup', 'sub'
    ],
    allowedAttributes: {
      '*': ['style', 'color', 'class'],
      a: [ 'style', 'href', 'name', 'target' ],
      img: [ 'src' ]
    },
    selfClosing: [ 'img', 'br', 'hr', 'area', 'base', 'basefont',
      'input', 'link', 'meta' ],
    allowedSchemes: [ 'http', 'https', 'ftp', 'mailto' ],
    allowedSchemesByTag: {}
  }
};
