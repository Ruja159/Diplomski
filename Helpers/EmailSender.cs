using System.Net;
using System.Net.Mail;

namespace Diplomski.Helpers
{
    public class EmailSender
    {
        public static void SendEmail(string receiver, string subject, string body) {
            MailAddress from = new MailAddress("donate.blood.test@gmail.com", "Donate Blood");
            MailAddress to = new MailAddress(receiver);


            MailMessage message = new MailMessage(from, to);
            message.IsBodyHtml = true;
            message.Subject = subject;
            message.Body = body;


            //client configuration
            SmtpClient smtp = new SmtpClient("smtp.gmail.com");

            smtp.Port = 587; //configuration.GetValue("SMTPPort", 25);
            smtp.EnableSsl = true; //configuration.GetValue("SMTPSsl", false);
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtp.Credentials = new NetworkCredential("donate.blood.test@gmail.com", "temp123#"); //new NetworkCredential(configuration.GetValue("SMTPUser", ""), configuration.GetValue("SMTPPass", ""));
            smtp.SendAsync(message, message.Subject);
        }
    }
}