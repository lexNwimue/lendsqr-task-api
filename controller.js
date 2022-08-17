import { User } from "./model/User.js";

// Utility function
const verifyAccount = async (email) => {
  const user = await User.findOne({ email }); // Check if user already exists
  if (user) {
    return user;
  } else {
    return;
  }
};

const signup = async (req, res) => {
  const { name, email, amount } = req.body;
  if (!name || !email) {
    return res.json({ failed: "Please enter all fields" });
  }
  try {
    let user = await verifyAccount(email);
    // Encrypt password before saving to DB
    if (user) {
      return res.json({ failed: "User already exists" });
    } else {
      const newUser = new User({
        name: name,
        email: email,
        balance: amount || 0,
      });

      user = await newUser.save();
      res.json({ success: user });
    }
  } catch (err) {
    return res.json({ err });
  }
};

const deposit = async (req, res) => {
  // Using the same function for both deposit and withdrawal operation
  // but changing the necessary pieces to match the selected operation
  let { email, amount } = req.body;
  // Transer amount must exist and cannot be zero, negative or NAN
  if (!amount || amount <= 0 || isNaN(amount)) {
    return res.json({ failed: "Please enter a valid amount" });
  }
  let responseMsg = "Deposit Successful";
  if (req.url === "/withdraw") {
    amount = -amount;
    responseMsg = "Withdawal Successful";
  }

  let user = await verifyAccount(email);
  if (user) {
    // The code below will either increment the balance by a positive value (indicating deposit)
    // or negative value (indicating withdrawal)
    user = await User.updateOne({ email }, { $inc: { balance: amount } });
    return res.json({ success: responseMsg });
  } else {
    return res.json({ failed: "Wrong Account Details" });
  }
};

const transfer = async (req, res) => {
  let { amount } = req.body;

  // Transer amount cannot be zero or negative
  if (amount <= 0) {
    return res.json({ failed: "Please enter a valid amount" });
  }

  // Ensure both credentials are correct
  let sender = await verifyAccount(req.body.sender);
  let receiver = await verifyAccount(req.body.receiver);
  if (sender.balance < amount) {
    return res.json({ failed: "Insufficient Funds" });
  }

  if (sender && receiver) {
    await User.updateOne({ email: sender }, { $inc: { balance: -amount } }); // Debits sender (-amount)
    await User.updateOne({ email: receiver }, { $inc: { balance: amount } }); // Credits receiver (+amount);
    return res.json({ success: "Funds transferred successfully." });
  } else {
    return res.json({ failed: "Invalid Details Provided" });
  }
};

const getUserDetails = async (req, res) => {
  // Didn't use the verifyAccount() function in this function because
  // it returns only the user email not the entire user object, which is requried here
  // I could have implemented it to return the entire user object but
  // the other funtions in which verifyAccount() is used
  // require only the email, and only this current function requires the entire object
  // Hence by way of optimization I'd have to write duplicate
  let email = req.params.email;

  const user = await User.findOne({ email }); // Check if user already exists
  if (user) {
    return res.json({ user });
  } else {
    return res.json({ failed: "Invalid User" });
  }
};

export { signup, deposit, transfer, getUserDetails };

// const login = async (req, res) => {
//     const { email, password } = req.body;
//     let user = await verifyAccount(email);
//     if (!user) {
//       return res.json({ failed: "Incorrect email or password" });
//     }
//     const match = await bcrypt.compare(password, user.password);
//     if (match) {
//       const token = createJWTtoken(user.email);
//       res.cookie("jwt", token, {
//         httpOnly: true,
//         maxAge: expirationDuration * 1000,
//       });
//       res.json({ success: user });
//       return;
//     } else {
//       res.json({ failed: "Incorrect email or password" });
//     }
//   };
