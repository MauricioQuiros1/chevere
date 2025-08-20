"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function SmoothScrollHandler() {
  const pathname = usePathname()

  useEffect(() => {
    const scrollToTop = () => {
      // Always use smooth scrolling as specified in requirements
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }

    // Small delay to ensure the page has loaded and DOM is ready
    const timer = setTimeout(scrollToTop, 50)

    return () => clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target.tagName === "A") {
        const href = target.getAttribute("href")

        // Handle hash links (same page anchors)
        if (href?.startsWith("#")) {
          e.preventDefault()
          const element = document.querySelector(href)
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
        }

        // Handle "Ver detalle" links and other internal navigation
        if (href && href.startsWith("/")) {
          // Let Next.js handle the navigation, smooth scroll will be handled by pathname effect
          return
        }
      }
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
