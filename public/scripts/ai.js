// Made Thursday, December 14th, 2023
// This controls all AI / ML within the game

class AI {
    constructor(game) {
        this.game = game // Name of the game
    }
}
for (var j=0; j < 10; j++) {
    var lst = []
    var total = 0
    for (var i=0; i < 5; i++) {
        lst.push(anime.random(1, 6))
    }
    console.log(`[${lst.toString()}]`)
    lst.forEach((itm) => total+= itm)
    console.log(total)
}
// Step 1: load data or create some data 
const data = [
      {"rolled": [1,6,6,4,1], "state": "Won"},
      {"rolled": [5,5,2,2,6], "state": "Won"},
      {"rolled": [1,2,6,3,1], "state": "Loss"},
      {"rolled": [6,3,1,2,4], "state": "Loss"},
      {"rolled": [6,2,3,6,6], "state": "Won"}
];
  
// Step 2: set your neural network options
const options = {
    task: 'classification',
    debug: true
}
  
// Step 3: initialize your neural network
const nn = ml5.neuralNetwork(options);
  
// Step 4: add data to the neural network
data.forEach(item => {
    const inputs = {
        roll: item.rolled
    };
    const output = {
        state: item.state
    };

    nn.addData(inputs, output);
});
  
// Step 5: normalize your data;
nn.normalizeData();

// Step 6: train your neural network
const trainingOptions = {
    epochs: 64,
    batchSize: 12
}
nn.train(trainingOptions, finishedTraining);
  
// Step 7: use the trained model
function finishedTraining(){
    classify();
}
  
// Step 8: make a classification
function classify(){
    const input = {
      roll: [5,3,6,2,6]
    }
    nn.classify(input, handleResults);
}
  
// Step 9: define a function to handle the results of your classification
function handleResults(error, result) {
    if(error){
    console.error(error);
    return;
    }
    console.log(result); // {label: 'red', confidence: 0.8};
}