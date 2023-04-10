/** library */
const readline = require('readline');
const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout
});

/**
 * inputs
 */
function createInputPromise(inputType) {
   return new Promise((resolve, reject) => {
      rl.question(`enter the ${ inputType } that are in the race: `, answer => {
         if (inputType == 'candidate_names') {
            console.log(`let's check if ${ answer } is a valid ${ inputType }...`);
         } else if (inputType == 'voter_count') {
            console.log(`let's check if ${ answer } is a valid ${ inputType }...`);
         } else {
            // querying for votes
            console.log(`let's check if your ${ inputType } for ${ answer } is one of the candidates in the race...`);
         }

         resolve(answer);
      });
   });
}



/**
 * global variables
 */

const MAX_CANDIDATES = 9;
const MAX_VOTERS = 100;

class Candidate {
   constructor(name, votes, eliminated) {
      this.name = name;
      this.votes = votes;
      this.eliminated = eliminated;
   }
}

let candidateCount, voterCount, CandidatesArray, preferencesArray;


let isAtoZ = item => {
   return /^[a-zA-Z]+$/.test(item);
};

let isUnique = (item, index, array) => {
   return array.indexOf(item) == array.lastIndexOf(item);
};

async function candidatesReady(callPreferences, callRunoff) {
   let candidateNames, namesArray;

   while (true) {
      candidateNames = await createInputPromise('candidate_names');
      namesArray = candidateNames.split(' ');
      candidateCount = namesArray.length;

      if (candidateCount > 1 && candidateCount <= MAX_CANDIDATES && namesArray.every(isUnique) && namesArray.join('').split('').every(isAtoZ)) {
         break;
      }

      console.log(`invalid! you have entered ${ candidateCount } candidates, and they're ${ namesArray.join(', ') }. please reenter...`);
   }

   console.log(`valid! you have entered ${ candidateCount } candidates, and they're ${ namesArray.join(', ') }.`);

   // populate candidates array with candidate object
   CandidatesArray = Array.from({ length: candidateCount }, () => new Candidate);
   for (i = 0; i < candidateCount; i++) {
      CandidatesArray[i].name = namesArray[i];
      CandidatesArray[i].votes = 0;
      CandidatesArray[i].eliminated = false;
   }

   callPreferences(CandidatesArray, callRunoff);
}

async function preferencesReady(array, callback) {
   // array here is CandidatesArray

   while (true) {
      voterCount = await createInputPromise('voter_count');
      if (/^[0-9]+$/.test(voterCount) && 1 < voterCount <= MAX_VOTERS) {
         break;
      }
      console.log(`invalid! please reenter the number of voters...`);
   }

   console.log(`valid! there're ${ voterCount } voters`);

   let votesList, votesArray;


   let isCandidate = item => {
      return (array.find(candidate => candidate.name == item));
   };

   preferencesArray = Array.from({ length: voterCount }, () => []);
   // prompt every voter for a list of candidate preference
   for (i = 0; i < voterCount; i++) {
      while (true) {
         votesList = await createInputPromise('votes_list');
         votesArray = votesList.split(' '); // making the list into an array

         if (votesArray.length == candidateCount && votesArray.every(isCandidate) && votesArray.every(isUnique)) {
            break;
         }

         console.log(`invalid! your votes for ${ votesArray } do not count. please reenter...`);
      }
      console.log(`valid! your votes for ${ votesArray } count`);

      preferencesArray[i] = votesArray; // filling in the array with arrays

      console.log('preferenceArray - ');
      console.log(preferencesArray);
   }


   callback();
}



function runoffNow() {
   calculateVotes();

   while (true) {
      if (hasMajority()) {
         console.log('has a winner');
         console.log(CandidatesArray.find(candidate => candidate.votes > (voterCount / 2)));

         return CandidatesArray.find(candidate => candidate.votes > (voterCount / 2));
      } else if (isTie()) {
         console.log('is a tie');
         console.log(CandidatesArray.filter(candidate => candidate.eliminated == false));

         return CandidatesArray.filter(candidate => candidate.eliminated == false);
      } else {
         eliminateUnpopular();
         console.log('line 162');
         console.log(CandidatesArray);
         calculateVotes();
      }
   }
}


function calculateVotes() {

   // clear all votes
   for (i = 0; i < candidateCount; i++) {
      CandidatesArray[i].votes = 0;
   }

   // calculate votes
   voterLoop:
   for (i = 0; i < voterCount; i++) {
      console.log('line 136' + i);

      candidateLoop:
      for (j = 0; j < candidateCount; j++) {
         preferredCandidate = preferencesArray[i][j];
         console.log('line 141' + preferredCandidate);

         // find the first preferred candidate that has not yet been eliminated
         if (CandidatesArray.find(candidate => candidate.name == preferredCandidate).eliminated == false) {
            CandidatesArray.find(candidate => candidate.name == preferredCandidate).votes += 1;
            break candidateLoop;
         }
      }
   }
   console.log('line 152, calculate vote');
   console.log(CandidatesArray);

}

// find if there's a majority vote, more than 50%
function hasMajority() {
   console.log('line 159, has a winner?');
   console.log(CandidatesArray);
   console.log(candidateCount, voterCount);

   for (j = 0; j < candidateCount; j++) {
      if (CandidatesArray[j].votes > (voterCount / 2)) {
         console.log(`we have a winner ${ CandidatesArray[j].name }`);
         return true;
         // return will get out of this function and break only get out of the loop
      }
   }

   return false;
}

function isTie() {
   console.log('line 172, is a tie?');

   let remainingCandidates = CandidatesArray.filter(candidate => candidate.eliminated == false);
   console.log(remainingCandidates);


   let hasSameVote = (item, index, array) => {
      if (index == 0) {
         return true;
      } else {
         return item.votes == array[index - 1].votes;
      }
   };

   return remainingCandidates.every(hasSameVote); // true of false
}

// find the least popular candidates
function eliminateUnpopular() {
   sortedCandidates = [...CandidatesArray];
   sortedCandidates.sort((a, b) => a.votes - b.votes); // ascending votes array
   lowestVote = sortedCandidates[0].votes;

   console.log('line 192');
   console.log(sortedCandidates);

   // eliminate the lowest vote
   for (i = 0; i < candidateCount; i++) {
      if (CandidatesArray[i].votes == lowestVote) {
         CandidatesArray[i].eliminated = true;
      }
   }

}

candidatesReady(preferencesReady, runoffNow);