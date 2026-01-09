// Add additional fields to all pages
module.exports = {
  beforeConstruct: function(self, options) {
    options.addFields = [
      {
        name: 'seoTitle',
        label: 'SEO Title',
        type: 'multilingual-string',
        help: 'Defines the title of the page in search results. Recommended length: 50-60 characters.',
        seoSoftMax: 60,
        tab: 'SEO'
      },
      {
        name: 'seoDescription',
        label: 'SEO Description',
        type: 'multilingual-string',
        textarea: true,
        help: 'Summarizes the page content for search results. Recommended length: 50-160 characters.',
        seoSoftMin: 50,
        seoSoftMax: 160,
        tab: 'SEO'
      },
      {
        name: 'seoRobots',
        label: 'Robots Meta Tag',
        type: 'checkboxes',
        choices: [
          {
            value: 'noindex',
            label: 'No Index (noindex)'
          },
          {
            value: 'nofollow',
            label: 'No Follow (nofollow)'
          },
          {
            value: 'noarchive',
            label: 'No Archive (noarchive)'
          },
          {
            value: 'nosnippet',
            label: 'No Snippet (nosnippet)'
          },
          {
            value: 'noimageindex',
            label: 'No Image Index (noimageindex)'
          }
        ],
        help: 'Control how search engines index and follow links on this page.',
        tab: 'SEO'
      },
      {
        name: 'openGraphTitle',
        label: 'Open Graph Title',
        type: 'multilingual-string',
        help: 'Title for social media sharing (Facebook, LinkedIn, etc.). If empty, SEO Title will be used.',
        tab: 'Open Graph'
      },
      {
        name: 'openGraphDescription',
        label: 'Open Graph Description',
        type: 'multilingual-string',
        textarea: true,
        help: 'Description for social media sharing. If empty, SEO Description will be used.',
        tab: 'Open Graph'
      },
      {
        name: 'openGraphType',
        label: 'Open Graph Type',
        type: 'select',
        choices: [
          {
            value: 'website',
            label: 'Website'
          },
          {
            value: 'article',
            label: 'Article'
          },
          {
            value: 'profile',
            label: 'Profile'
          },
          {
            value: 'book',
            label: 'Book'
          }
        ],
        def: 'website',
        help: 'The type of content being shared.',
        tab: 'Open Graph'
      },
      {
        name: 'openGraphImage',
        label: 'Open Graph Image',
        type: 'singleton',
        widgetType: 'apostrophe-images',
        options: {
          limit: 1,
          aspectRatio: [1200, 630],
          minSize: [600, 315],
          focalPoint: true
        },
        help: 'Image displayed when sharing on social media. Recommended size: 1200×630 pixels.',
        tab: 'Open Graph'
      }
    ].concat(options.addFields || []);
    
    // Ensure tabs are defined
    options.arrangeFields = (options.arrangeFields || []).concat([
      {
        name: 'seo',
        label: 'SEO',
        fields: ['seoTitle', 'seoDescription', 'seoRobots'],
        last: true
      },
      {
        name: 'openGraph',
        label: 'Open Graph',
        fields: ['openGraphTitle', 'openGraphDescription', 'openGraphType', 'openGraphImage'],
        last: true
      }
    ]);
  }
};
