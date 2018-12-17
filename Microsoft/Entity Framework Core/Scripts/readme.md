# Entity Framework Core scripts
This repository contains common scripts that can be used to simplify working with Entity Framework.

## Generate Migrations
The Generate_Migrations.ps1 file contains a script that will generate the required migrations for an Entity Framework project.
Running this script will update the database to the latest version. The connectionstring of the startup project is used for this.
The script will prompt the user for a name for the migration.

When using the script, replace the following variables with your own values:
1. <migration-directory> - This is the directory where the migrations will be placed. _Note that the path is relative to the given project_ - e.g. ./Data/IdentityServerDb/Migrations
2. <project-directory> - This is the directory of the project that contains the entity framework context class. Can be the same as the startup project, if you didn't separate your entity framework classes into a separate project. _Note that the path is relative to the script location_ - e.g. ../Entity_Framework_Project_Directory _(Don't add the .csproj file to the path, just put in the directory where the csproj file is located)_
3. <startup-directory> - This is the directory of the project that contains the startup logic and connection strings. Usually this is the web project or the windows application project. - e.g. ../Web_Project_Directory _(Don't add the .csproj file to the path, just put in the directory where the csproj file is located)_
4. <context-class> - This is the class name of the context that you want to generate migrations for. This can either be just the class name, or the fully qualified class name - e.g. MyDbContext or my.namespace.MyDbContext

## Update Database
The Generate_Migrations.ps1 file contains a script that will generate the required migrations for an Entity Framework project.
Running this script will update the database to the latest version. The connectionstring of the startup project is used for this.

When using the script, replace the following variables with your own values:
1. <project-directory> - This is the directory of the project that contains the entity framework context class. Can be the same as the startup project, if you didn't separate your entity framework classes into a separate project. _Note that the path is relative to the script location_ - e.g. ../Entity_Framework_Project_Directory _(Don't add the .csproj file to the path, just put in the directory where the csproj file is located)_
2. <startup-directory> - This is the directory of the project that contains the startup logic and connection strings. Usually this is the web project or the windows application project. - e.g. ../Web_Project_Directory _(Don't add the .csproj file to the path, just put in the directory where the csproj file is located)_
3. <context-class> - This is the class name of the context that you want to generate migrations for. This can either be just the class name, or the fully qualified class name - e.g. MyDbContext or my.namespace.MyDbContext