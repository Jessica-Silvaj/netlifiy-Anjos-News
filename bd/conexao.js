const { Pool } = require('pg');

const pool = new Pool({
    user: "0195298a-5180-74f9-9f77-b5417374b5fa",
    password: "949e8b84-a6b0-429d-ab76-60c7f44e3c48",
    host: "us-west-2.db.thenile.dev",
    port: 5432,
    database: "AnjosNewsCDA",
});

const connectDB = async () => {
    try {
        const client = await pool.connect(); // Pega uma conexão do pool
        console.log('Conexão ao banco de dados AnjosNewsCDA estabelecida com sucesso!');
        return client;
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        throw error;
    }
};

const disconnectDB = async (client) => {
    try {
        if (client) {
            client.release();  // Libera a conexão ao invés de encerrar todas
            console.log('Conexão liberada com sucesso!');
        }
    } catch (error) {
        console.error('Erro ao liberar a conexão com o banco de dados:', error);
    }
};

module.exports = {
    connectDB,
    disconnectDB,
};
