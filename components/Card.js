import Image from './Image'
import Link from './Link'
import Tag from './Tag'

const Card = ({ title, description, imgSrc, href, repo, tags }) => (
  <div className="dark:bg- w-full rounded-xl bg-[#f1f1f1] bg-opacity-50 dark:bg-[#181a21] dark:bg-opacity-50">
    <div
      className={`${
        imgSrc && 'h-full'
      }  flex flex-col overflow-hidden rounded-lg border border-gray-200 border-opacity-60 dark:border-gray-700`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="w-full object-cover object-center md:h-[240px]"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="flex flex-grow flex-col p-6  ">
        <h2 className="leading-8s mb-1 text-2xl font-bold tracking-tight">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <div className="flex flex-wrap">
          {tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </div>
        <p className="prose mb-auto max-w-none text-black dark:text-white">{description}</p>
        {href && (
          <div className="flex flex-row justify-between">
            <Link
              href={href}
              className="text-base font-medium leading-6 text-secondaryAccent hover:text-secondaryAccent dark:text-secondaryAccentDark dark:hover:text-primaryAccent"
              aria-label={`Link to ${title}`}
            >
              Live Site &rarr;
            </Link>
            <Link
              href={repo}
              className="text-base font-medium leading-6 text-secondaryAccent hover:text-secondaryAccent dark:text-secondaryAccentDark dark:hover:text-primaryAccent"
              aria-label={`Link to ${title}`}
            >
              Code Repo &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  </div>
)

export default Card
