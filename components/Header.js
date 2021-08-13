import {
  CollectionIcon,
  HomeIcon,
  LightningBoltIcon,
  SearchIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import HeaderItem from './HeaderItem'

export default function Header() {
  return (
    <header className="flex flex-col sm:flex-row m-5 h-auto justify-between items-center">
      <div className="flex flex-grow justify-evenly max-w-2xl">
        <HeaderItem path="/" title="HOME" Icon={HomeIcon} />
        <HeaderItem
          path="/createRecord"
          title="Create"
          Icon={LightningBoltIcon}
        />
        <HeaderItem path="/uploadEvidence" title="Upload" Icon={CollectionIcon} />
        <HeaderItem path="/viewRecord" title="View" Icon={SearchIcon} />

      </div>

      <Image
        className="object-contain "
        src="/images/logo.png"
        width={200}
        height={50}
      />
    </header>
  )
}
