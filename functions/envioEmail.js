const nodemailer = require("nodemailer")

exports.handler = async (event) => {
    if(event.httpMethod !== "POST"){
        return {
            statusCode: 405,
            body: JSON.stringify({ status: "warning", message: "Método não permitido." }),
        };
    }

    try {
        const { nome, email, mensagem } = JSON.parse(event.body);

        // Verifica se os campos foram preenchidos
        if (!nome || !email || !mensagem) {
            return {
                statusCode: 400,
                body: JSON.stringify({ status: "warning", message: "Todos os campos são obrigatórios." }),
            };
        }

        // Validação do e-mail usando regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ status: "warning", message: "E-mail inválido." }),
            };
        }

        // Configuração do transporte do Nodemailer (substitua pelos seus dados)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Definir no Netlify
                pass: process.env.EMAIL_PASS, // Definir no Netlify
            },
        });

        // Configuração do e-mail
        const mailOptions = {
            from: `"${nome}" <${email}>`, // Exibe o nome da pessoa, mas usa seu próprio e-mail para evitar rejeições
            replyTo: email, // Define o e-mail do remetente real para que ao responder vá para ele
            to: "newsanjos04@gmail.com",
            subject: `📩 Novo E-mail - ${nome}`,
            text: `
                📌 Novo E-mail recebido através do site!  
        
                📝 **Detalhes:**  
                - **Nome:** ${nome}  
                - **E-mail:** ${email}  
                - **Mensagem:**  
                ${mensagem}  
        
                📅 Enviado em: ${new Date().toLocaleString("pt-BR")}
                🌐 Enviado através do site: https://anjosnewscda.netlify.app/
            `,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; max-width: 600px;">
                    <h2 style="color: #ff3d6c;">📩 Novo E-mail Recebido</h2>
                    <p><strong>Nome:</strong> ${nome}</p>
                    <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>Mensagem:</strong></p>
                    <blockquote style="background: #f1f1f1; padding: 10px; border-left: 5px solid #ff3d6c;">
                        ${mensagem}
                    </blockquote>
                    <p style="color: #777; font-size: 12px;">📅 Enviado em: ${new Date().toLocaleString("pt-BR")}</p>
                    <p style="color: #777; font-size: 12px;">🌐 Enviado através do site: <a href="https://anjosnewscda.netlify.app/" target="_blank">https://anjosnewscda.netlify.app/</a></p>
                </div>
            `,
        };
        
        
        // Enviando o e-mail
        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ status: "success", message: "E-mail enviado com sucesso!" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ status: "error", message: "Erro ao enviar o e-mail. Tente novamente mais tarde." }),
        };
    }

}