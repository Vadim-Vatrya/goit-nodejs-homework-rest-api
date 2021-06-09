const Mailgen = require("mailgen");
require("dotenv").config();

class EmailService {
  consturctor(env, sender) {
    this.sender = sender;
    switch (env) {
      case "development":
        this.link = "http://localhost:3000";
        break;

      case "production":
        this.link = "link for production";
        break;

      default:
        this.link = "http://localhost:3000";
        break;
    }
  }

  #createTemplateVerifyEmail(token, name) {
    const mailGenerator = new Mailgen({
      theme: "cerberus",
      product: {
        name: "System contacts",
        link: this.link,
      },
    })
    const email = {
      body: {
          name,
          intro: 'Welcome to System contacts.',
          action: {
              instructions: 'To get started with System contacts, please click here:',
              button: {
                  color: '#22BC66',
                  text: 'Confirm your account',
                  link: `${this.link}/api/users/verify/${token}`,
              }
          },
      }
  };

  return mailGenerator.generate(email)

  }
 
  async sendVerifyPasswordEmail ( token, email, name ) {
    const emailBody = this.#createTemplateVerifyEmail(token, name)
    const result = await this.sender.send({
      to: email,
      subject: 'Verify your account',
      html: emailBody,
    })
    console.log(result);
  }
}

module.exports = EmailService;
