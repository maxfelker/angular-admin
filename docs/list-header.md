list-header
===

## Example Usage

Here is an example of how to markup a `<list-header>` directive

    <list-header
      record-name="Asset"
      button-action="Add"
      create-handler="assetsCtrl.showCreateForm()"
      animation="fadeInDown">
    </list-header>

### Attributes

All attributes are required:

 - `record-name` - The name of the record list _string_
 - `button-action` -  The name of the Action _string_
 - `create-handler` - pass a function object _function_
 - `animation` - You can pass any animate.css animate class _string_
