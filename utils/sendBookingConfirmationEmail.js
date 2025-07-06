const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

async function sendBookingConfirmationEmail(user, booking) {
  const doc = new PDFDocument({ size: "A4" });
  const filePath = `./booking_${booking._id}.pdf`;
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  doc.fontSize(20).text("Our Rooms", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Name: ${user.name}`);
  doc.text(`Email: ${user.email}`);
  doc.text(`Booking ID: ${booking._id}`);
  doc.text(`Room: ${booking.room}`);
  doc.text(`Check-In: ${booking.fromDate}`);
  doc.text(`Check-Out: ${booking.toDate}`);
  doc.text(`Amount: ₹${booking.totalamt}`);
  doc.text(`Status: ${booking.status}`);

  doc.moveDown(2);

  doc.end();

  await new Promise((resolve) => writeStream.on("finish", resolve));

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL_USER,
      pass: process.env.ADMIN_EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.ADMIN_EMAIL_USER,
    to: user.email,
    subject:  "Your Booking has been Cancelled !",
    text:  "We regret to inform you that your booking has been cancelled. Please find the details attached.",
    attachments: [
      {
        filename: `booking_${booking._id}.pdf`,
        path: filePath,
      },
    ],
  };
  await transporter.sendMail(mailOptions);
  fs.unlinkSync(filePath);
}
module.exports = { sendBookingConfirmationEmail }
