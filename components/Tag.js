import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <div className="mr-2 mb-1 rounded-lg border border-secondaryAccent  p-1 text-xs font-semibold uppercase text-secondaryAccent hover:border-secondaryAccent hover:text-primaryAccent hover:text-secondaryAccent dark:border-secondaryAccentDark dark:text-secondaryAccentDark  dark:hover:text-primaryAccent">
        {text.split(' ').join('-')}
      </div>
    </Link>
  )
}

export default Tag
