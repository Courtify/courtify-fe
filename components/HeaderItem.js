import Link from 'next/link'

function HeaderItem({ path, Icon, title }) {
  return (
    <Link href={path}>
      <div className="group inline-flex flex-col w-12 sm:w-20 items-center cursor-pointer hover:text-white">
        <Icon className="h-8 mb-1 group-hover:animate-bounce " />
        <p className="opacity-0 group-hover:opacity-100 md:opacity-80 tracking-widest">
          {title}
        </p>
      </div>
    </Link>
  )
}

export default HeaderItem
