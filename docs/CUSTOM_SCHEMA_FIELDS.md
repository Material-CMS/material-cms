# Custom Schema Field Types in ApostropheCMS

## Problem Summary

When implementing a custom schema field type that stores structured data (objects), you may encounter:

1. **Field data appears empty in rendered HTML** (`data.widget.field` shows `{}`)
2. **Template filters receive `[object Object]`** instead of actual values
3. **Database persistence works, but front‑end serialization fails**

## Root Cause: `filterForDataAttribute`

Apostrophe's widget serialization uses `filterForDataAttribute` → `clonePermanent` which strips properties starting with `_` (except `_id`). If your field stores data in `_someProperty`, it will be removed from the widget's `data` attribute, leaving an empty object `{}`.

### How It Works

```javascript
// In apostrophe-widgets/index.js
self.filterForDataAttribute = function(widget) {
  var data = self.apos.utils.clonePermanent(widget, true);
  // ...
};
```

`clonePermanent` keeps only properties whose names **do NOT** start with `_` (except `_id`). This is intentional to remove join results (`_pieces`, `_images`, etc.) from front‑end markup.

## The Solution: Avoid Underscore‑prefixed Property Names

Store your structured data in a property **without** a leading underscore. Example:

**❌ Don't:**
```javascript
{
  _translations: { en: 'Hello', de: 'Hallo' }
}
```

**✅ Do:**
```javascript
{
  translations: { en: 'Hello', de: 'Hallo' }
}
```

If you need backward compatibility with existing `_translations` data, store **both** properties in your converter:

```javascript
// In your field type's CSV converter
result.translations = translations;
result._translations = translations; // for existing data
```

## Debugging Checklist

1. **Check the widget's data attribute**
   ```bash
   ./scripts/tools/html_inspect.sh --json http://localhost:3000 | grep -A5 'data-apos-widget-id'
   ```
   Look for `data='{...}'`. If your field is `{}`, serialization is stripping it.

2. **Inspect MongoDB**
   ```bash
   mongosh material-cms --quiet --eval 'db.aposDocs.findOne({ _id: "..." }, { "content.items.field": 1 })'
   ```
   Verify the data is stored correctly in the database.

3. **Add console logs to your converter**
   ```javascript
   csv: function(req, data, name, object, field, callback) {
     console.log('csv converter called', name, 'value:', data[name]);
     console.log('object before setting:', object);
     object[name] = result;
     console.log('object after setting:', object);
   }
   ```

4. **Verify browser‑side convert/populate**
   - Check browser console for registration logs
   - Ensure `convert` method is being called (add `console.log`)

## Example Implementation Pattern

### Server‑side (`index.js`)

```javascript
self.addFieldType = function() {
  self.apos.schemas.addFieldType({
    name: 'my-field',
    converters: {
      csv: function(req, data, name, object, field, callback) {
        // Parse/transform input
        var value = data[name];
        var myData = { /* your structured data */ };
        
        // Store without leading underscore
        object[name] = {
          data: myData,
          _data: myData // optional backward compat
        };
        return setImmediate(callback);
      },
      form: 'csv'
    },
    partial: self.fieldTypePartial
  });
};
```

### Browser‑side (`public/js/user.js`)

```javascript
self.convert = function(object, name, $field, $el, field, callback) {
  // Read from hidden input/UI
  var value = $hidden.val();
  var parsed = JSON.parse(value || '{}');
  
  // Store with both properties
  object[name] = {
    data: parsed.data,
    _data: parsed.data
  };
  
  // Required validation
  if (field.required && !isValid(parsed.data)) {
    return setImmediate(_.partial(callback, 'required'));
  }
  
  return setImmediate(callback);
};
```

## Template Filter Considerations

If you provide a template filter, make it resilient to both property names:

```javascript
self.myFilter = function(value) {
  // Prefer non‑underscore property
  var data = value.data || value._data || {};
  // ... transform and return
};
```

## Lessons Learned

1. **Apostrophe's `clonePermanent` is aggressive** – design your field's storage format accordingly.
2. **Debug server‑side converters with logs** – they run on every widget save.
3. **The browser‑side `convert` method must match** – what you store there must survive `clonePermanent`.
4. **Widget's `playerData` option** – if set to `false` or an array, it further restricts what reaches the front‑end.

## Quick Fix for Existing Data

If you already have data stored with `_property`, you can migrate in MongoDB:

```javascript
db.aposDocs.updateMany(
  { "content.items.field._property": { $exists: true } },
  { $rename: { "content.items.field.$[]._property": "content.items.field.$[].property" } }
)
```

## Reference

- `apostrophe‑widgets/index.js` – `filterForDataAttribute` method
- `apostrophe‑browser‑utils/always.js` – `clonePermanent` implementation
- `apostrophe‑video‑fields` – example of a well‑behaved custom field type

---
*Documented from debugging the `multilingual‑string` field type, 2025‑01‑05*