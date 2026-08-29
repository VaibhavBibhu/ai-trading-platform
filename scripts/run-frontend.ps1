$ProjectRoot = Split-Path -Parent $PSScriptRoot
$Conda = Join-Path $env:USERPROFILE "miniconda3\Scripts\conda.exe"

Set-Location (Join-Path $ProjectRoot "frontend")
& $Conda run -n ai-trader npm run dev -- --host 127.0.0.1

