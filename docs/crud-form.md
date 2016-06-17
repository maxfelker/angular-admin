crud-form
===

## Example Usage

Here is an example of how to markup a `<crud-form>` directive

    <crud-form
      display="assetsCtrl.isActionState('create')"
      form-name="assetForm"
      crud-object="assetsCtrl.crudObject"
      submit-handler="assetsCtrl.makeRequest()"
      cancel-handler="assetsCtrl.showList()">
    </crud-form>

### Attributes

All attributes are required:

 - `display` - Used to display element or Note _bool_
 - `form-name` - The name of the form _string_
 - `crud-object` - The crud-form's data object, used for generation and validation _object_
 - `submit-handler` - The success handler after crud-form validates it's fields
 - `cancel-handler` - The cancel handler which directs the user away from the crud-form

### CRUD object

This object defines the data structure and models that the crud-form will interact with. It is also used to validate
form data.


     var crudObject = {
        name: {
          type: 'text',
          placeholder: 'My New Asset',
          value: '',
          required: true,
        },
        prefab: {
          type: 'text',
          placeholder: 'PrefabNameInUnity',
          value: '',
          required: true,
        },
        category: {
          type: 'select',
          options: [
            {
              value: 1,
              text: 'Structures'
            },
            {
              value: 2,
              text: 'Rocks'
            }
          ],
          required: true
        }
      };

Each field object takes configurations:

- `type` - Type of input _string_
- `placeholder` - The placeholder for a text input _string_
- `value` - Value of field (also the model) _string_
- `required` - Is the field required _boo_

## Using Crud form to edit

Similar to how create works, we pass the `crudObject` to the `<crud-form>` directive. Here we will update
the values of the `crudObject` before we send it to the directive. Here is an example

    var asset = {
      name: 'test',
      category: 'cool stuff'
      id: 1
    };

    this.setCrudObject = function(asset) {
      for(var fieldName in this.crudObject) {
        this.crudObject[fieldName].value = asset[fieldName];
      }
      this.crudObject.id = asset.id;
    };
