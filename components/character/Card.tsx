/* eslint-disable @next/next/no-img-element */

import { CardProps } from '@/@types/Api'
import Link from 'next/link'
import React from 'react'

const Card = ({ results }: CardProps) => {
  let display: string | JSX.Element[]

  if (results) {
    display = results.map(x => {
      const { id, name, status, species, gender, origin, location, image } = x
      console.log("results",results)
      return (
        <Link key={id} href={`/character/${id}`}>
          <div key={id} className="relative">
            <div className="flex w-[260px] h-[400px] flex-col bg-white rounded-lg overflow-hidden md:flex-col shadow-md">
              <div className="overflow-hidden">
                <img
                  className="w-full h-[220px] object-cover hover:scale-[1.25] transition-[.6s] duration-[.6s] brightness-[.9]"
                  src={image}
                  alt=""
                />
              </div>
              <div className="p-4 flex flex-col gap-2">
                <div>
                  <div className="text-lg md:text-xl lg:text-2xl font-bold">
                    {name}
                  </div>
                  <div className="flex gap-2">
                    <div>{gender}</div>
                    <div>-</div>
                    <div>{species}</div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-gray-600">Last known location:</div>
                 <h1 className="text-lg text-black lg:text-xl">{location && location.name}</h1>
                </div>
                <div className="flex flex-col">
                  <div className="text-gray-600">Origin:</div>
                  <h1 className="text-lg text-black lg:text-xl">{origin && origin.name}</h1>
                </div>
              </div>
            </div>

            {(() => {
              const statusClasses = getStatusClasses(status);

              return (
                <div className={`absolute top-4 left-4 ${statusClasses}`}>
                  <div className="flex items-center gap-2">
                    <div className="animate-ping absolute inline-flex h-3 w-3 rounded-full opacity-75"></div>
                    <div className="relative inline-flex rounded-full h-3 w-3"></div>
                    <div className="text-white">{status}</div>
                  </div>
                </div>
              );
            })()}
          </div>
        </Link>
      )
    })
  } else {
    display = 'No Characters Found :/'
  }

  return <>{display}</>
}

const getStatusClasses = (status: string) => {
  switch (status) {
    case 'Dead':
      return 'text-red-500';
    case 'Alive':
      return 'text-green-500';
    default:
      return 'text-gray-500';
  }
}

export default Card;
