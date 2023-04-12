# Sandbox of Programming Exercises
A learning space where a series of programming exercises progress from a command-line interface to a web-based interface, transitioning from Node.js to Angular.

## Demo
- https://ungram.dev.yliang.net
![demo](/src/assets/demo.png)

## Features
This application was developed using Angular and leverages its components, modules, and services to present a series of coding challenges.

- Routing module and Service Provider

For maintainability of the routing configuration, the app router is loaded and set in a separate, top-level module in Angular. A shared project service is implemented to provide project information to all components within the application.

```
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

> Below `of(PROJECTS)` returns an `Observable<Project[]>` to simulate getting data from the server with RxJ
```
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  getProjects(): Observable<Project[]> {
    return of(PROJECTS);
  }
}
```

- Layout with CSS grid

Set the grid placement using the `grid-column` and `grid-row` properties to specify a grid item’s size and location within a grid column and a grid row respectively.

```
display: grid;
grid-template-columns: repeat(4,1fr);
grid-template-rows: repeat(8,1fr);
grid-gap: 36px;
```

![grid columns and rows](/src/assets/grid.png)

- Toggle light and dark modes

Switch the styles and colors by applying `.dark` and `.light` classes on elements. The mode preference is stored in local storage.

![light and dark modes](/src/assets/lightdark.gif)

```
modes: string[] = ['dark', 'light'];
mode: string | undefined;
currentMode;
ngOnInit() {
   this.currentMode = localStorage.getItem('mode') ? localStorage.getItem('mode') : null;
   this.mode = this.currentMode ? this.currentMode : this.modes[1];
}
toggleMode() {
   if (this.mode == this.modes[0]) {
      this.mode = this.modes[1];
      localStorage.setItem('mode', 'light');
   } else {
      this.mode = this.modes[0];
      localStorage.setItem('mode', 'dark');
   }
}
```

## Projects

- Percolation Simulate

A script that uses the quick union algorithm to simulate percolation of a grid system by randomly opening up a block until the top connects to the bottom.
> Below is the implementation of quick union with `root()` and `union()` functions

```
root(label) {
   while (label != this._relation[label]) {
      label = this._relation[label];
   }
   return label;
}

union(labelA, labelB) {
   let rootA = this.root(labelA);
   let rootB = this.root(labelB);

   if (rootA == 'up' && rootB == 'dn') {
      this.connected = true;
   } else if (rootB == 'up' && rootA == 'dn') {
      this.connected = true;
   } else if (rootA == 'up' || rootA == 'dn') {
      this._relation[labelB] = rootA;
   } else if (rootB == 'up' || rootB == 'dn') {
      this._relation[labelA] = rootB;
   } else {
      this._relation[labelA] = this.root(labelB);
   }
}
```

> Here is the code: [percolation.js](/src/app/shared/raw/percolation.js).

![percolation simulate](/src/assets/percolation.gif)

- Reading Level

Analyze reading material and determine the approximate grade level required for comprehension using the Coleman-Liau index.
```
let avgLetters = (numLetters(text) * 100) / numWords(text);
let avgSentences = (numSentences(text) * 100) / numWords(text);
let indexGrade = 0.0588 * avgLetters - 0.296 * avgSentences - 15.8;
```
> Here is the code: [readability.js](/src/app/shared/raw/readability.js).

![reading level](/src/assets/readability.gif)

- Substitution Cipher

    A key, either numeric or alphabetical, is utilized to encrypt messages in a reversible manner.
   - Encrypt
   ```
   resultArray = textArray.map(
      item => {
         if (item >= 'a' && item <= 'z') {
            return item = key[ALPHABET.indexOf(item)];
         } else if (item >= 'A' && item <= 'Z') {
            return item = key[ALPHABET.indexOf(item.toLowerCase())].toUpperCase(); // .toUpperCase() Cannot read property 'toUpperCase' of undefined - because no return
         } else {
            return item;
         }
      }
   );
   ```
   - Decipher
   ```
   resultArray = textArray.map(
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
   ```
> Here is the code: [substitution.js](/src/app/shared/raw/substitution.js).

![substitution cipher](/src/assets/substitution.gif)

- Signature Generator

A tool to create an email signature that includes name, contact information, and social media links.
![signature generator](/src/assets/signature.png)

## Summary
This page serves as a record of the lessons learned and skills developed while working on these projects. It is hoped that this collection will continue to grow as the journey in programming continues.