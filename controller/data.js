const { connection } = require("../stripe/database.js");

async function AddSub(req, res) {
    const dbdata = JSON.parse(decodeURIComponent(req.query.data));
    console.log(dbdata)
    if (!dbdata) {
        return res
            .status(400)
            .json({ error: "data required" });
    }
    const insertQuery = `
  INSERT INTO Subscriptions (Subscription_Key, Subscription_Duration, subscription_name, Amount, user_id)
  VALUES (?, ?, ?, ?, ?);
`;
    connection.query(insertQuery, [dbdata.subscriptionKey, dbdata.subscriptionDuration, dbdata.subscriptionName, dbdata.amount, dbdata.userId], (error, results) => {
        if (error) {
            console.error('Error executing the SQL insert command:', error.stack);
            return;
        }

        console.log("data added with ID: ", results.insertId);
        res
            .status(201)
            .json({
                message: "data added successfully",
                id: results.insertId,
            });
    });
};

module.exports = {
    AddSub,
};
