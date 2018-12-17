$name = Read-Host -Prompt "Input migration name: "

dotnet ef migrations add  $name --output-dir "<migration-directory>" --project "<project-directory>" --startup-project "<startup-directory>" --context "<context-class>"