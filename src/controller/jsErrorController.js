import Response from './../utils/Response'
import sequelize from 'sequelize'

class JsErrorController {
    async get (ctx) {
    // console.log(sequelize)
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
        sequelize.close()
        new Response(ctx).send200('ok', { a: 2 })
    }
  
    async create (ctx) {
        new Response(ctx).send200('ok', { a: 2 })
    }
}

export default new JsErrorController()
