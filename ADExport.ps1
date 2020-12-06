
 Import-Module ActiveDirectory

$CSVpath = "C:\DataSync\ADusers.csv"
#$users = Get-ADGroup -Server "pelppsrivwdc.mypiramal.com" -Filter * -SearchBase "OU=Users,OU=RIV,OU=PPS,OU=PP,OU=PEL,OU=PIRAMALGROUP,DC=mypiramal, DC=com" | Get-ADGroupMember | Sort | Get-Unique | Get-ADUser

#$datecutoff= (Get-Date).AddHours(-4);

#$users = Get-ADUser  -SearchBase "DC=Misha, DC=local" -Filter * -Properties * | Where-Object {$_.GivenName -ne $null -and $_.GivenName -notlike 'svc*' -and $_.whenChanged -gt $datecutoff}
$users = Get-ADUser  -SearchBase "DC=Misha, DC=local" -Filter * -Properties * | Where-Object {$_.GivenName -ne $null -and $_.GivenName -notlike 'svc*'}

Write-Host($users.Count);

$myData = $users | Select-Object -Property @{Name="UniqueID";Expression={ -join ($_.ObjectGUID.ToByteArray() | foreach { $ofs="" } { "{0:X2}" -f $_})}},

@{Name="FirstName";Expression={$_.GivenName}},
@{Name="LastName";Expression={$_.Surname}},
@{Name="FullName";Expression={$_.name}},
@{Name="EmployeeID";Expression={$_.EmployeeId}},
@{Name="DisableUser";Expression={ !($_.Enabled)}},
@{Name="AdSync";Expression={ 'Yes' }},
@{Name="MemberOf";Expression={ ($_.MemberOf | Get-ADGroup | where {$_.GroupCategory -eq "Security" -and $_.Name -like "SGG-RIV-SE*"} | Select -ExpandProperty Name) -join ":" }}
$myData | ConvertTo-Csv -Delimiter "," -NoTypeInformation | % {$_ -replace '"',''} | Out-File $CSVpath
$b = Get-Content "C:\DataSync\ADusers.csv" | Where { $_ -notmatch "UniqueID" }
$b = $b -replace ";\s", ";"


Set-Content "C:\DataSync\ADResults.csv" $b
Move-Item "C:\DataSync\ADResults.csv" "C:\DataSync\Output\ADResults.csv" -Force