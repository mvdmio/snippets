# Entity Framework Core scripts
This repository contains common scripts that can be used to simplify working with Entity Framework.

See the [Microsoft documentation for a full reference of the EF Core command line tooling](https://docs.microsoft.com/en-us/ef/core/miscellaneous/cli/dotnet).

## Select Environment
The Select_Environment.ps1 file contains a script that will search for all appsettings.*.json files in the given directory. It will then present a choice input to the user so the user can select the environment he/she wants to use. This is mainly important for `Update Database` and `Apply Migration` scripts, because those will query a database.

When calling the script, provide the following parameter:
1. `startupProjectDirectory` - This is the directory of the project that contains the startup logic and connection strings. Usually this is the web project or the windows application project. - e.g. ../Web_Project_Directory _(Don't add the .csproj file to the path, just put in the directory where the csproj file is located)_

If you want to use a specific appsettings.*.json file to be used in your scripts, you must set the correct environment for Entity Framework to be used. This can be done with the following script:
```
params(
    [string] $environment = "production"
)

$previousEnvironment = $env:ASPNETCORE_ENVIRONMENT
$env:ASPNETCORE_ENVIRONMENT = $environment
 -- Execute what you need to do here.
$env:ASPNETCORE_ENVIRONMENT = $previousEnvironment
```

This will save the current environment into a temporary variable, set the environment to your provided environment so that EF will select the correct appsettings.*.json file, run whatever you need to run and then set the environment back to the original value.

Note that, for entity framework to work correctly, you should set the environment to exactly whatever the * is in appsettings.*.json. You can use the `Select_Environment.ps1` script the show a selection dialog for the environment to a user.

## Select Migration
The Select_Migration.ps1 file contains a script that will search for all migration C# files in the given directory. It will then present a choice input to the user so the user can select the migration he/she wants to use. This is mainly important for the `Apply Migration` script, because that requires a migration name to apply to the database.

When calling the script, provide the following parameters:
1. `projectDirectory` - This is the directory of the project that contains the entity framework context class. Can be the same as the startup project, if you didn't separate your entity framework classes into a separate project. _Note that the path is relative to the script location_ - e.g. ../Entity_Framework_Project_Directory _(Don't add the .csproj file to the path, just put in the directory where the csproj file is located)_
2. `migrationsDirectory` - This is a directory relative to the project directory where migrations can be found.

## Generate Migrations
The Generate_Migrations.ps1 file contains a script that will generate the required migrations for an Entity Framework project.
Running this script will update the database to the latest version. The connectionstring of the startup project is used for this.
The script will prompt the user for a name for the migration.

When using the script, replace the following variables with your own values:
1. `<migration-directory>` - This is the directory where the migrations will be placed. _Note that the path is relative to the given project_ - e.g. ./Data/IdentityServerDb/Migrations
2. `<project-directory>` - This is the directory of the project that contains the entity framework context class. Can be the same as the startup project, if you didn't separate your entity framework classes into a separate project. _Note that the path is relative to the script location_ - e.g. ../Entity_Framework_Project_Directory _(Don't add the .csproj file to the path, just put in the directory where the csproj file is located)_
3. `<startup-directory>` - This is the directory of the project that contains the startup logic and connection strings. Usually this is the web project or the windows application project. - e.g. ../Web_Project_Directory _(Don't add the .csproj file to the path, just put in the directory where the csproj file is located)_
4. `<context-class>` - This is the class name of the context that you want to generate migrations for. This can either be just the class name, or the fully qualified class name - e.g. MyDbContext or my.namespace.MyDbContext

## Update Database
The Generate_Migrations.ps1 file contains a script that will generate the required migrations for an Entity Framework project.
Running this script will update the database to the latest version. The connectionstring of the startup project is used for this.

When using the script, replace the following variables with your own values:
1. `<project-directory>` - This is the directory of the project that contains the entity framework context class. Can be the same as the startup project, if you didn't separate your entity framework classes into a separate project. _Note that the path is relative to the script location_ - e.g. ../Entity_Framework_Project_Directory _(Don't add the .csproj file to the path, just put in the directory where the csproj file is located)_
2. `<startup-directory>` - This is the directory of the project that contains the startup logic and connection strings. Usually this is the web project or the windows application project. - e.g. ../Web_Project_Directory _(Don't add the .csproj file to the path, just put in the directory where the csproj file is located)_
3. `<context-class>` - This is the class name of the context that you want to generate migrations for. This can either be just the class name, or the fully qualified class name - e.g. MyDbContext or my.namespace.MyDbContext

## Apply Migration
The Apply_Migration.ps1 file contains a script that will migrate a database to the provided version. This can both be a forward and a backwards migration (up/down).

When using the script, replace the following variables with your own values:
1. `<migration name>` - This is the _class_ name of the migration. You can use the `Select_Migration.ps1` script to present the user with a selection dialog for selecting the correct migration.
2. `<project-directory>` - This is the directory of the project that contains the entity framework context class. Can be the same as the startup project, if you didn't separate your entity framework classes into a separate project. _Note that the path is relative to the script location_ - e.g. ../Entity_Framework_Project_Directory _(Don't add the .csproj file to the path, just put in the directory where the csproj file is located)_
3. `<startup-directory>` - This is the directory of the project that contains the startup logic and connection strings. Usually this is the web project or the windows application project. - e.g. ../Web_Project_Directory _(Don't add the .csproj file to the path, just put in the directory where the csproj file is located)_
4. `<context-class>` - This is the class name of the context that you want to generate migrations for. This can either be just the class name, or the fully qualified class name - e.g. MyDbContext or my.namespace.MyDbContext

## Generate Migration Scripts
The Generate_Migration_Scripts.ps1 file contains a script that will generate an SQL file with all database migrations. The SQL file can be executed on any existing version of the database and will migrate that database to the latest version. The generated SQL file is useful for when you want to run migrations from a CI/CD pipeline.

When using the script, replace the following variables with your own values:
1. `<output-file>` - This is the output file of the ef command. Note that this must be a fully qualified file name, e.g. `./some/file.sql`.
2. `<project-directory>` - This is the directory of the project that contains the entity framework context class. Can be the same as the startup project, if you didn't separate your entity framework classes into a separate project. _Note that the path is relative to the script location_ - e.g. ../Entity_Framework_Project_Directory _(Don't add the .csproj file to the path, just put in the directory where the csproj file is located)_
3. `<startup-directory>` - This is the directory of the project that contains the startup logic and connection strings. Usually this is the web project or the windows application project. - e.g. ../Web_Project_Directory _(Don't add the .csproj file to the path, just put in the directory where the csproj file is located)_
4. `<context-class>` - This is the class name of the context that you want to generate migrations for. This can either be just the class name, or the fully qualified class name - e.g. MyDbContext or my.namespace.MyDbContext