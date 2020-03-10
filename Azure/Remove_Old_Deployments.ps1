params {
   [string] $environment;
}

$resourceGroup = "$(environment)-CONNECT"

$deployments = Get-AzResourceGroupDeployment -ResourceGroupName $resourceGroup `
| Where-Object Timestamp -lt ((Get-Date).AddDays(-30)) `
| sort Timestamp -Descending `
| Select-Object -Skip 100

Write-Host Found $deployments.Count deployments to remove.

foreach($deployment in $deployments) {
    Remove-AzResourceGroupDeployment -ResourceGroupName $resourceGroup -Name $deployment.DeploymentName
}