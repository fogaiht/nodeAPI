const env = process.env.NODE_ENV || 'dev'

const config = () => {
    switch(env) {
        case 'dev':
            return {
                bd_string: 'mongodb+srv://user_admin:thiago123@cluster0-5wzmj.mongodb.net/test?retryWrites=true&w=majority',
                jwt_pass: 'curso_flutter_pokedex',
                jwt_expires_in: '7d'
            }
        case 'hml':
            return {
                bd_string: 'mongodb+srv://user_admin:thiago123@cluster0-5wzmj.mongodb.net/test?retryWrites=true&w=majority',
                jwt_pass: 'curso_flutter_pokedex',
                jwt_expires_in: '7d'
            }
        case 'prod':
            return{
                bd_string: 'mongodb+srv://user_admin:thiago123@cluster0-5wzmj.mongodb.net/test?retryWrites=true&w=majority',
                jwt_pass: 'curso_flutter_pokedex',
                jwt_expires_in: '7d'
            }

    }
}

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`)

module.exports = config()