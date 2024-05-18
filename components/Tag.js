import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <div className="mr-2 mb-1 rounded-lg border border-primary-500 p-1 text-xs font-medium uppercase text-primary-500 hover:text-primary-600 dark:border-primary-600 dark:text-primary-600  dark:hover:text-primary-500">
        {text.split(' ').join('-')}
      </div>
    </Link>
  )
}

export default Tag
