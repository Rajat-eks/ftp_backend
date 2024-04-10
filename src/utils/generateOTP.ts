export function generateOTP() {
  const characters = '0123456789';
  let OTP = '';

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    OTP += characters.charAt(randomIndex);
  }

  return OTP;
}
