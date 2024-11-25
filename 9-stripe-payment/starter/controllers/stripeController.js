const stripe = require("stripe")(process.env.STRIPE_KEY);
// you have to change api keys in the browser.js file

// backend will double check the frontend price
// here we will verify amount of cost and communicate with stripe to get client secret
const stripeController = async (req, res) => {
  const { purchase, total_amount, shipping_fee } = req.body;

  const calculateOrderAmount = () => {
    return total_amount + shipping_fee;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "usd",
  });

  res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = stripeController;
