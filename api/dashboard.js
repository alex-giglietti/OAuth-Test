import 'dotenv/config'
import { parse } from 'cookie'
import fs from 'fs'

export default function handler(req, res) {
    const isConnected = parse(req.headers.cookie || '')
    if (!isConnected.session)
        res.redirect('/index.html')
    else { 
        res.send(fs.readFileSync('./views/dashboard.html', 'utf8'))
    }
}