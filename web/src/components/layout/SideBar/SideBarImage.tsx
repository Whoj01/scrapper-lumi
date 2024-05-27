import Image from "next/image";
import Link from "next/link";


type SideBarImageProps = {
  src: string
  alt: string
  width: number
  height: number
}


export const SideBarImage = ({ src, alt, width, height }: SideBarImageProps) => {
  return (
    <Link href="/">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="cursor-pointer h-7"
      />
    </Link>
  )
}