const nodemailer = require("nodemailer");

const mail = {
  user: process.env.USER_MAIL,
  pass: process.env.PASS_MAIL,
};

export const sendMail = async (data) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: mail.user,
      pass: mail.pass,
    },
  });

  const {enterprise, fullname, phone, email, position, message} = data;
  await transporter.sendMail({
    from: mail.user,
    to: process.env.DEST_MAIL,
    subject: "Contacto",
    text:
      message +
      " " +
      `[${email}/${fullname}/${phone}/${enterprise}/${position}]`,
  });
};

export const sendMailConfirmation = async (email, fullname) => {
  await transporter.sendMailConfirmation({
    from: mail.user,
    to: email,
    subject: "Contacto",
    text: "Mensaje",
    attachments: [
      {
        filename: "logo-dn.png",
        path: "assets/logo-dn.png",
        cid: "logo",
      },
    ],
    html: `
            <head>
                <style>
                    #email___content {
                        background-color: #FFFFFF;
                    }
                    h1, h2, p {
                        color: #6F6F6F;
                        text-align: center;
                    }
                </style>
            </head>
            
            <div id="email___content" style="text-align: center;">
                <img height="128" width="300" src="cid:logo"/>
                <h1>Hola ${fullname}</h1>
                <h2>Gracias por comunicarte con nosotros</h2>
                <br>
                <p style="font-size: 1.45rem;">Hemos recibido tu correo. En breve nos pondremos en contacto.</p>
                <p style="font-size: 1.45rem;">Que tengas un gran día!!</p>
                <br><br>
            </div>
        `,
  });
};
