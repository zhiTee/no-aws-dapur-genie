"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, X, RotateCcw } from "lucide-react"

interface CameraCaptureProps {
  onCapture: (imageFile: File) => void
  onClose: () => void
}

export default function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = React.useState<MediaStream | null>(null)
  const [facingMode, setFacingMode] = React.useState<"user" | "environment">("environment")

  const startCamera = async (facing: "user" | "environment" = facingMode) => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing }
      })
      
      setStream(newStream)
      if (videoRef.current) {
        videoRef.current.srcObject = newStream
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
  }

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (!context) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    context.drawImage(video, 0, 0)

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `camera-capture-${Date.now()}.jpg`, {
          type: "image/jpeg"
        })
        onCapture(file)
        stopCamera()
        onClose()
      }
    }, "image/jpeg", 0.8)
  }

  const switchCamera = () => {
    const newFacing = facingMode === "user" ? "environment" : "user"
    setFacingMode(newFacing)
    startCamera(newFacing)
  }

  React.useEffect(() => {
    startCamera()
    return () => stopCamera()
  }, [])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Take Photo</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative mb-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-64 object-cover rounded-lg bg-gray-100"
            />
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <div className="flex justify-center gap-4">
            <Button variant="outline" size="icon" onClick={switchCamera}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button onClick={capturePhoto} className="flex-1">
              <Camera className="h-4 w-4 mr-2" />
              Capture
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}