$ProjectRoot = Split-Path -Parent $PSScriptRoot
$Conda = Join-Path $env:USERPROFILE "miniconda3\Scripts\conda.exe"

Set-Location (Join-Path $ProjectRoot "backend")
& $Conda run -n ai-trader python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

