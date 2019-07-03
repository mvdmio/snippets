param (
	[string] $startupProjectDirectory = "../../"
)

function selectEnvironment() {
	$choices = @()
	$appsettingFiles = Get-ChildItem $startupProjectDirectory -Filter "appsettings.*.json"
	
	foreach($file in $appsettingFiles) {
		if($file.FullName -match "appsettings\.(.+)\.json"){
			$choices += $Matches[1]
		}
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