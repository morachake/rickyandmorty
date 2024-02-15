import { Fragment } from 'react'

type NavigationItem ={
    name : string,
    href: string,
    current: boolean
}

const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Locations', href: '#', current: false },
]

function classNames(...classes: string[]) : string {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
  return (
    <div  className="bg-white">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-white text-black' : 'text-black hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
