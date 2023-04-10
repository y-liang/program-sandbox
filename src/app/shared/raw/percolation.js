class System {
   constructor(row, col) {
      // this.size = size;
      this.row = row;
      this.col = col;

      this._site = [];
      this._label = [];
      this._relation = {};

      this.blocker = 'X';

      this._matrix = (() => {
         let numLabel = 0;
         for (let i = 0; i < this.row; i++) {
            let subSite = [];
            let subLabel = [];
            for (let j = 0; j < this.col; j++) {
               // this._relation[numLabel] = [i, j]; // mapping label with corresponding row and col
               this._relation[numLabel] = numLabel;

               subSite.push(this.blocker); // all sites blocked with 'x'
               subLabel.push(numLabel++); // label sites with numbers
            }
            this._site.push(subSite);
            this._label.push(subLabel);
         }
      })();

      this.numberOfOpenSites = 0;

      // add imaginary points on both ends
      this._relation.up = 'up';
      this._relation.dn = 'dn';

      this.connected = false;
   }

   get view() {
      return this.display(this._matrix);
   }

   // array could either come from _site or _label
   display(array) {
      let view;
      view = '\n';

      for (let i = 0; i < this.row * 2 - 1; i++) {
         if (i % 2 == 0) {
            for (let j = 0; j < this.col; j++) {
               view += ` ${ array[i / 2][j] } `;
               if (j < this.col - 1) {
                  view += '|';
               } else {
                  view += '\n';
               }
            }
         } else {
            for (let j = 0; j < this.col; j++) {
               view += '–––';
               if (j < this.col - 1) {
                  view += '+';
               } else {
                  view += '\n';
               }
            }
         }
      }

      view += '\n';

      this.print(view);
   }

   print(message) {
      console.log(message);
   }

   toLabel(row, col) {
      return row * this.col + col;
   }

   toRowCol(label) {
      return [Math.floor(label / this.col), label % this.col];
   }

   // opens a random site if it is not open already
   open() {
      let label, row, col;

      label = Math.floor(Math.random() * (this.row * this.col));
      row = this.toRowCol(label)[0];
      col = this.toRowCol(label)[1];

      //base case, break out of recursion. quick union before return
      if (!this.isOpen(row, col)) {
         this._site[row][col] = ' ';
         this.numberOfOpenSites++;

         if (row == 0) {
            this.union(label, 'up');
         }

         if (row == this.row - 1) {
            this.union(label, 'dn');
         }

         // check surrounding 4 sites to union
         if (row > 0) {
            if (this.isOpen(row - 1, col)) {
               this.union(label, this.toLabel(row - 1, col));
            }
         }
         if (col < this.col - 1) {
            if (this.isOpen(row, col + 1)) {
               this.union(label, this.toLabel(row, col + 1));
            }
         }
         if (row < this.row - 1) {
            if (this.isOpen(row + 1, col)) {
               this.union(label, this.toLabel(row + 1, col));
            }
         }
         if (col > 0) {
            if (this.isOpen(row, col - 1)) {
               this.union(label, this.toLabel(row, col - 1));
            }
         }

         return;
      } else if (this.numberOfOpenSites == this.row * this.col) {
         return;
      }

      this.open();
   }

   isOpen(row, col) {
      return this._site[row][col] != this.blocker;
   }

   // chase parent pointers until reach root
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

   main() {
      let interval = setInterval(() => {
         this.open();
         this.display(this._site);
         // check percolation
         if (
            this.numberOfOpenSites > this.row &&
            this.numberOfOpenSites < this.row * this.col
         ) {
            console.log(
               'Is this percolated from top to bottom?',
               this.connected ? 'Yes' : 'No'
            );
            if (this.connected) {
               console.log(
                  'Nice! How many randomly opened blocks for percolation to happen?',
                  this.numberOfOpenSites
               );
               clearInterval(interval);
               return;
            }
         }
      }, 1000);
   }
}

let system = new System(5, 6);

system.main();