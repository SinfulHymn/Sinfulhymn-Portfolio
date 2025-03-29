import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'

export default function AuthorLayout({ children, frontMatter }) {
  const { name, avatar, occupation, company, email, X, linkedin, github, instagram } = frontMatter

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div className="divide-y divide-secondaryAccent dark:divide-secondaryAccentDark">
        {/* <div className="space-y-2 pt-2 pb-2 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-10">
            About
          </h1>
        </div> */}
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8">
            <Image
              src={avatar}
              alt="avatar"
              width="192"
              height="192"
              className="h-48 w-48 rounded-full object-cover object-[50%_10%]"
            />
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-4 tracking-tight text-secondaryAccent dark:text-secondaryAccentDark">
              {name}
            </h3>
            <div className="text-black dark:text-white">{occupation}</div>
            <div className="text-black dark:text-white">{company}</div>
            <div className="flex space-x-5 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="github" href={github} />
            </div>
          </div>
          <div className="prose max-w-none space-y-6 pt-6 pb-6 text-black dark:prose-dark dark:text-white xl:col-span-2">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
