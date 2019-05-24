# htmlorder

This extension orders the attributes of HTML elements. If not configured otherwise, it will sort attributes alphabetically. Custom ordering can be configured in settings.json. Punctuation, special characters and digits are ignored during sorting. So the attribute '[a]' is treated like 'a' during sorting.

## Extension Settings

This extension contributes the following settings:

* `attrorder.orderOnSave`: (boolean) whether attributes should be ordered when the document is saved
* `attorder.order`: (string[]) an array of RegEx strings to define a custom order for attributes. The regexes are surroudet by a leading '^' and trailing '$' so that normal strings only match exactly. Having the string 'class' in the order array will only match the attribute 'class', not 'className' or 'ngClass'. If you also want these to match the string would need to be changed to '.*class.*'.
