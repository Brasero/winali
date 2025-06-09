'use client'

import {useState} from "react";
import Image from "next/image";
import {useIsMobile} from "@/hook/useIsMobile";

export default function CampaignImage({images}:{images:Array<string>}){
  const [tab ,setTab] = useState(images[0] || null)
    const isMobile = useIsMobile()
    const previewSize = isMobile ? {width: 511, height: 287} : {width: 511, height: 287};
  if(tab === null) return null;
  return(
    <>
      <div className={"p-[5px] w-fit"}>
        <Image style={{borderRadius:"12px"}} {...previewSize} src={tab} alt={"Product image"}/>
      </div>
      <div className={'flex mt-3 p-[5px] gap-3 w-full'}>
        {
          images.map((image,id) => {
            return <Image style={{borderRadius:"12px"}} width={121} height={68} key={id} src={image} alt={"Product image"} onClick={() => {setTab(image)}}/>
          })
        }
      </div>
    </>
  )
}