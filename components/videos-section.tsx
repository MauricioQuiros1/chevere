"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, X } from "lucide-react"

interface Video {
  id: string
  title: string
  thumbnail: string
  url: string
  type: "youtube" | "vimeo" | "mp4" | "dailymotion" | "twitch" | "other"
}

// This array will be empty by default, causing the section to be hidden
// Add videos here when available
const videos: Video[] = [
  // Example structure:
  // {
  //   id: "1",
  //   title: "Tour Hacienda Cafetera Coloma",
  //   thumbnail: "/placeholder.svg?height=300&width=400",
  //   url: "https://www.youtube.com/watch?v=VIDEO_ID",
  //   type: "youtube"
  // }
]

export function VideosSection() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  // Hide section if no videos are available
  if (videos.length === 0) {
    return null
  }

  const openModal = (video: Video) => {
    setSelectedVideo(video)
  }

  const closeModal = () => {
    setSelectedVideo(null)
  }

  const detectVideoType = (url: string): Video["type"] => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube"
    if (url.includes("vimeo.com")) return "vimeo"
    if (url.includes("dailymotion.com")) return "dailymotion"
    if (url.includes("twitch.tv")) return "twitch"
    if (url.match(/\.(mp4|webm|ogg)$/i)) return "mp4"
    return "other"
  }

  const getEmbedUrl = (video: Video) => {
    const url = video.url

    switch (video.type) {
      case "youtube":
        // Handle both youtube.com and youtu.be URLs
        let youtubeId = ""
        if (url.includes("youtu.be/")) {
          youtubeId = url.split("youtu.be/")[1]?.split("?")[0]
        } else if (url.includes("youtube.com/watch?v=")) {
          youtubeId = url.split("v=")[1]?.split("&")[0]
        } else if (url.includes("youtube.com/embed/")) {
          youtubeId = url.split("embed/")[1]?.split("?")[0]
        }
        return `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`

      case "vimeo":
        const vimeoId = url.split("/").pop()?.split("?")[0]
        return `https://player.vimeo.com/video/${vimeoId}?autoplay=1`

      case "dailymotion":
        const dailymotionId = url.split("/video/")[1]?.split("?")[0] || url.split("/").pop()
        return `https://www.dailymotion.com/embed/video/${dailymotionId}?autoplay=1`

      case "twitch":
        if (url.includes("/videos/")) {
          const videoId = url.split("/videos/")[1]?.split("?")[0]
          return `https://player.twitch.tv/?video=${videoId}&parent=${window.location.hostname}&autoplay=true`
        } else {
          const channelName = url.split("twitch.tv/")[1]?.split("?")[0]
          return `https://player.twitch.tv/?channel=${channelName}&parent=${window.location.hostname}&autoplay=true`
        }

      case "mp4":
        return url

      default:
        // For other URLs, try to use them directly in iframe
        return url
    }
  }

  return (
    <>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Videos</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre nuestros destinos y experiencias a través de estos videos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {videos.map((video) => (
              <div
                key={video.id}
                className="group cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                onClick={() => openModal(video)}
              >
                <div className="relative aspect-video bg-gray-200">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-white/90 group-hover:bg-white rounded-full p-4 transition-colors duration-300">
                      <Play className="h-8 w-8 text-gray-900 ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-700 transition-colors duration-300">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-3 transition-all duration-200 hover:scale-110"
              size="sm"
            >
              <X className="h-5 w-5" />
            </Button>

            {selectedVideo.type === "mp4" ? (
              <video
                src={getEmbedUrl(selectedVideo)}
                controls
                autoPlay
                className="w-full h-full object-contain"
                onError={(e) => {
                  console.log("[v0] Video load error:", e)
                }}
              />
            ) : (
              <iframe
                src={getEmbedUrl(selectedVideo)}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onError={(e) => {
                  console.log("[v0] Iframe load error:", e)
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}
