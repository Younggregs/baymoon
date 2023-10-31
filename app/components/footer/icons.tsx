import Image from 'next/image'

export default function Icon({name, size}: {name: string, size?: number}) {

    type Icons = {
        [key: string]: string
    }
    const icons: Icons = {
        logo: '/logo-dark.svg',
        twitter: '/twitter.svg',
        facebook: '/facebook.svg',
        instagram: '/instagram.svg',
        linkedin: '/linkedin.svg',
        menu: '/menu.svg',
        signin: '/signin.svg',
        signout: '/signout.svg',
        step1: '/step-1.svg',
        step2: '/step-2.svg',
        step3: '/step-3.svg',
        tickCircle: '/tick-circle.svg',
        drag: '/drag.svg',
        clock: '/clock.svg',
        persons: '/persons.svg',
    }
    return (
        <Image
            src={icons[name]}
            width={!size ? 30 : size}
            height={!size ? 30 : size}
            alt="Ranq logo"
        />
    )
}
