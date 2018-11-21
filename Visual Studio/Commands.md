# Package manager commands
## Install a package into multiple projects
You can open the package manager console from View -> Other Windows -> Package Manager Console. The window has no default shortcut.

This command will install a package into all projects.
Obviously you have to replace packageName with the package you want to install.
> Get-Project -All | Install-Package packageName

This command will install a package into a subset of projects, in this case all projects that have a name that ends with ".Test".
Obviously you have to replace packageName with the package you want to install.
> Get-Project -All | where { $_.Name.EndsWith(".Test") } | Install-Package packageName
