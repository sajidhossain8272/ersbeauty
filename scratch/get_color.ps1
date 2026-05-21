[void][System.Reflection.Assembly]::LoadWithPartialName("System.Drawing")
$img = [System.Drawing.Image]::FromFile("c:\Users\broke\Desktop\Gold-collagen-landing-page\public\logo.png")
$bmp = New-Object System.Drawing.Bitmap($img)
$colors = @{}
for ($x = 0; $x -lt $bmp.Width; $x += 2) {
    for ($y = 0; $y -lt $bmp.Height; $y += 2) {
        $p = $bmp.GetPixel($x, $y)
        # Filter out transparent, white, black, and grayscale pixels
        if ($p.A -gt 150 -and ($p.R -ne $p.G -or $p.G -ne $p.B) -and ($p.R + $p.G + $p.B -lt 700) -and ($p.R + $p.G + $p.B -gt 100)) {
            $hex = '#{0:X2}{1:X2}{2:X2}' -f $p.R, $p.G, $p.B
            $colors[$hex]++
        }
    }
}
$colors.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 10
