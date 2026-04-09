; Converted from AHK v1 to v2 syntax:
; - MsgBox command -> MsgBox() function call
; - Variable assignment = -> := with quoted string
; - If statement -> if with parenthesized expression and quoted comparison value
; - MsgBox %var% -> MsgBox(var) (no percent-sign dereferencing needed in v2)
MsgBox("Hello World")
MyVar := "Some text"
if (MyVar = "Hello")
{
    MsgBox(MyVar)
}