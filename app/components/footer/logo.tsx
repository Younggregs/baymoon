import Image from 'next/image'
import Link from 'next/link'

export default function Logo({shade, menu=false}: {shade: string, menu?: boolean}) {
    return (
        <Link href="/">
            <Image
                src={'/next.svg'}
                width={!menu ? 100 : 75}
                height={!menu ? 150 : 100}
                alt="Ranq logo"
            />
        </Link>
    )
}