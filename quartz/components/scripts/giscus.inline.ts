const lightTheme = "noborder_light"
const darkTheme = "noborder_dark"

function sendMessage<T>(message: T) {
  const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
  if (!iframe) return;
  iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
}

const onThemeToggle = ()=>{
  const toggleSwitch = document.querySelector("#darkmode-toggle") as HTMLInputElement
  changeTheme(toggleSwitch.checked)
}

function changeTerm(url) {
  sendMessage({ setConfig: { term: url } })
}

function changeTheme(dark) {
  sendMessage({ setConfig: { theme: dark? darkTheme : lightTheme } })
}

function notMainPage(detail) {
  return detail.url !== "index"
}

function loadComments() {
  const darkMode = (document.querySelector("#darkmode-toggle") as HTMLInputElement).checked
  const script = document.createElement("script");

  script.type = "text/javascript"
  script.src = "https://giscus.app/client.js"
  script.async = true
  script.setAttribute("data-repo", "soekni/SomeDNDBlog")
  script.setAttribute("data-repo-id", "R_kgDOMPr8cg")
  script.setAttribute("data-category", "Announcements")
  script.setAttribute("data-category-id", "DIC_kwDOMPr8cs4ChH0T")
  script.setAttribute("data-mapping", "pathname")
  script.setAttribute("data-strict", "0")
  script.setAttribute("data-reactions-enabled", "1")
  script.setAttribute("data-emit-metadata", "0")
  script.setAttribute("data-input-position", "bottom")
  script.setAttribute("data-theme", darkMode ? darkTheme : lightTheme)
  script.setAttribute("data-lang", "de")
  script.setAttribute("crossorigin", "anonymous")
  script.setAttribute("data-loading", "lazy")

  document.body.appendChild(script);
}


document.addEventListener("nav", ({detail}) => {
  const toggleSwitch = document.querySelector("#darkmode-toggle") as HTMLInputElement
  toggleSwitch.addEventListener("change", onThemeToggle)
  window.addCleanup(() => toggleSwitch.removeEventListener("change", onThemeToggle))

  if (notMainPage(detail)) {
    loadComments()
    onThemeToggle()
  }
})
