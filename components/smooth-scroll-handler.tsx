"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function SmoothScrollHandler() {
  const pathname = usePathname()

  useEffect(() => {
    const scrollOnRouteChange = () => {
      const hash = window.location.hash
      if (hash) {
        const el = document.querySelector(hash)
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" })
          return
        }
      }
      // fallback: top
      window.scrollTo({ top: 0, behavior: "smooth" })
    }

    // Small delay to ensure the page has loaded and DOM is ready
    const timer = setTimeout(scrollOnRouteChange, 50)

    return () => clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    const handleAnchorClick = (e: Event) => {
      const el = (e.target as HTMLElement)?.closest("a") as HTMLAnchorElement | null
      if (!el) return
      const href = el.getAttribute("href") || ""

      // Same-page hash links like "#traslados"
      if (href.startsWith("#")) {
        e.preventDefault()
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
          // update hash without jump
          history.pushState(null, "", href)
        }
        return
      }

      // Links to home section like "/#traslados"
      if (href.startsWith("/#")) {
        // If already on home, intercept and smooth-scroll without full navigation
        if (window.location.pathname === "/") {
          e.preventDefault()
          const hash = href.slice(1) // "#traslados"
          const element = document.querySelector(hash)
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
            history.pushState(null, "", href)
          }
        }
        // else: allow navigation; after route change, the pathname effect will smooth-scroll
        return
      }

      // Other internal links: let Next.js handle navigation
      if (href.startsWith("/")) return
    }

    document.addEventListener("click", handleAnchorClick)
    return () => document.removeEventListener("click", handleAnchorClick)
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }, 100)
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  return null
}
