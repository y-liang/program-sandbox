
/** library */
const readline = require('readline');
const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout
});


function createInputPromise(inputType) {
   return new Promise((resolve, reject) => {
      rl.question(`enter your ${ inputType }: `, answer => {
         if (inputType == 'key to translate') {
            console.log(`let's check if ${ answer } is a valid ${ inputType }...`);
         } else {
            console.log(`${ inputType } is ${ answer }`);
         }
         resolve(answer);
      });
   });
}




async function inputReady(callTranslate) {

   let key, validKey, translateType, beforeText;

   /** step 1 - get valid key - to be checked */
   // can't be while key because key's not there yet

   while (true) {
      key = await createInputPromise('key to translate');
      let keyArray = key.split('');

      console.log('key length is ' + keyArray.length);

      // check if a to z
      let isAtoZ = item => {
         return (item >= 'a' && item <= 'z' || item >= 'A' && item <= 'Z');
         // return true when meeting all the criteria
      };

      let isUnique = (item, index, array) => {
         return array.indexOf(item) == array.lastIndexOf(item);
      };

      // third check key to be 26-character and alphabet
      if (keyArray.length == 26 && keyArray.every(isAtoZ) && keyArray.every(isUnique)) {
         break; // if true, break out of this while loop
      }

      // otherwise still inside while loop, the key is invalid
      console.log(`${ key } is invalid. pick a another one`);
   }

   // after while loop, we now have valid key
   validKey = key.toLowerCase(); // key is case-insensitive
   console.log(`valid key! now ${ key } is your key for translation`);

   translateType = await createInputPromise('translate type'); // step 2 - get translate type - encrypt or decipher
   beforeText = await createInputPromise('plain text'); // step 3 - get text - any text

   console.log(`we will now translate ${ translateType } - ${ beforeText } - with ${ validKey }`);


   /** after the inputs are ready, callback translate function */
   callTranslate(validKey, translateType, beforeText);

}


const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';



function translateText(key, type, text) {
   key, type, text;

   let textArray = text.split('');
   let afterTextArray = [];

   if (type == 'encrypt') {
      console.log('???textArray??? ' + textArray);

      afterTextArray = textArray.map(
         item => {
            if (item >= 'a' && item <= 'z') {
               return item = key[ALPHABET.indexOf(item)];
            } else if (item >= 'A' && item <= 'Z') {
               console.log('???' + key);
               return item = key[ALPHABET.indexOf(item.toLowerCase())].toUpperCase(); // .toUpperCase() Cannot read property 'toUpperCase' of undefined - because no return
            } else {
               return item;
            }
         }
      );

      console.log('??? ' + afterTextArray);
   } else {
      // decipher
      afterTextArray = textArray.map(
         item => {
            if (item >= 'a' && item <= 'z') {
               return item = ALPHABET[key.indexOf(item)];
            } else if (item >= 'A' && item <= 'Z') {
               return item = ALPHABET[key.indexOf(item.toLowerCase())].toUpperCase();
            } else {
               return item;
            }
         }
      );
   }

   afterText = afterTextArray.join('');

   console.log('now encrypted: ' + afterText);

}

inputReady(translateText);














