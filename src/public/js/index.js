console.log('Hola soy el cliente')

const socket = io()

socket.on('wellcome', (data)=>{
    console.log(data)
})