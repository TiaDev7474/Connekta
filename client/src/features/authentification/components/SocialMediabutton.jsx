import React from 'react'
import  google from "../../../assets/google.svg"
import  facebook from "../../../assets/facebook.svg"
function SocialMediabutton({brandName}) {
    const brandLogo = brandName ==="facebook" ? facebook : google
    const href = brandName ==="facebook" ? "/login/federated/facebook" :""
  return (
     <a href={href} className='brandbutton  mb-5'>
        <span className='w-[50px]  '>
             <img src={brandLogo} alt="facebook icon" />
        </span>
        <h3 className="- md:block flex-1 uppercase">
            CONTINUE WITH {brandName}
            
        </h3>                
    </a>
  )
}

export default SocialMediabutton