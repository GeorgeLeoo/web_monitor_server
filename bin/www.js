import ip from 'ip'
import app from './../src/app.js'

const ipAddress = ip.address()

const IP = '0.0.0.0'
const PORT = 54321


app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

function listenHandler() {
    console.log('--------------------------------------------------')
    console.log('--     Server is running.                       --')
    console.log('--     You can open Response://' + ipAddress + ':'+ PORT + '   --')
    console.log('--     You can open http://localhost'+':'+ PORT + '      --')
    console.log('--------------------------------------------------')
}

app.listen(PORT, IP, listenHandler)


