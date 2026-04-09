#Requires AutoHotkey v2.0
#SingleInstance Force

WatchFolder := A_Desktop "\WatchFolder"
monitoring := true
seenFiles := Map()

if !DirExist(WatchFolder)
    DirCreate WatchFolder

A_TrayMenu.Delete()
A_TrayMenu.Add("Pause Monitoring", ToggleMonitoring)
A_TrayMenu.Add()
A_TrayMenu.AddStandard()

Persistent
SetTimer CheckFolder, 1000

CheckFolder() {
    global monitoring, seenFiles, WatchFolder
    if !monitoring
        return
    Loop Files WatchFolder "\*.txt" {
        if !seenFiles.Has(A_LoopFilePath) {
            seenFiles.Set(A_LoopFilePath, true)
            try {
                content := FileRead(A_LoopFilePath)
                lines := StrSplit(content, "`n", "`r")
                firstLine := lines.Length > 0 ? lines[1] : "(empty)"
                MsgBox "New file: " A_LoopFileName "`n`nFirst line: " firstLine, "Folder Monitor"
            } catch Error as err {
                MsgBox "Could not read file: " A_LoopFileName "`nError: " err.Message, "Folder Monitor"
            }
        }
    }
}

ToggleMonitoring(ItemName, ItemPos, MyMenu) {
    global monitoring
    monitoring := !monitoring
    if monitoring {
        MyMenu.Rename(ItemName, "Pause Monitoring")
        MyMenu.Uncheck(ItemName)
    } else {
        MyMenu.Rename(ItemName, "Resume Monitoring")
        MyMenu.Check(ItemName)
    }
}