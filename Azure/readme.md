# Azure Snippets

## Remove_Old_Deployments.ps1
This script can be run from your release pipelines and removes deployments older than 30 days. It always leaves the last 100 deploys.
I've made this script to fix the issue that pops up when you've deployed more than 800 releases to an Azure Resource Group.