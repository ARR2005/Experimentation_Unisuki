import { CameraView, useCameraPermissions } from 'expo-camera'
import { useRouter } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { detectClothing, getHighConfidencePredictions, loadModel } from '../../lib/imageDetection'

interface DetectionState {
  isLoading: boolean
  error: string | null
  detections: Array<{ className: string; probability: number }>
}

export default function PostCamera() {
  const [permission, requestPermission] = useCameraPermissions()
  const cameraRef = useRef<any>(null)
  const [taking, setTaking] = useState(false)
  const [detectionState, setDetectionState] = useState<DetectionState>({
    isLoading: false,
    error: null,
    detections: [],
  })
  const router = useRouter()

  // Load the model on component mount
  useEffect(() => {
    const initializeModel = async () => {
      try {
        await loadModel()
        console.log('Image detection model initialized')
      } catch (error) {
        console.error('Failed to initialize model:', error)
        setDetectionState((prev) => ({
          ...prev,
          error: 'Failed to load detection model',
        }))
      }
    }

    initializeModel()
  }, [])

  if (!permission) return <View />

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50 px-6">
        <Text className="text-center text-gray-800 text-base mb-6 font-medium">We need camera permission to capture photos</Text>
        <TouchableOpacity onPress={requestPermission} className="bg-blue-600 rounded-lg px-8 py-3 min-w-32 items-center">
          <Text className="text-white font-semibold text-base">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    )
  }

  async function takePicture() {
    if (!cameraRef.current || taking) return
    try {
      setTaking(true)
      setDetectionState((prev) => ({ ...prev, isLoading: true, error: null }))

      const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 })
      const uri = photo.uri

      // Run image detection
      try {
        const result = await detectClothing(uri)
        const highConfidence = getHighConfidencePredictions(result, 0.3)

        setDetectionState((prev) => ({
          ...prev,
          isLoading: false,
          detections: result.predictions,
        }))

        console.log('Detection results:', {
          topPrediction: result.topPrediction,
          allPredictions: result.predictions,
          highConfidence,
        })

        // Navigate with detection data
        router.push({
          pathname: '/(pill)/postForm',
          params: {
            photo: uri,
            detectionClass: result.topPrediction.className,
            detectionConfidence: result.topPrediction.probability.toFixed(2),
          },
        } as any)
      } catch (detectionError) {
        console.error('Detection failed:', detectionError)
        // Still navigate even if detection fails
        router.push({ pathname: '/(pill)/postForm', params: { photo: uri } } as any)
      }
    } catch (e) {
      console.error('Camera error:', e)
      setDetectionState((prev) => ({
        ...prev,
        error: 'Failed to capture image',
        isLoading: false,
      }))
    } finally {
      setTaking(false)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back">
        <View className="flex-1 justify-center mb-56" pointerEvents="none">
          <View className="flex-1" />
          <View className="flex-row items-center">
            <View className="flex-1" />
            <View className="w-[340px] h-[560px] border-2 border-white/90" />
            <View className="flex-1" />
          </View>
          <View className="flex-2" />
        </View>
      </CameraView>

      {/* Detection Results Overlay */}
      {detectionState.detections.length > 0 && (
        <View className="absolute top-12 left-4 right-4 bg-black/85 rounded-xl p-4 backdrop-blur">
          <Text className="text-white font-semibold text-sm mb-3">Detection Results</Text>
          {detectionState.detections.slice(0, 3).map((detection, index) => (
            <View key={index} className="flex-row justify-between items-center py-1.5">
              <Text className="text-white text-xs font-medium flex-1">{detection.className}</Text>
              <Text className="text-white/90 text-xs font-semibold">{(detection.probability * 100).toFixed(0)}%</Text>
            </View>
          ))}
        </View>
      )}

      {/* Error Display */}
      {detectionState.error && (
        <View className="absolute top-12 left-4 right-4 bg-red-500/90 rounded-xl p-4 flex-row items-center">
          <Text className="text-white text-xs font-medium flex-1">⚠️ {detectionState.error}</Text>
        </View>
      )}

      {/* Camera Controls */}
      <View className="absolute bottom-12 left-0 right-0 flex-row justify-center items-center">
        <TouchableOpacity
          onPress={takePicture}
          className="w-16 h-16 rounded-full bg-white/15 items-center justify-center border-2 border-white/50"
          disabled={taking || detectionState.isLoading}
          activeOpacity={0.7}
        >
          {taking || detectionState.isLoading ? (
            <ActivityIndicator color="#fff" size="large" />
          ) : (
            <View className="w-12 h-12 rounded-full bg-white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}