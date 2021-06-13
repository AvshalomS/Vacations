// Export socket.io connection ---------------------------------------------------------------------
const http = require('http')
const socketIO = require('socket.io')
const port = process.env.SOCKET_IO_PORT
const server = http.createServer()
const io = socketIO(server)

// authSocket token import -------------------------------------------------------------------------
const authSocket = require('../middlewares/authSocket')
// Controllers imports -----------------------------------------------------------------------------
const followController = require('../controllers/followController')

// Listening for incoming socket connections -------------------------------------------------------
io.on('connection', socket => {

    console.log('Client connected');

    socket.on('followAction', (payload) => {
        authSocket.isUser(payload).then((res) => {
            if (res) {
                const { userId, vacationId } = payload
                followController.updateFollowerStatus(userId, vacationId)
                    .then((response) => {
                        io.sockets.emit('followAction', response)
                    })
            }
        })
    })
    socket.on('addVacationAction', (payload) => {
        authSocket.isAdmin(payload).then((res) => {
            if (res) io.sockets.emit('addVacationAction', payload)
        })
    })
    socket.on('deleteVacationAction', (payload) => {
        authSocket.isAdmin(payload).then((res) => {
            if (res) io.sockets.emit('deleteVacationAction', payload)
        })
    })
    socket.on('editVacationAction', (payload) => {
        authSocket.isAdmin(payload).then((res) => {
            if (res) io.sockets.emit('editVacationAction', payload)
        })
    })
    socket.on('disconnect', () => {
        console.log('Client disconnected...')
    })
    socket.on('error', (err) => {
        console.log('Received error from client: ', socket.id)
        console.log(err)
    })
})

server.listen(port, () => console.log(`Socket.io listenind on port ${port}`))