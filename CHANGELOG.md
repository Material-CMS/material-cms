0.0.4

Added start and and cursor filters.
0.1.0

Added year, month and day cursor filters, which are suitable for use with the piecesFilters option.
0.4.0

Fixed a significant performance bug. The events widget was fetching every widget rather than just those with the appropriate IDs. The set of results was then being winnowed by the algorithm for handling many widgets with one query, but not before considerable resources were spent fetching areas for those events, etc.
0.6.0

Changed to materialized, added custom fields for icons and description, removed events-pages
