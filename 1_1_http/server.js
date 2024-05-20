import http from 'node:http'

const PORT = 3333

const participantes = []
const server = http.createServer((request, response)=>{
    const {method, url} = request
    //localhost:3333/rotasDaAplicação
    if(method === 'GET' && url === '/participantes'){
        //Listar todos os participantes
        response.writeHead(200, {'Content-Type': 'application/json'})
        response.end(JSON.stringify(participantes))
    }else if(method === 'POST' && url === '/participantes'){
        let body = ''
        request.on('data', (chunk)=>{
            body += chunk
        })
        request.on('end', ()=>{
           const participante = JSON.parse(body) 
           if(participante.idade < 16){
            response.writeHead(403, {'Content-Type': 'application/json'})
            response.end(
                JSON.stringify({message: "Apenas maiores de 18 anos"})
            )
            return
           }

           //Validação de senha 
            if(participante.senha !== participante.confirmaSenha){
                response.writeHead(403, {'Content-Type': 'application/json'})
                response.end(JSON.stringify({message:'Senha não correspondem'}))
                return
            }
            participante.id = participantes.length + 1
            console.log(participante.nome)
            response.end()
        })
    }else if(method === 'GET' && url === '/participantes/count'){
        console.log(`${method}, ${url} 3`)
        response.end()
    }else if(method === 'GET' && url === '/participantes/count/over18'){
        console.log(`${method}, ${url} 4`)
        response.end()
    }else if(method === 'GET' && url === '/participantes/city/most'){
        console.log(`${method}, ${url} 5`)
        response.end()
    }else if(method === 'PUT' && url.startsWith ('/participantes/')){
        console.log(`${method}, ${url} 6`)
        response.end()
    }else if(method === 'DELETE' && url.startsWith ('/participantes/')){
        console.log(`${method}, ${url} 7`)
        response.end()
    }else if(method === 'GET' && url.startsWith ('/participantes/')){
        console.log(`${method}, ${url} 8`)
        response.end()
    }
})

server.listen(PORT, ()=>{
    console.log(`Servidor on http://localhost:${PORT}`)
})