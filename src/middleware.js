import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";
import absoluteUrl from "next-absolute-url";

const secret = new TextEncoder().encode(process.env.SESSION_KEY)

//Middleware to intercept any request for /dashboard 
// Check whether cookie exists, verify it and then direct user
export default function middleware(req){
    const {origin} = absoluteUrl(req)
    const  {cookies} = req
    const url = req.url
    if(url.includes("/dashboard")){
        const token = cookies.get("token")
        if(token){
            jwtVerify(token.value, secret).then((res) => {
                if(res.payload.id){
                    return NextResponse.redirect(` ${origin}/dashboard/dashboard`)
                }
                else{
                    return NextResponse.redirect(`${origin}/login`)
                }
            })
        }
        else{
            return NextResponse.redirect(`${origin}/login`)
        }
    }
}
