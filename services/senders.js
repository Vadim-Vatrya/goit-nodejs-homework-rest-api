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
        name: "System Cats",
        link: this.link,
      },
    });
  }
}

module.exports = EmailService;
