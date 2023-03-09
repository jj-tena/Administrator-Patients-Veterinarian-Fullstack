import nodemailer from 'nodemailer';

const emailRegister = async (data) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    const {email, name, token} = data;
    console.log(data)
    const info = await transporter.sendMail({
        from: '"APV - Administrador Pacientes Veterinaria" <apv@correo.com>',
        to: email,
        subject: 'Confirma tu cuenta en APV',
        text: 'Confirma tu cuenta en APV',
        html: `
            <p>Hola: ${name}, confirma tu cuenta en APV:
            <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirmar cuenta</a>
            </p>
            <p>Si no creaste esta cuenta, ignora este mensaje.</p>
        `
    })
    console.log('Mensaje enviado: %s', info.messageId);
}

export default emailRegister;