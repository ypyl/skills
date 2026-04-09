#Requires AutoHotkey v2.0

^+t:: {
    Send("user@example.com")
}

^+d:: {
    Send(FormatTime(, "yyyy-MM-dd"))
}