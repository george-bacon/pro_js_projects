// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      //select random point
      let randomBase = Math.floor(Math.random() * this.dna.length);
      let currentBase = dnaStrand.dna[randomBase];
      let newBase = "";

      // create newbase choice at least once, whilst they match continue to make new
      do {
        newBase = returnRandBase();
        console.log(currentBase, newBase);
      } while (newBase === currentBase);
    },
    compareDNA(pAequor) {
      let matchedDNA = [];
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          // add the DNA match to new array
          matchedDNA.push(this.dna[i]);
        }
      }

      console.log(matchedDNA);
      let percentMatch = ((matchedDNA.length / this.dna.length) * 100).toFixed(
        0
      );
      console.log(
        `Speciment ${this.specimenNum} and Specimen ${pAequor.specimenNum} have ${percentMatch}% DNA in common`
      );
    },
    willLikelySurvive() {
      const countCG = this.dna.filter(
        (base) => base === "C" || base === "G"
      ).length;
      const percentageCG = (countCG / this.dna.length) * 100;
      return percentageCG >= 60;
    },
  };
};

const organism1 = pAequorFactory(10, mockUpStrand());
const organism2 = pAequorFactory(15, mockUpStrand());

// console.log(organism1.specimenNum, organism1.dna);
// console.log(organism2.specimenNum, organism2.dna);

// organism1.compareDNA(organism2);

console.log(`DNA composisition: ${organism1.dna}`);
console.log(`Likely to survive: ${organism1.willLikelySurvive()}`);

const createBatch = (num) => {
  let batch = [];
  let count = 1;

  while (count <= num) {
    let newStrand = pAequorFactory(count, mockUpStrand());

    if (newStrand.willLikelySurvive()) {
      batch.push(newStrand);
      console.log(
        `Specimen ${
          newStrand.specimenNum
        } is likely to survive: ${newStrand.willLikelySurvive()}`
      );
      count++;
    }
  }

  return batch;
};

console.log(createBatch(30));
