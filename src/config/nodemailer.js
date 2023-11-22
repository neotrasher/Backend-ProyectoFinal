import nodemailer from 'nodemailer';
import Logger from '../services/logger.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

function recoveryEmail(email, recoverylink) {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Restablecer contraseña',
        html: `<p>Para restablecer tu contraseña, haz click en el siguiente <a href="${recoverylink}">link</a>.</p><br/>
               <p>Si no solicitaste restablecer tu contraseña, ignora este correo.</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            Logger.error('Error al enviar el correo \n' + error);
        } else {
            Logger.info('Correo de restablecimiento enviado a ' + email);
        }
    });
}

export { recoveryEmail };
