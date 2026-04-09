; Fixed for AHK v2: MsgBox command→function syntax, = → :=, %Var% → direct ref, If→expression
#Requires AutoHotkey v2.0

MsgBox "Hello World"
MyVar := "Some text"
if (MyVar = "Hello")
{
    MsgBox MyVar
}