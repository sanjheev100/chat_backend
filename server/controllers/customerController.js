const CustomerModel = require("../models/customerModel");

exports.getCustomer = async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    let customer = await CustomerModel.findOne({
      customerMobileNumber: phoneNumber,
    });
    return res.status(200).json({ data: customer });
  } catch (error) {
    console.log("Error While Fetching Message ::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
