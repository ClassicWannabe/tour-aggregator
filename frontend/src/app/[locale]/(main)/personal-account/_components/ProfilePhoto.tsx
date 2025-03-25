import { User } from "lucide-react"
import Image from "next/image"

type ProfilePhotoProps = {
  photoUrl?: string
}

export default function ProfilePhoto({ photoUrl }: ProfilePhotoProps) {
  return (
    <>
      {photoUrl ? (
        <div className="rounded-lg w-16 h-16 relative overflow-hidden">
          <Image src={photoUrl} alt="profile photo" fill />
        </div>
      ) : (
        <User className="text-white bg-colorBgContainer w-16 h-16 p-3 rounded-lg" />
      )}
    </>
  )
}
