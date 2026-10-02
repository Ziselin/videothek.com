param(
  [string]$SourcePath = (Join-Path $PSScriptRoot '..\tspdt-2026-source.html'),
  [string]$OutputPath = (Join-Path $PSScriptRoot '..\videothek-tspdt-top1000.js')
)

$html = [System.Net.WebUtility]::HtmlDecode((Get-Content -LiteralPath $SourcePath -Raw))
$block = [regex]::Match($html, "<div id='stacks_in_1218929'[^>]*>(.*?)</div>", [System.Text.RegularExpressions.RegexOptions]::Singleline)
if (-not $block.Success) { throw 'Die offizielle TSPDT-Rangliste wurde im HTML nicht gefunden.' }

$plain = [regex]::Replace($block.Groups[1].Value, '<br\s*/?>', "`n", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
$plain = [regex]::Replace($plain, '<[^>]+>', '')
$textInfo = [System.Globalization.CultureInfo]::GetCultureInfo('en-US').TextInfo
$minorWords = [System.Collections.Generic.HashSet[string]]::new([string[]]@('a','an','and','as','at','but','by','de','del','della','des','du','el','en','et','for','from','in','la','las','le','les','lo','los','nor','of','on','or','per','the','to','un','una','une','via','with'))
function ConvertTo-DisplayTitle([string]$Value) {
  $words = $textInfo.ToTitleCase($Value.ToLowerInvariant()) -split ' '
  for ($index = 1; $index -lt $words.Count; $index++) {
    if ($minorWords.Contains($words[$index].ToLowerInvariant()) -and -not $words[$index - 1].EndsWith(':')) { $words[$index] = $words[$index].ToLowerInvariant() }
  }
  return $words -join ' '
}
$entries = foreach ($line in ($plain -split "`n")) {
  $match = [regex]::Match($line.Trim(), '^([0-9]{1,4})\. \([^)]*\) (.+) \((.+), ([0-9]{4})(?:-[0-9]{2,4})?, .+\)$')
  if (-not $match.Success) { continue }
  [ordered]@{
    collectionNumber = [int]$match.Groups[1].Value
    title = ConvertTo-DisplayTitle $match.Groups[2].Value.Trim()
    year = [int]$match.Groups[4].Value
  }
}

if ($entries.Count -ne 1000) { throw "Erwartet wurden 1000 Filme, gefunden wurden $($entries.Count)." }
if (($entries.collectionNumber | Select-Object -Unique).Count -ne 1000) { throw 'Die TSPDT-Ränge sind nicht eindeutig.' }

$overrides = @{
  'HISTOIRE(S) DU CINÉMA' = @{ title = 'Histoire(s) du cinéma'; mediaType = 'tv'; tmdbId = '206647' }
}
$rows = foreach ($entry in $entries) {
  $extra = $overrides[$entry.title.ToUpperInvariant()]
  $displayTitle = if ($extra.title) { $extra.title } else { $entry.title }
  $title = $displayTitle.Replace('\', '\\').Replace('"', '\"')
  if ($extra) { "[$($entry.collectionNumber),`"$title`",$($entry.year),{mediaType:`"$($extra.mediaType)`",tmdbId:`"$($extra.tmdbId)`"}]" }
  else { "[$($entry.collectionNumber),`"$title`",$($entry.year)]" }
}

$chunks = for ($index = 0; $index -lt $rows.Count; $index += 10) {
  ($rows[$index..([Math]::Min($index + 9, $rows.Count - 1))] -join ',')
}
$output = @(
  'window.VIDEOTHEK_TSPDT_TOP1000={version:"2026-01-01.1",snapshotDate:"2026-01-01",source:"https://theyshootpictures.com/gf1000_all1000films.htm",edition:"The 1,000 Greatest Films · 21st edition · 2026",placeholders:['
  ($chunks -join ",`n")
  '].map(([collectionNumber,title,year,metadata={}])=>({collectionNumber:String(collectionNumber),details:"",title,year,...metadata}))};'
) -join "`n"

[System.IO.File]::WriteAllText((Resolve-Path -LiteralPath (Split-Path -Parent $OutputPath)).Path + [System.IO.Path]::DirectorySeparatorChar + (Split-Path -Leaf $OutputPath), $output, [System.Text.UTF8Encoding]::new($false))
Write-Output "TSPDT 2026: $($entries.Count) Einträge erzeugt."
