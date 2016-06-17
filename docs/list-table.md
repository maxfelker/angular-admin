list-table
===

## Example Usage

Here is an example of how to markup a `<list-table>` directive

    <list-table
      ng-show="assetsCtrl.assetList.length > 0"
      list="assetsCtrl.assetList"
      delete-handler="assetsCtrl.deleteAsset"
      edit-handler="assetsCtrl.showEditForm"
      animation="fadeIn">
    </list-table>

### Attributes

All attributes are required:

 - `list` - Pass a object for the list  _object_
 - `delete-handler` -   pass a function object to delete a record _function_
 - `edit-handler` - pass a function object to edit a record _function_
 - `animation` - You can pass any animate.css animate class _string_
