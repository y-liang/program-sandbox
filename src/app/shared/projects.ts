export interface Project {
   id: string | undefined;
   name: string | undefined;
   description: string | undefined;
}

export const PROJECTS: Project[] = [
   {
      "id": "a",
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