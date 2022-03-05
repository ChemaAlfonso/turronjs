#!/bin/sh

# --------------------------
# Colors
# --------------------------
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
LIGHTBLUE='\033[0;34m'
NC='\033[0m'

# --------------------------
# Location vars
# --------------------------
actual_dir="$(dirname "$BASH_SOURCE")"
output="$actual_dir"/downloaded/"$(date +%s)"
sources="$actual_dir"/sources.txt

# --------------------------
# Intro
# --------------------------
echo "${LIGHTBLUE}"
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
echo  "  <\__ __/>    / \       / \      |\      |\     ${NC}${YELLOW}V1.1${NC}"
echo "\n"

# --------------------------
# Dependencies
# --------------------------

echo "🧺 ${LIGHTBLUE}Checking required dependencies...${NC}"

which -s brew
if [[ $? != 0 ]] ; then
    # Install Homebrew
    echo "🧺 ${LIGHTBLUE}Installing Homebrew${NC}"
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    echo "🧺 ${LIGHTBLUE}Updating Homebrew${NC}"
    brew update
fi
echo "${GREEN}🐾 Done${NC}"

which -s yt-dlp
if [[ $? != 0 ]] ; then
    # Install yt-dlp
    echo "🧺 ${LIGHTBLUE}Installing yt-dlp${NC}"
    brew install yt-dlp/taps/yt-dlp
    echo "${GREEN}🐾 Done${NC}"
fi

which -s ffmpeg
if [[ $? != 0 ]] ; then
    # Install ffmpeg
    echo "🧺 ${LIGHTBLUE}Installing ffmpeg${NC}"
    brew install ffmpeg
    echo "${GREEN}🐾 Done${NC}"
fi

echo "${GREEN}🐾 All dependencies checked${NC}"


# --------------------------
# Dir validations
# --------------------------
if [ -e "$output" ]; then
    echo "⚠️  ${YELLOW}Directory $output exists:${NC}"
    echo "⚠️  ${YELLOW}Skipping directory creation...${NC}"
else 
    echo "🧺 ${LIGHTBLUE}Creating output directory...${NC}"
    mkdir -p $output
    echo "${GREEN}🐾 Directory created${NC}"
fi 


# --------------------------
# Start download process
# --------------------------
echo "🟢 ${LIGHTBLUE}Reading sources from "$sources"${NC}"

(
    downloading_source_idx=1
    while IFS= read -r source_url
    do
        
        echo "🚀 ${LIGHTBLUE}Starting download from "$source_url"${NC}"

        yt-dlp "$source_url" --restrict-filenames -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4' -o "$output"/"%(title)s"-"$(date +%s)"".%(ext)s"

        echo "${GREEN}🐾 Done${NC}"

        ((downloading_source_idx=downloading_source_idx+1))

    done < "$sources"

    echo "${LIGHTBLUE}🐕 Woof Woof -> ${NC}${GREEN}All Done (✅) Sources downloaded in ${output} ${NC}"

) || 
(
    echo "${RED}❌ Error:  Download aborted, an error ocurred.${NC}"
)
