import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const getToken = ():string => {
    return cookies.get('@monochi/token');
}

export const setToken = (token:string):void => {
    cookies.set('@monochi/token', token, {
        path: '/',
        maxAge: 24 * 60 * 60,
        sameSite: 'strict'
    })
}

export const removeToken = ():void => {
    cookies.remove('@monochi/token')
}   

export const setRedirect = (redirect:string):void => {
    cookies.set('@monochi/redirect', redirect)
}

export const getRedirect = ():string => {
    return cookies.get('@monochi/redirect');
}