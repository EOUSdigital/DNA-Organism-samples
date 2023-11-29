const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
};

let pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      console.log(`Mutating specimen ${this.specimenNum}, with bases: ${this.dna}`);
      let index = Math.floor(Math.random() * dna.length);
      console.log("Base to change at index: " + index);
      let random = returnRandBase();
      while (random === dna[index]) {
        console.log("The two bases are equal, will generate a new random base.");
        random = returnRandBase();
      }
      dna.splice(index, 1, random);
      console.log(`New dna strand: ${this.dna}`)
    },
    compareDNA(pAequorObj) {
      let counter = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (i == 0) {
          console.log(`\nComparing DNA strands\nSpecimen ${this.specimenNum} bases: ${this.dna}`);
          console.log(`Specimen ${pAequorObj.specimenNum} bases: ${pAequorObj.dna}`);
        }
        if (this.dna[i] === pAequorObj.dna[i]) {
          console.log(this.dna[i] + " and  " + pAequorObj.dna[i] + " are equal");
          counter += 1;
          console.log("Matching bases so far: " + counter); 
        }
      }
      let basesInCommon = Math.floor((100 / 15) * counter);
      return `Specimen ${this.specimenNum} and Specimen ${pAequorObj.specimenNum} are ${basesInCommon}% compatible`;
    },
    willLikelySurvive() {
      let counter = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] == "C" || this.dna[i] == "G") {
          counter += 1;
        }
      }
      return (counter >= 9);
    },
    complementStrand() {
      let complementaryStrand = [];
      for (let i = 0; i < this.dna.length; i++) {
        if ( this.dna[i] === "A" ) { complementaryStrand.push("T"); }
        else if ( this.dna[i] === "T" ) { complementaryStrand.push("A"); }
        else if ( this.dna[i] === "C" ) { complementaryStrand.push("G"); }
        else if ( this.dna[i] === "G" ) { complementaryStrand.push("C"); }
        else complementaryStrand.push(this.dna[i]);
      }
      return `\n--Generating the complementary DNA strand--\n  Original DNA strand: ${this.dna}
      Complementary DNA strand: ${complementaryStrand}`
    }
  }
}

let instances = () => {
  let sampleArray = [];
  while (sampleArray.length < 30) {
    let i = 1;
    let sample = pAequorFactory(i, mockUpStrand());
    sample = pAequorFactory(i, mockUpStrand());
    if (sample.willLikelySurvive()) {
      sampleArray.push(sample.dna);
    } i++
  }
  return sampleArray;
}

console.log(`--Invoking the instances function (creating instances of 30 surviving samples)--`)
console.log(instances());

let testSubject = pAequorFactory(1, mockUpStrand());

console.log(testSubject.complementStrand());
