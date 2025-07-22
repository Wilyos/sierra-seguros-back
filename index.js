const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Configura tu correo (puedes usar Gmail, Outlook, etc.)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'correos.sistemaslit@gmail.com',
    pass: 'bvls xkgy tifs woyw' // Usa contraseña de aplicación, no la normal
  }
});

app.post('/send', async (req, res) => {
  const { nombre, email, telefono, mensaje } = req.body;

  try {
    await transporter.sendMail({
      from: '"Formulario Web" <correos.sistemaslit@gmail.com>',
      to: 'administradora@sierraseguros.com', // correo del tercero
      subject: 'Nuevo mensaje de contacto',
      html: `
        <h3>Nuevo mensaje de contacto</h3>
        <p><b>Nombre:</b> ${nombre}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Teléfono:</b> ${telefono}</p>
        <p><b>Mensaje:</b> ${mensaje}</p>
      `
    });
    res.json({ ok: true, message: 'Correo enviado' });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error enviando correo', error });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Servidor corriendo en puerto', PORT));