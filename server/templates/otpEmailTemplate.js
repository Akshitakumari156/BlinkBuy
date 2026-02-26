exports.otpEmailTemplate = (otp)=>{
return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SmartX OTP Verification</title>
    <style>
        /* Reset styles for email clients */
        body, table, td, a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            border-collapse: collapse;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        p {
            display: block;
            margin: 13px 0;
        }
        
        /* Main styles */
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
            background-color: #f6f9fc;
            color: #333333;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 30px 20px;
            text-align: center;
        }
        .logo {
            color: #ffffff;
            font-size: 28px;
            font-weight: bold;
            margin: 0;
        }
        .tagline {
            color: rgba(255, 255, 255, 0.8);
            font-size: 16px;
            margin: 10px 0 0;
        }
        .content {
            padding: 30px;
        }
        .otp-container {
            background-color: #f8f9fa;
            border-radius: 6px;
            padding: 20px;
            text-align: center;
            margin: 25px 0;
        }
        .otp-code {
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #667eea;
            margin: 15px 0;
        }
        .timer {
            color: #e74c3c;
            font-weight: bold;
            margin: 10px 0;
        }
        .footer {
            background-color: #f1f3f4;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666666;
        }
        .button {
            display: inline-block;
            background-color: #667eea;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 30px;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
        }
        .note {
            font-size: 14px;
            color: #666666;
            background-color: #fff9e6;
            padding: 12px;
            border-radius: 4px;
            border-left: 4px solid #ffc107;
        }
        .contact-info {
            background-color: #f0f7ff;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
            text-align: center;
        }
    </style>
</head>
<body>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <!-- Main container -->
                <table role="presentation" class="container" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <!-- Header -->
                    <tr>
                        <td class="header">
                            <h1 class="logo">SmartX</h1>
                            <p class="tagline">Intelligent Solutions for a Smarter Tomorrow</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td class="content">
                            <h2 style="margin-top: 0;">Verify Your Identity</h2>
                          
                            <p>You're just one step away from accessing your SmartX account. Please use the following One-Time Password (OTP) to complete your verification:</p>
                            
                            <div class="otp-container">
                                <p style="margin: 0 0 10px;">Your verification code is:</p>
                                <div class="otp-code">${otp}</div>
                                <div class="timer">This code will expire in 5 minutes.</div>
                                <p style="margin: 10px 0 0; font-size: 14px;">Please use this code immediately to complete your verification.</p>
                            </div>
                            
                            <p>If you didn't request this code, please ignore this email or contact our support team if you have concerns.</p>
                            
                            <div class="contact-info">
                                <p style="margin: 0; font-weight: bold;">Contact Us:</p>
                                <p style="margin: 5px 0 0;">
                                    <a href="mailto:sourabhtembhare65@gmail.com" style="color: #667eea; text-decoration: none;">
                                        sourabhtembhare65@gmail.com
                                    </a>
                                </p>
                            </div>
                            
                            <div class="note">
                                <strong>Security Tip:</strong> Never share your OTP with anyone. SmartX will never ask for your password or OTP via email, phone, or text message.
                            </div>
                            
                            <p>Need help? <a href="[Support Link]" style="color: #667eea;">Contact our support team</a></p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="footer">
                            <p>This email was sent by SmartX</p>
                            <p>Founded by Sourabh Tembhare</p>
                            <p>
                                <a href="[Unsubscribe Link]" style="color: #666666;">Unsubscribe</a> | 
                                <a href="[Privacy Policy]" style="color: #666666;">Privacy Policy</a> | 
                                <a href="[Terms of Service]" style="color: #666666;">Terms of Service</a>
                            </p>
                            <p>&copy; 2025 SmartX. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>

`
}