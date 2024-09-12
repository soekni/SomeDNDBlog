import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

type Options = {
  provider: "giscus"
  options: {
    repo: 'soekni/SomeDNDBlog'
    repoId: 'R_kgDOMPr8cg'
    category: 'Announcements'
    categoryId: 'DIC_kwDOMPr8cs4ChH0T'
    mapping?: "url"
    strict?: boolean
    reactionsEnabled?: boolean
    inputPosition?: "bottom"
  }
}

function boolToStringBool(b: boolean): string {
  return b ? "1" : "0"
}

export default ((opts: Options) => {
  const Comments: QuartzComponent = (_props: QuartzComponentProps) => <div class="giscus"></div>
  Comments.afterDOMLoaded = `
      const giscusScript = document.createElement("script")
      giscusScript.src = "https://giscus.app/client.js"
      giscusScript.async = true
      giscusScript.crossOrigin = "anonymous"
      giscusScript.setAttribute("data-loading", "lazy")
      giscusScript.setAttribute("data-emit-metadata", "0")
      giscusScript.setAttribute("data-repo", "soekni/SomeDNDBlog")
      giscusScript.setAttribute("data-repo-id", "R_kgDOMPr8cg")
      giscusScript.setAttribute("data-category", "Announcements")
      giscusScript.setAttribute("data-category-id", "DIC_kwDOMPr8cs4ChH0T")
      giscusScript.setAttribute("data-mapping", "${opts.options.mapping ?? "url"}")
      giscusScript.setAttribute("data-strict", "${boolToStringBool(opts.options.strict ?? true)}")
      giscusScript.setAttribute("data-reactions-enabled", "${boolToStringBool(opts.options.reactionsEnabled ?? true)}")
      giscusScript.setAttribute("data-input-position", "${opts.options.inputPosition ?? "bottom"}")
      const theme = document.documentElement.getAttribute("saved-theme")
      giscusScript.setAttribute("data-theme", theme)
      document.head.appendChild(giscusScript)
      const changeTheme = (e) => {
        const theme = e.detail.theme
        const iframe = document.querySelector('iframe.giscus-frame')
        if (!iframe) {
          return
        }
        iframe.contentWindow.postMessage({
          giscus: {
            setConfig: {
              theme: theme
            }
          }
        }, 'https://giscus.app')
      }
      document.addEventListener("nav", () => {
        document.addEventListener("themechange", changeTheme)
        window.addCleanup(() => document.removeEventListener("themechange", changeTheme))
      })
  `

  return Comments
}) satisfies QuartzComponentConstructor<Options>
