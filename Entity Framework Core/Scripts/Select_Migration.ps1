param (
	[string] $migrationsDirectory = "./Migrations",
	[string] $projectDirectory = "../../../Some/Directory"
)

function selectMigration() {
	$choices = @()
	$fullMigrationPath = Join-Path -Path $projectDirectory -ChildPath $migrationsDirectory
	$migrationFiles = Get-ChildItem $fullMigrationPath -Filter "*.designer.cs"
	
	foreach($file in $migrationFiles) {
		if($file.FullName -match ".+_(.+)\.designer.cs"){
			$choices += $Matches[1]
		}
	}

	Write-Host "Please input the number of the migration you want to use"
	for($i = 0; $i -lt $choices.Count; $i++) {
		$env = $choices[$i]
		Write-Host "	$i -> $env"
	}
	
	$choice = Read-Host "Input choice: "
	
	for($i=0; $i -lt $choices.Count; $i++) {
		if($choice -eq $i) {
			return $choices[$i]
		}
	}

	Write-Host "Invalid choice."
	return selectMigration

	return Read-Host "Migration Name: "
}