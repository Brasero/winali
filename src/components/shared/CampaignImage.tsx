'use client'

import {useState} from "react";
import Image from "next/image";

export default function CampaignImage({images}:{images:Array<string>}){
  const [tab ,setTab] = useState(images[0] || null)
  if(tab === null) return null;
  return(
    <>
      <div>
        <Image style={{borderRadius:"12px"}} width={511} height={287} src={tab} alt={"Product image"}/>
      </div>
      <div className={'flex mt-3 gap-3'}>
        {
          images.map((image,id) => {
            return <Image style={{borderRadius:"12px"}} width={121} height={68} key={id} src={image} alt={"Product image"} onClick={() => {setTab(image)}}/>
          })
        }
      </div>
    </>
  )
}
