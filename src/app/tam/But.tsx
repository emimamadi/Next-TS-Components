import React, { CSSProperties } from 'react'

type P={
    classname:string
    Name:string[]
    style:CSSProperties
}

export default function But({classname,Name ,style }:P) {
  return (
    <>
    <div className={`${classname} w-full h-[50%] text-sky-500`}>{Name[0]}</div>
    <div style={style}>{Name[1]}</div>
    
    </>
    
  )
}
