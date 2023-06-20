// // utils/hash.js
import sjcl from 'sjcl';
export default function hash(string) {
  const bitArray = sjcl.hash.sha256.hash(string);
  return sjcl.codec.hex.fromBits(bitArray);
}
// export default async function hash(string) {
//     const utf8 = new TextEncoder().encode(string);
//     const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
//     const hashArray = Array.from(new Uint8Array(hashBuffer));
//     const hashHex = hashArray
//       .map((bytes) => bytes.toString(16).padStart(2, '0'))
//       .join('');
//     return hashHex;
//   }