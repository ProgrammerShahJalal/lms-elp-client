import crypto from "crypto";

const key = process.env.LINK_SECURITY_KEY;
const iv = process.env.LINK_SECURITY_IV;

// Utility function to decrypt a link
function decryptLink(encryptedLink) {
  const decipher = crypto.createDecipheriv(
    "aes-128-cbc",
    Buffer.from(key, "hex"),
    Buffer.from(iv, "hex")
  );
  let decryptedLink = decipher.update(encryptedLink, "hex", "utf-8");
  decryptedLink += decipher.final("utf-8");
  return decryptedLink;
}

export default decryptLink;