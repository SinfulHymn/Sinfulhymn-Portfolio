import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <div className="mr-2 mb-1 rounded-lg border border-primaryAccent p-1 text-xs font-medium uppercase text-primaryAccent hover:text-secondaryAccent dark:border-secondaryAccent dark:text-secondaryAccent  dark:hover:text-primaryAccent">
        {text.split(' ').join('-')}
      </div>
    </Link>
  )
}

export default Tag
