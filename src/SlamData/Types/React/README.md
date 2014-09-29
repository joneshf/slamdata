## SlamData.Types.React

These modules are for types that arise through the use of react.
In particular, the `Props` and `State` that all the components seem to have.
They are being separated from the rest because they cause cyclic dependency issues at times, and because they're entirely there because of react.
It doesn't appear that we require some arbitrary distinction of props and state within our domain logic, but react does.

Currently `9/26/14`, not all of the `Props` and `State` is in here.
