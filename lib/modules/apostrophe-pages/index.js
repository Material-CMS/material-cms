module.exports = {
  filters: {
    ancestors: {
      children: {
        depth: 2
      }
    },
    children: true
  },
  types: [
    {
      name: 'home',
      label: 'Home/Sections'
    },
    {
      name: 'sections-pages',
      label: 'Infinite Sections',
    },
    {
      name: 'texts-pages',
      label: 'Texts'
    },
    {
      name: 'galleries-pages',
      label: 'Galleries'
    },
    {
      name: 'people-pages',
      label: 'People'
    },
    {
      name: 'tables-pages',
      label: 'Tables'
    }
  ],
  minimumPark: [
    {
      slug: '/',
      published: true,
      _defaults: {
        title: 'Home',
        type: 'home',
        shadow: true
      },
      _children: [
        {
          slug: '/trash',
          type: 'trash',
          trash: true,
          published: false,
          orphan: true,
          _defaults: {
            title: 'Trash'
          },
        }
      ]
    }
  ],
  // Populate apos.area "navigationArea" with default navigation
  // THIS IS NICE! to prepopulate areas or singletons
  construct: function(self, options) {
    self.beforeInsert = function(req, page, options, callback) {
      page.navigationArea = {
        "type" : "area",
        "items" : [
          {
            "by" : "id",
            "limitByAll" : 5,
            "limitByTag" : 5,
            "navShadow" : false,
            "linksArray" : [ ],
            "_id" : self.apos.utils.generateId(),
            "nav" : "default",
            "pieceIds" : [ ],
            "logoId" : null,
            "navBackgroundImageId" : null,
            "navColor" : null,
            "navTextColor" : null,
            "gradientColorTop" : null,
            "gradientColorBottom" : null,
            "tags" : [ ],
            "type" : "navigations"
          }
        ]
      },
      page.footerArea = {
        "type" : "area",
        "items" : [
          {
            "by" : "id",
            "limitByAll" : 5,
            "limitByTag" : 5,
            "navShadow" : false,
            "linksArray" : [ ],
            "_id" : self.apos.utils.generateId(),
            "nav" : "default",
            "pieceIds" : [ ],
            "logoId" : null,
            "navBackgroundImageId" : null,
            "navColor" : null,
            "navTextColor" : null,
            "gradientColorTop" : null,
            "gradientColorBottom" : null,
            "tags" : [ ],
            "type" : "footer"
          }
        ]
      }
      return setImmediate(callback);
    };
  }
};
