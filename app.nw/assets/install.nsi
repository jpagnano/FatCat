!include "MUI2.nsh"

Name "FatCatQueue"
BrandingText "jpagnano.com"

# set the icon
!define MUI_ICON "icon.ico"

# define the resulting installer's name:
OutFile "..\dist\FatCatQueueSetup.exe"

# set the installation directory
InstallDir "$PROGRAMFILES\FatCatQueue\"

# app dialogs
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_INSTFILES

!define MUI_FINISHPAGE_RUN_TEXT "Start FatCatQueue"
!define MUI_FINISHPAGE_RUN "$INSTDIR\FatCatQueue.exe"

!insertmacro MUI_PAGE_FINISH
!insertmacro MUI_LANGUAGE "English"

# default section start
Section

  # delete the installed files
  RMDir /r $INSTDIR

  # define the path to which the installer should install
  SetOutPath $INSTDIR

  # specify the files to go in the output path
  File /r ..\build\FatCatQueue\win32\*

  # create the uninstaller
  WriteUninstaller "$INSTDIR\Uninstall FatCatQueue.exe"

  # create shortcuts in the start menu and on the desktop
  CreateShortCut "$SMPROGRAMS\FatCatQueue.lnk" "$INSTDIR\FatCatQueue.exe"
  CreateShortCut "$SMPROGRAMS\Uninstall FatCatQueue.lnk" "$INSTDIR\Uninstall FatCatQueue.exe"
  CreateShortCut "$DESKTOP\FatCatQueue.lnk" "$INSTDIR\FatCatQueue.exe"

SectionEnd

# create a section to define what the uninstaller does
Section "Uninstall"

  # delete the installed files
  RMDir /r $INSTDIR

  # delete the shortcuts
  Delete "$SMPROGRAMS\FatCatQueue.lnk"
  Delete "$SMPROGRAMS\Uninstall FatCatQueue.lnk"
  Delete "$DESKTOP\FatCatQueue.lnk"

SectionEnd
