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

echo "🧺 ${LIGHTBLUE}Cleaning Turron sh dependencies...${NC}"

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
if [[ $? == 0 ]] ; then
    # Uninstall yt-dlp
    echo "🧺 ${LIGHTBLUE}Uninstalling yt-dlp...${NC}"
    brew uninstall yt-dlp/taps/yt-dlp
    echo "${GREEN}🐾 Done${NC}"
fi

which -s ffmpeg
if [[ $? == 0 ]] ; then
    # Uninstall ffmpeg
    echo "🧺 ${LIGHTBLUE}Uninstalling ffmpeg...${NC}"
    brew uninstall ffmpeg
    echo "${GREEN}🐾 Done${NC}"
fi

which -s brew
if [[ $? == 0 ]] ; then
    # Unistall Homebrew
    echo "🧺 ${LIGHTBLUE}Uninstalling Homebrew${NC}"
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
fi
echo "${GREEN}🐾 Done${NC}"

echo "${LIGHTBLUE}🐕 Woof Woof -> ${NC}${GREEN}All Done (✅) All already downloaded files still in ${output} ${NC}"
