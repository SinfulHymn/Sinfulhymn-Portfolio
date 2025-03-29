import Image from 'next/image'

export default function GradientOverlay() {
  return (
    <>
      <div className="fixed bottom-0 left-12 -z-10 h-full w-full opacity-100 sm:-bottom-11 sm:-top-1/3 sm:-left-0">
        <Image
          src={'/static/images/left-dark-gradient.png'}
          alt="Picture of the author"
          width={1000}
          height={800}
          priority
        ></Image>
      </div>
      <div className="fixed top-96 -right-24 -z-10  h-full w-full opacity-100 sm:-top-96 sm:-right-1/4">
        <Image
          src={'/static/images/right-dark-gradient.png'}
          alt="Picture of the author"
          width={1500}
          height={1500}
          priority
        ></Image>
      </div>
      <div className="fixed -bottom-11 -left-28 -z-10 h-full w-full opacity-100 sm:-bottom-[30%] sm:-left-[7%]">
        <Image
          src={'/static/images/right-dark-gradient.png'}
          alt="Picture of the author"
          width={1700}
          height={800}
          priority
        ></Image>
      </div>
      <div className="fixed -top-64 right-64 -z-10 h-full w-full opacity-100 sm:top-[37%] md:-right-[40%]">
        <Image
          src={'/static/images/left-dark-gradient.png'}
          alt="Picture of the author"
          width={1000}
          height={800}
          priority
        ></Image>
      </div>
      <div className="fixed top-1/2 right-56 -z-10 h-full w-full opacity-100 sm:-right-3/4">
        <Image
          src={'/static/images/right-dark-gradient.png'}
          alt="Picture of the author"
          width={1300}
          height={1300}
          priority
        ></Image>
      </div>
    </>
  )
}
