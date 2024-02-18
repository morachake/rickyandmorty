'use client'

import { LocationInfoProps } from "@/@types/Api";
import Image from "next/image";
import { useEffect, useState } from "react";
import Card from "./Card";
import Link from "next/link";
import Filter from "./filter/filter";

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
}

interface LocationProps {
  locations: Location[];
}

const Locations: React.FC<LocationProps> = ({ locations }) => {
    const [results,setResults] = useState([] as any[])
    const [loading,setLoading] = useState(true)
    const [info,setInfo] = useState<LocationInfoProps>({
        dimension:'',
        name:'',
    })
    const {dimension,name} = info
    const [number,setNumber] = useState(1)

    const api = `https://rickandmortyapi.com/api/location/${number}`
    useEffect(()=>{
        async function fetchData(){
            setLoading(false)
            const data = await fetch(api).then(res => res.json())
            setInfo(data)
            setLoading(false)
            console.log(data)
            const residentData = await Promise.all(
                data.residents.map(async (x: RequestInfo | URL) =>{
                    const res = await fetch(x)
                    return await res.json()
                })
            )
            setResults(residentData)
        }
        fetchData()
    },[api])

  return (
   <main className="h-full">
    <div className="mt-[2rem] flex justify-center">
     <Filter name="Location" changeID={setNumber} total={300} />
    </div>
    <div className="flex justify-center  ">
      <div className="container flex flex-col gap-[1rem]">
        <div className="flex flex-col gap-[1rem] pb-[2rem]">
          <div className="bg-[#F3F4F6] mt-[2rem] rounded-lg p-[1rem] flex flex-col justify-between items-center gap-[1rem] sm:flex-row">
            <h1 className="text-center text-black">
              Location :{' '}
              <span className="text-primary text-black">
                {name === '' ? 'Unknown' : name}
              </span>
            </h1>
            <h5 className="text-center text-black">
              Dimension: {dimension === '' ? 'Unknown' : dimension}
            </h5>
          </div>
          <div className="">
            <div className="flex items-center justify-center flex-row flex-wrap gap-[1rem]">
              {/* <div className="bg-[#F3F4F6] rounded-lg p-[1rem] grid gap-[2rem]"> */}
                {loading ? (
                  <div className="m-auto">
                    <h1>Loading....</h1>
                  </div>
                ) : (
                  <Card results={results} />
                )}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    </main>
  );
};

export default Locations;

