
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { ROUTES } from './conf'
 
export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname
    const token = request.cookies.get('access')?.value
    if(!token){
        return NextResponse.redirect(new URL(ROUTES.auth.login, request.nextUrl))
    }


    if(pathName.startsWith('/echoverse')){
      const response = await fetch('http:/localhost:8000/api/users/me/is-artist',{headers:{
        'Authorization':`Bearer ${token}`
      }})
     if(response.ok){
      return NextResponse.next()
     }
     else{
      return NextResponse.redirect(new URL('/forbidden', request.url))
     }

    }

    
  return NextResponse.next()
}
 
export const config = {
  matcher: ['/echoverse/:path*','/echo-hunt/:path*'],
}