import "./ThemeSwitch.css"

export default function ThemeSwitch({isDark, dispatch}){
    // TODO: Use ACTION instead of string   
    return <div className="theme-switch" onClick={() => dispatch({type: "toggle-theme"})}>
        {isDark ? "☀️" :"🌙"}
    </div>
}