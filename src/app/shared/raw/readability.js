
const text0 = `okay. maybe there alright. okay!`;

const text1 = `Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, "and what is the use of a book," thought Alice "without pictures or conversation?";`;
const text2 = `It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him.`;
const text3 = `When he was nearly thirteen, my brother Jem got his arm badly broken at the elbow. When it healed, and Jem's fears of never being able to play football were assuaged, he was seldom self-conscious about his injury. His left arm was somewhat shorter than his right; when he stood or walked, the back of his hand was at right angles to his body, his thumb parallel to his thigh.`;

function numLetters(text) {

   let i, num = 0;

   for (i = 0; text[i] != null; i++) {
      if (('a' <= text[i] && text[i] <= 'z')
         || ('A' <= text[i] && text[i] <= 'Z')) {
         num = num + 1;
      }
   }

   // console.log('all count ' + i);
   // console.log('letter count ' + num);

   return num;

}


function numWords(text) {
   let i, num = 1;

   for (i = 0; text[i] != null; i++) {
      if (text[i] == ' ') {
         num = num + 1;
      }
   }

   // console.log('all count ' + i);
   // console.log('word count ' + num);

   return num;

}



function numSentences(text) {
   let i, num = 0;

   for (i = 0; text[i] != null; i++) {

      /** way one */
      // if (text[i] == '.' || text[i] == '!' || text[i] == '?') {
      //   num = num + 1;
      //   console.log('found at ' + i);
      // }


      /** way two */

      // switch (text[i]) {
      //   case '.':
      //   case '!':
      //   case '?':
      //     num = num + 1;
      //     break;

      //   default:
      //     break;
      // }


      /** way three */

      if (['.', '!', '?'].indexOf(text[i]) >= 0) {
         num = num + 1;
      }

      /** way four - regular expression */

   }

   // console.log('all count ' + i);
   // console.log('sentence count ' + num);

   return num;

}


const texts = [
   `One fish. Two fish. Red fish. Blue fish.`,
   `Would you like them here or there? I would not like them here or there. I would not like them anywhere.`,
   `Congratulations! Today is your day. You're off to Great Places! You're off and away!`,
   `Harry Potter was a highly unusual boy in many ways. For one thing, he hated the summer holidays more than any other time of year. For another, he really wanted to do his homework, but was forced to do it in secret, in the dead of the night. And he also happened to be a wizard.`,
   `In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.`,
   `Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, "and what is the use of a book," thought Alice "without pictures or conversation?"`,
   `When he was nearly thirteen, my brother Jem got his arm badly broken at the elbow. When it healed, and Jem's fears of never being able to play football were assuaged, he was seldom self-conscious about his injury. His left arm was somewhat shorter than his right; when he stood or walked, the back of his hand was at right angles to his body, his thumb parallel to his thigh.`,
   `There are more things in Heaven and Earth, Horatio, than are dreamt of in your philosophy.`,
   `It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him.`,
   `A large class of computational problems involve the determination of properties of graphs, digraphs, integers, arrays of integers, finite families of finite sets, boolean formulas and elements of other countable domains.`
];



function gradeLevel(text) {

   let avgLetters = (numLetters(text) * 100) / numWords(text);
   let avgSentences = (numSentences(text) * 100) / numWords(text);

   let indexGrade = 0.0588 * avgLetters - 0.296 * avgSentences - 15.8;

   // console.log('Grade decimal ' + indexGrade);

   if (indexGrade >= 16) {
      console.log('Grade 16+');
   } else if (indexGrade < 1) {
      console.log('Before Grade 1');
   } else {
      console.log('Grade ' + Math.round(indexGrade));
   }

}


function getGrade(texts) {

   for (i = 0; i < texts.length; i++) {
      gradeLevel(texts[i]);
   }

}

getGrade(texts);


