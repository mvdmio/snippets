param (
	[string] $environment,
	[string] $migrationName,
	[string] $migrationsDirectory = "./Migrations",
	[string] $projectDirectory = "../../../Ridder.Connect.Common\Ridder.Connect.Common.Repository.EF",
	[string] $startupProjectDirectory = "../../",
	[string] $contextName = "RidderConnectDbContext"
)

function selectEnvironment() {
	$choices = @()
	$appsettingFiles = Get-ChildItem $startupProjectDirectory -Filter "appsettings.*.json"
	
	foreach($file in $appsettingFiles) {
		if($file.FullName -match "appsettings\.(.+)\.json"){
			$choices += $Matches[1]
		}
	}	

	if($choices.length -eq 1) {
		return $choices[0]
	}

	Write-Host "Please input the number of the environment you want to use"
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
	return selectEnvironment
}

if([string]::IsNullOrEmpty($environment)) {
	$environment = selectEnvironment
}

Write-Host "Using environment $environment"

Write-Host "Removing latest migration"

$previousEnvironment = $env:ASPNETCORE_ENVIRONMENT
$env:ASPNETCORE_ENVIRONMENT = $environment
dotnet ef migrations remove --project $projectDirectory --startup-project $startupProjectDirectory --context $contextName
$env:ASPNETCORE_ENVIRONMENT = $previousEnvironment
