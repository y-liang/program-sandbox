export interface Project {
   id: string | undefined;
   name: string | undefined;
   description: string | undefined;
}

export const PROJECTS: Project[] = [
   {
      "id": "a",
      "name": "percolation-simulate",
      "description": "Increases the probability of permeable spaces (empty squares) in a checkerboard of blocked particles (x squares) for percolation"
   },
   {
      "id": "b",
      "name": "noughts-crosses",
      "description": "Players who take turns marking the spaces in a three-by-three grid with x or o"
   },
   {
      "id": "c",
      "name": "reading-level",
      "description": "Determine the approximate reading level required to understand a given text"
   },
   {
      "id": "e",
      "name": "substitution-cipher",
      "description": "Encrypt and decrypt messages by substituting each letter with another letter"
   },
   {
      "id": "f",
      "name": "preference-poll",
      "description": "Calculate poll results that represent the ranked preferences of a group"
   },
   {
      "id": "g",
      "name": "signature-generator",
      "description": "Generate a signature that includes name, contact information, and social media links"
   },
   {
      "id": "h",
      "name": "color-palette",
      "description": "Display a color palette for use on a website"
   }
];