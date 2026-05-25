import 'dotenv/config'
import { parse } from 'cookie'

export default async function handler(req, res) {
    const cookies = parse(req.headers.cookie || '')
    if (!cookies.session){
        res.redirect('index.html')
    }
    const session = JSON.parse(cookies.session)
    const accToken = session.accToken
    if (!accToken)
        res.redirect('index.html')
    else {
      const response = await fetch(`https://people.googleapis.com/v1/people/me?personFields=birthdays,photos,genders,emailAddresses,nicknames`, {
        headers: {
            Authorization: `Bearer ${accToken}`
        }

       })
       const data = await response.json()
       res.json(data)
    }
}