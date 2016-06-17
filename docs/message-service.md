message-service
===

## Example Usage
Include `messageService` in the controller header, for example:
```
angular.module('centerpointAdminApp')
  .controller('AssetsCtrl', function($scope, messageService)
```
## Example Methods
### messageService.display()
will display a ngToast message

`messageService.display(type, message, action)` - basic method in which you can pass these parameters, with or without an action state. _function_

`type` (required) - can be any bootstrap alert class. Example: 'danger', or 'success'. _string_

`message` (required) - pass your desired message. _string_

`action` (optional) - you may pass an action, which will show up bold before the message. _string_

### messageService.success()
will display a success themed ngToast message

`messageService.success(message, action)` - basic method in which you can pass these parameters, with or without an action state. _function_

`message` (required) - pass your desired message. _string_

`action` (optional) - you may pass an action, which will show up bold before the message. _string_

### messageService.error()
will display a error themed ngToast message

`messageService.error(message, action)` - basic method in which you can pass these parameters, with or without an action state. _function_

`message` (required) - pass your desired message. _string_

`action` (optional) - you may pass an action, which will show up bold before the message. _string_

### messageService.created()
will display a ngToast message with ``''You have created a new' + name``

`messageService.success(name)` - basic method in which you can pass the name of the created item. _function_

`name` (required) - pass your desired name. _string_

### messageService.deleted()
will display a ngToast message with ``'You have deleted' + name``

`messageService.deleted(name)` - basic method in which you can pass the name of the created item. _function_

`name` (required) - pass your desired name. _string_


### messageService.updated()
will display a ngToast message with ``'You have updated' + name``

`messageService.updated(name)` - basic method in which you can pass the name of the created item. _function_

`name` (required) - pass your desired name. _string_
