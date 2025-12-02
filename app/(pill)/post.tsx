import { CameraType, CameraView, useCameraPermissions } from 'expo-camera'
import { useRouter } from 'expo-router'
import React, { useRef, useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'

export default function PostCamera() {
  const [permission, requestPermission] = useCameraPermissions()
  const [facing, setFacing] = useState<CameraType>('back')
  const cameraRef = useRef<any>(null)
  const [taking, setTaking] = useState(false)
  const router = useRouter()

  if (!permission) return <View />

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text style={{ marginBottom: 12 }}>We need camera permission</Text>
        <TouchableOpacity onPress={requestPermission} className="p-2.5 bg-blue-600 rounded-lg">
          <Text style={{ color: 'white' }}>Grant</Text>
        </TouchableOpacity>
      </View>
    )
  }

  async function takePicture() {
    if (!cameraRef.current || taking) return
    try {
      setTaking(true)
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 })
      const uri = photo.uri
      // navigate to post form with photo
      router.push({ pathname: '/(pill)/postForm', params: { photo: uri } } as any)
    } catch (e) {
      console.error(e)
    } finally {
      setTaking(false)
    }
  }

  function flip() {
    setFacing((t) => (t === 'back' ? 'front' : 'back'))
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing}>
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

      <View className="absolute bottom-10 left-0 right-0 flex-row justify-center items-center">
        <TouchableOpacity onPress={takePicture} className="w-[72px] h-[72px] rounded-full bg-white/10 items-center justify-center" disabled={taking}>
          {taking ? <ActivityIndicator color="#fff" /> : <View className="w-[52px] h-[52px] rounded-full bg-white" />}
        </TouchableOpacity>
      </View>
    </View>
  )
}