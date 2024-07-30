const express = require("express");
const router = express.Router();
const axios = require('axios');

router.use(express.json()); // Middleware to parse JSON bodies

router.post('/payment', async (req, res) => {
  console.log(req.body);
  const options = {
    method: 'POST',
    url: 'https://api.nowpayments.io/v1/invoice',
    headers: {
      'x-api-key': '6MKR7KW-XPF4KD9-PERPNZW-3TBH509',
      'Content-Type': 'application/json'
    },
    data: {
      price_amount: req.body.amount,
      price_currency: 'usd',
      order_id: 'RGDBP-21314',
      order_description: req.body.subscriptionName,
      ipn_callback_url: 'https://nowpayments.io/',
      success_url: `https://nowpayments.vercel.app/data/add?data=${encodeURIComponent(JSON.stringify(req.body))}`,
      cancel_url: 'https://nowpayments.vercel.app/'
    }
  };
  
  try {
    const response = await axios(options);
    if (response.data && response.data.invoice_url) {
      console.log('Redirecting to:', response.data.invoice_url);
      res.send(response.data.invoice_url);
    } else {
      console.error('Unexpected response format:', response.data);
      res.status(500).send('Unexpected response format from NOWPayments API.');
    }
  } catch (error) {
    console.error('Error from NOWPayments API:', error.response ? error.response.data : error.message);
    res.status(500).send('Failed to create invoice.');
  }
});

module.exports = router;