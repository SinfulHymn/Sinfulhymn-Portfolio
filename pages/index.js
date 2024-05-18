import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import NewsletterForm from '@/components/NewsletterForm'
import ButtonCard from '@/components/ButtonCard'

const MAX_DISPLAY = 2

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')
  const projects = projectsData
  return { props: { posts, projects } }
}

const notFound = () => {
  return <div className="py-6">No Posts Found</div>
}

export default function Home({ posts, projects }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="nothing">
        <div className="space-y-2 py-8 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-800 dark:text-white sm:text-2xl sm:leading-10 md:text-4xl md:leading-5">
            Hello, I'm{' '}
            <span className=" text-primary-500 dark:text-primary-600">
              {siteMetadata.firstName} {siteMetadata.lastName}
            </span>
            {/* {siteMetadata.firstName.substring(0, 3)}
            <span className="text-primary-600">{siteMetadata.firstName.substring(3, 6)}</span>
            {siteMetadata.firstName.substring(6)} {siteMetadata.lastName} */}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
          <div className="flex w-full flex-wrap">
            <ButtonCard
              title={'Projects'}
              description={'Check out my projects'}
              href={'/projects'}
              className="py-4 md:px-2"
            />
            <ButtonCard
              title={'About'}
              description={'Learn more about me'}
              href={'/about'}
              className="py-4 md:px-2"
            />
            <ButtonCard
              title={'Blog'}
              description={'Read my blog posts'}
              href={'/blog'}
              className="py-4 md:px-2"
            />
          </div>
        </div>

        <div></div>

        <div className="py-2">
          <div className="flex items-center justify-between py-2 text-2xl font-semibold">
            <div>Recent Projects</div>
            {projectsData.length > MAX_DISPLAY && (
              <div className="flex justify-end text-base font-medium leading-8">
                <Link
                  href="/projects"
                  className="text-primary-500 hover:text-primary-600 dark:text-primary-600 dark:hover:text-primary-500"
                  aria-label="all posts"
                >
                  All Projects &rarr;
                </Link>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 xl:grid-cols-2">
            {projectsData.slice(0, 4).map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
                tags={d.tags}
                repo={d.repo}
              />
            ))}
          </div>
          {projectsData.length > MAX_DISPLAY && (
            <div className="flex justify-end text-base font-medium leading-8">
              <Link
                href="/projects"
                className="text-primary-500 hover:text-primary-600 dark:text-primary-600 dark:hover:text-primary-500"
                aria-label="all posts"
              >
                All Projects &rarr;
              </Link>
            </div>
          )}
        </div>
        <div className="py-2">
          <div className="py-2 text-2xl font-semibold">Recent Posts</div>
          <ul className="">
            {!posts.length && notFound()}
            {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
              const { slug, date, title, summary, tags } = frontMatter
              return (
                <li key={slug} className="py-4">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date)}</time>
                        </dd>
                      </dl>
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-2">
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight">
                              <Link
                                href={`/blog/${slug}`}
                                className="text-gray-900 dark:text-gray-100"
                              >
                                {title}
                              </Link>
                            </h2>
                            <div className="flex flex-wrap py-2">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-primary-500 hover:text-primary-600 dark:text-primary-600 dark:hover:text-primary-500"
                            aria-label={`Read "${title}"`}
                          >
                            Read more &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:text-primary-600 dark:hover:text-primary-500"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
