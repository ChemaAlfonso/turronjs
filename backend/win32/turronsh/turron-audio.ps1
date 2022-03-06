

# --------------------------
# Location vars
# --------------------------
$actual_dir= $MyInvocation.MyCommand.Path | Split-Path -Parent
$output="$actual_dir\..\..\..\downloaded\$(Get-Date -Format 'dd-MM-yyyy-HH-mm-ss')"
$sources="$actual_dir\..\..\..\sources.txt"

# --------------------------
# Intro
# --------------------------
echo  "____o__ __o____                                           /o/             "
echo  " /   \   /   \                                            /               "
echo  "      \o/                                               //                "
echo  "       |         o       o   \o__ __o   \o__ __o     o__ __o    \o__ __o  "
echo  "      < >       <|>     <|>   |     |>   |     |>   /v     v\    |     |> "
echo  "       |        < >     < >  / \   < >  / \   < >  />       <\  / \   / \ "
echo  "       o         |       |   \o/        \o/        \         /  \o/   \o/ "
echo  "      <|         o       o    |          |          o       o    |     |  "
echo  "      / \        <\__ __/>   / \        / \         <\__ __/>   / \   / \ "
echo  "                                                                          "
echo  "                                                                          "
echo  "                                                                          "
echo  "   o__ __o      o         o  "
echo  "  /v     v\    <|>       <|>              /)-_-(\\"
echo  " />       <\   < >       < >               (o o) "
echo  "_\o____         |         |        .-----__/\o/  "
echo  "     \_\__o__   o__/_ _\__o       /  __      /   "
echo  "           \    |         |   \__/\ /  \_\ |/    "
echo  " \         /   <o>       <o>       ||     ||     "
echo  "  o       o     |         |        //     ||     "
echo  "  <\__ __/>    / \       / \      |\      |\     V1.1"
echo "\n"

# --------------------------
# Dependencies
# --------------------------

echo "Checking required dependencies..."

$chocolateyPath = (Get-Command chocolatey).Path 
if ( !$chocolateyPath ) {
    # Install chocolatey
    echo "Installing chocolatey"
    Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

} else {
    echo "Updating chocolatey"
    choco upgrade -y chocolatey
    echo "Done"
}

$ytdlpPath = (Get-Command yt-dlp).Path 
if ( !$ytdlpPath ) {
    echo "Installing yt-dlp"
    choco install -y yt-dlp
    echo "Done"
}

$ffmpegPath = (Get-Command ffmpeg).Path 
if ( !$ffmpegPath ) {
    echo "Installing ffmpeg"
    choco install -y ffmpeg
    echo "Done"
}


echo "All dependencies checked"



# --------------------------
# Dir validations
# --------------------------

if (Test-Path -Path $output) {
    echo "Directory $output exists:"
    echo "Skipping directory creation..."
} else {
    echo "Creating output directory..."
    New-Item $output -ItemType Directory 
    echo "Directory created"
}





# --------------------------
# Start download process
# --------------------------
echo "Reading sources from "$sources""

foreach($source_url in Get-Content $sources) {
    
    echo "Starting download from $source_url"
    yt-dlp "$source_url" --restrict-filenames -f 'bestaudio[ext=m4a]' -o "$output\%(title)s.%(ext)s"
    echo "Done"
}
    
echo "Woof Woof -> All Done Sources downloaded in $output"