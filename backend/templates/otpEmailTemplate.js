exports.otpEmailTemplate = (otp)=>{
return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connectify OTP Verification</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
            background-color: #f6f9fc;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #4f46e5, #7c3aed);
            padding: 30px;
            text-align: center;
            color: white;
        }
        .content {
            padding: 30px;
        }
        .otp-box {
            text-align: center;
            background: #f1f5f9;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
        }
        .otp {
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 6px;
            color: #4f46e5;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            padding: 20px;
            background: #f1f3f4;
        }
    </style>
</head>

<body>
    <div class="container">

        <!-- Header -->
        <div class="header">
            <h1>Connectify</h1>
            <p>Connecting People. Empowering Experiences.</p>
        </div>

        <!-- Content -->
        <div class="content">
            <h2>Verify Your Email</h2>

            <p>Hello,</p>

            <p>You're just one step away from accessing your Connectify account. Use the OTP below to verify your email:</p>

            <div class="otp-box">
                <p>Your OTP is:</p>
                <div class="otp">${otp}</div>
                <p style="color:red;">Valid for 5 minutes</p>
            </div>

            <p>If you did not request this, please ignore this email.</p>

            <p style="margin-top:20px;">
                Need help? Contact us at:<br/>
                <strong>support.connectify@gmail.com</strong>
            </p>

            <p style="margin-top:20px; font-size:14px; color:#666;">
                ⚠️ Never share your OTP with anyone.
            </p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>© 2026 Connectify. All rights reserved.</p>
            <p>Built with ❤️ by Akshita Kumari</p>
        </div>

    </div>
</body>
</html>
`
}