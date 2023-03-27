# Problems when using v-html:

## 1. Outside code files cannot be loaded

If the html using outside php files to add more style code or script code, the v-html cannot load those files and process them.

## 2. The relative position of pics are changed

The relative position is changed. But some pictures can still loaded successfully.

## 3. Some other styles are not redered successfully but the reason not find.

The navigation bar is hidden in the original website but is not hidden in the v-html div.