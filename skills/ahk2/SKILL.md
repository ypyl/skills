---
name: ahk2
description: Use this skill whenever the user asks about AutoHotkey, AHK, hotkeys, keyboard automation, mouse automation, Windows automation, window management, or scripting for Windows. This includes writing new AHK scripts, debugging existing ones, explaining AHK concepts, or looking up AHK functions/features. Always use this skill when the user mentions AutoHotkey, AHK, or asks for help with Windows desktop automation via scripting, even if they don't say "AHK v2" explicitly. The skill ensures correct v2 syntax is used and prevents common v1/v2 confusion.
---

# AutoHotkey v2 Scripting Guide

This skill helps you write correct AutoHotkey v2 (AHK v2) scripts. AHK v2 has significant syntax differences from v1 — always use v2 syntax. When in doubt about a specific function or feature, consult the online documentation.

## Documentation Lookup

When you need details about a specific built-in function, concept, or feature, fetch the relevant page from the official docs. The base URL is:

```
https://www.autohotkey.com/docs/v2/
```

### When to look up docs

Always look up documentation when:
- You are unsure about a function's exact parameters or return value
- You need to verify v2 syntax for a feature (v1 habits can introduce bugs)
- The user asks about a function you haven't seen in the index below
- You need to confirm behavior of edge cases (error handling, type coercion, etc.)

### Documentation URL patterns

| Topic | URL |
|-------|-----|
| Function index | `https://www.autohotkey.com/docs/v2/lib/index.htm` |
| Language reference | `https://www.autohotkey.com/docs/v2/Language.htm` |
| Concepts | `https://www.autohotkey.com/docs/v2/Concepts.htm` |
| Variables & expressions | `https://www.autohotkey.com/docs/v2/Variables.htm` |
| Hotkeys | `https://www.autohotkey.com/docs/v2/Hotkeys.htm` |
| Hotstrings | `https://www.autohotkey.com/docs/v2/Hotstrings.htm` |
| Objects | `https://www.autohotkey.com/docs/v2/Objects.htm` |
| Functions (defining) | `https://www.autohotkey.com/docs/v2/Functions.htm` |
| GUI | `https://www.autohotkey.com/docs/v2/lib/Gui.htm` |
| Key list | `https://www.autohotkey.com/docs/v2/KeyList.htm` |
| Send modes | `https://www.autohotkey.com/docs/v2/lib/Send.htm` |
| Window titles | `https://www.autohotkey.com/docs/v2/misc/WinTitle.htm` |
| RegEx quick ref | `https://www.autohotkey.com/docs/v2/misc/RegEx-QuickRef.htm` |
| Error types | `https://www.autohotkey.com/docs/v2/lib/Error.htm` |
| Script structure | `https://www.autohotkey.com/docs/v2/Scripts.htm` |
| Tutorials | `https://www.autohotkey.com/docs/v2/Tutorial.htm` |

For any built-in function listed in the function index, construct the URL as:
```
https://www.autohotkey.com/docs/v2/lib/{FunctionName}.htm
```
For example, `MsgBox` → `https://www.autohotkey.com/docs/v2/lib/MsgBox.htm`, `WinActivate` → `https://www.autohotkey.com/docs/v2/lib/WinActivate.htm`.

## Critical v2 vs v1 Differences

Many online examples and forum posts use v1 syntax. This is the #1 source of bugs. Watch for these v1 patterns and always use the v2 equivalent:

### Function call syntax

v1 used command syntax (no parentheses, bare text):
```ahk
; v1 (WRONG for v2)
MsgBox, Hello world
WinActivate, Untitled - Notepad
Sleep, 1000
```

v2 uses expression syntax (parentheses, quoted strings):
```ahk
; v2 (CORRECT)
MsgBox "Hello world"
WinActivate "Untitled - Notepad"
Sleep 1000
MsgBox("Hello world")  ; Also valid in v2
```

### Variable assignment

v1 used `=` for assignment; v2 uses `:=`:
```ahk
; v1 (WRONG for v2)
MyVar = Hello
MyVar = %OtherVar%

; v2 (CORRECT)
MyVar := "Hello"
MyVar := OtherVar
```

### Percent signs in expressions

v1 required `%Var%` to read variables inside commands. v2 does not — variables are referenced directly in expressions:
```ahk
; v1 (WRONG for v2)
MsgBox, %MyVar%
IfWinExist, %WinTitle%

; v2 (CORRECT)
MsgBox MyVar
if WinExist(WinTitle)
```

`%Var%` in v2 is the dynamic dereference operator — only used when you need to access a variable whose name is determined at runtime, not for ordinary variable access.

### String concatenation

v2 uses space-based auto-concat or the dot operator within expressions:
```ahk
; v2 (CORRECT)
result := "Hello " name "!"
result := "Hello " . name . "!"
```

### If/else syntax

v2 requires parentheses around conditions and uses expression syntax:
```ahk
; v1 (WRONG for v2)
If x = 5
{
    ; ...
}

; v2 (CORRECT)
if (x = 5)    ; or: if x = 5
{
    ; ...
}
```

Note: In v2, `if x = 5` works but `if (x = 5)` is clearer and avoids ambiguity.

### Command-style parameters are gone

In v1, many commands used a comma-delimited parameter list. In v2, these are all function calls:
```ahk
; v1 (WRONG for v2)
StringSplit, OutputArray, InputStr, `,
RegRead, OutputVar, HKEY_LOCAL_MACHINE\SOFTWARE\Something, ValueName

; v2 (CORRECT)
arr := StrSplit(InputStr, ",")
OutputVar := RegRead("HKEY_LOCAL_MACHINE\SOFTWARE\Something", "ValueName")
```

### Error handling

v2 has proper try/catch/throw error handling. v1 relied on `ErrorLevel`:
```ahk
; v2 (CORRECT)
try {
    Run "nonexistent_program.exe"
} catch Error as err {
    MsgBox "Failed to run: " err.Message
}
```

### Objects and classes

v2 has a proper object model with classes, prototypes, and properties:
```ahk
class MyClass {
    __New(name) {
        this.name := name
    }
    Greet() {
        MsgBox "Hello, " this.name "!"
    }
}

obj := MyClass("World")
obj.Greet()
```

## AHK v2 Quick Reference

### Script structure

```ahk
; Directives (optional)
#SingleInstance Force
#Requires AutoHotkey v2.0

; Auto-execute section (runs at startup)
MsgBox "Script started"

; Hotkey definitions
#z::MsgBox "Win+Z pressed"

; Function definitions
MyFunction(param) {
    return param * 2
}

; GUI creation
myGui := Gui()
myGui.Add("Text",, "Hello!")
myGui.Show()
```

### Common hotkey modifier symbols

| Symbol | Key |
|--------|-----|
| `#` | Win |
| `!` | Alt |
| `^` | Ctrl |
| `+` | Shift |
| `<` | Left modifier |
| `>` | Right modifier |
| `*` | Wildcard (fire regardless of other modifiers) |
| `~` | Pass-through (don't block native key function) |
| `$` | Prevent self-triggering with Send |
| `Up` | Fire on key release |

### Frequently used built-in functions

| Category | Functions |
|----------|-----------|
| **Windows** | `WinActivate`, `WinClose`, `WinExist`, `WinGetTitle`, `WinGetClass`, `WinGetPos`, `WinGetText`, `WinMove`, `WinWait`, `WinWaitActive`, `WinWaitClose` |
| **Send keys** | `Send`, `SendText`, `SendInput`, `SendEvent`, `SendPlay` |
| **Mouse** | `Click`, `MouseMove`, `MouseGetPos`, `MouseClickDrag` |
| **Clipboard** | `A_Clipboard` (variable), `ClipWait` |
| **Input** | `InputBox`, `InputHook`, `MsgBox`, `FileSelect`, `DirSelect` |
| **Files** | `FileRead`, `FileAppend`, `FileDelete`, `FileMove`, `FileCopy`, `FileExist`, `DirCreate`, `DirDelete`, `DirExist` |
| **Strings** | `StrSplit`, `SubStr`, `StrLen`, `StrReplace`, `InStr`, `StrLower`, `StrUpper`, `StrTitle`, `Trim`, `LTrim`, `RTrim`, `Format`, `RegExMatch`, `RegExReplace` |
| **Controls** | `ControlClick`, `ControlGetText`, `ControlSetText`, `ControlSend`, `ControlGetFocus`, `ControlGetPos` |
| **RegEx** | `RegExMatch`, `RegExReplace` |
| **Registry** | `RegRead`, `RegWrite`, `RegDelete`, `RegDeleteKey` |
| **Timers** | `SetTimer` |
| **Sound** | `SoundPlay`, `SoundBeep`, `SoundGetVolume`, `SoundSetVolume` |
| **Process** | `ProcessClose`, `ProcessExist`, `Run`, `RunWait` |
| **Pixel** | `PixelGetColor`, `PixelSearch`, `ImageSearch` |
| **GUI** | `Gui()`, `Gui.Add()`, `Gui.Show()`, `Gui.OnEvent()` |

### Common patterns

**Hotkey with context:**
```ahk
#HotIf WinActive("ahk_exe notepad.exe")
^s::MsgBox "Saved contextually"
#HotIf
```

**Timer:**
```ahk
SetTimer () => ToolTip("Timer fired"), 1000
```

**Looping:**
```ahk
; Count loop
Loop 5 {
    MsgBox "Iteration " A_Index
}

; File loop
Loop Files "C:\Temp\*.txt" {
    MsgBox A_LoopFileName
}

; Parse loop
Loop Parse "a,b,c", "," {
    MsgBox A_LoopField
}

; While loop
while (x < 10) {
    x++
}

; For-in loop (objects)
arr := [10, 20, 30]
for index, value in arr {
    MsgBox "Index " index " = " value
}
```

**GUI with events:**
```ahk
myGui := Gui()
myGui.Add("Edit", "w300", "Type here...")
myGui.Add("Button",, "OK").OnEvent("Click", ButtonClick)
myGui.Show()

ButtonClick(ctrl, info) {
    MsgBox "You clicked OK"
}
```

**Reading/writing files:**
```ahk
; Read entire file
content := FileRead("test.txt")

; Append to file
FileAppend "New line`n", "test.txt"

; Read line by line
Loop Read "test.txt" {
    MsgBox A_LoopReadLine
}
```

**Working with arrays and maps:**
```ahk
; Array
fruits := ["apple", "banana", "cherry"]
MsgBox fruits[1]       ; "apple" (1-indexed!)

; Map
person := Map("name", "Alice", "age", 30)
MsgBox person["name"]  ; "Alice"
```

**Error handling:**
```ahk
try {
    result := SomeRiskyOperation()
} catch Error as err {
    MsgBox "Error: " err.Message
} finally {
    ; Cleanup always runs
}
```

### Key names for Send and hotkeys

For the complete list, see `https://www.autohotkey.com/docs/v2/KeyList.htm`.

Common special keys (use `{key}` in Send):
```
{Enter} {Tab} {Escape} {Space} {Backspace}
{Up} {Down} {Left} {Right}
{Home} {End} {PgUp} {PgDn}
{F1}-{F12}
{Ctrl} {Alt} {Shift} {LWin} {RWin}
{CtrlDown} {CtrlUp} {AltDown} {AltUp}
```

### Window title matching

Window functions accept a title parameter that supports special syntax:
- Plain text: `"Untitled - Notepad"`
- `ahk_exe notepad.exe` — match by process
- `ahk_class Notepad` — match by window class
- `ahk_id 0x1234` — match by HWND
- `ahk_pid 1234` — match by process ID
- Multiple criteria separated by space: `"Notepad ahk_exe notepad.exe"`

### File encoding

AHK v2 uses UTF-16 natively. When reading/writing files, use `FileEncoding` to set the encoding:
```ahk
FileEncoding "UTF-8"
content := FileRead("data.txt")
```

## Writing Scripts — Checklist

Before writing any AHK script, verify:

1. **All function calls use v2 syntax** — parentheses and quoted strings, not command syntax
2. **Variables use `:=` for assignment** — never bare `=`
3. **No `%Var%` in expressions** — use direct variable names
4. **Strings are quoted** — `"hello"`, not bare text
5. **`#Requires AutoHotkey v2.0`** at the top is recommended
6. **Error handling uses try/catch** — not `ErrorLevel`
7. **Arrays are 1-indexed** — `arr[1]` is the first element
8. **When in doubt, look up the function** — use the doc URLs above