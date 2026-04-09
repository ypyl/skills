#Requires AutoHotkey v2.0

monitorFolder := A_Desktop "\FolderMonitor"
paused := false
knownFiles := Map()

if !DirExist(monitorFolder)
    DirCreate(monitorFolder)

ScanFolder(*) {
    if paused
        return
    loop files monitorFolder "\*.txt" {
        if !knownFiles.Has(A_LoopFileName) {
            knownFiles[A_LoopFileName] := true
            filePath := A_LoopFileFullPath
            firstLine := ""
            try {
                fileObj := FileOpen(filePath, "r")
                firstLine := fileObj.ReadLine()
                fileObj.Close()
            }
            MsgBox("New file: " A_LoopFileName "`n`nFirst line:`n" firstLine, "Folder Monitor")
        }
    }
}

PauseResume(*) {
    paused := !paused
    MenuTray Rename(paused ? "1&" : "4&", paused ? "Resume Monitoring" : "Pause Monitoring")
    TrayTip(paused ? "Paused" : "Resumed", "Folder Monitor")
}

A_IconTip := "Folder Monitor"
MenuTray DeleteAll()
MenuTray Add("Pause Monitoring", PauseResume)
MenuTray Add()
MenuTray Add("Exit", (*) => ExitApp())

ScanFolder()
SetTimer(ScanFolder, 1000)