# BrainJS 
BrainJS is a neural network library for browser JS & NodeJS, for generic code examples see here, for actual explanations see the official documentation.  

## Setup 
<details>
<summary>Setup</summary>

NodeJS: npm install brainjs  
```javascript
    const brain = require("brain"); 
```
browser: 
```html
    <script src="//unpkg.com/brain.js"></script> 
```
</details>

## Minimal Example 
<details> 
<summary>code</summary>

```javascript
    const net = new brain.NeuralNetwork(); 
    const training = net.train([
        { input: [0, 1], output: [1] },
        { input: [0, 0], output: [0] },
        { input: [1, 1], output: [0] },
        { input: [1, 0], output: [1] }]); 
    net.run([1, 1]); // expect 0 
``` 
</details>

## [Neural Network Types](https://github.com/BrainJS/brain.js#neural-network-types)
<details>
<summary>code</summary>

```javascript
    const net = new brain.NeuralNetwork(); 
    // const net = new brain.recurrent.LSTMTimeStep(); 
    // const net = new brain.recurrent.LSTMTimeStep({ inputSize: 2, hiddenLayers: [10], outputSize: 2,});
    // const net = new brain.recurrent.LSTM(); 
    // const net = new brain.recurrent.LSTM(); 
    // const net = new brain.recurrent.RNN(); 
    // const net = new brain.NeuralNetworkGPU(); 
    // const net = new brain.NeuralNetworkGRU(); 
```
</details> 

## [Training](https://github.com/BrainJS/brain.js#training) 
<details>
<summary>code</summary>

```javascript
    net.train([
    { input: [0, 1], output: [1] },
    { input: [0, 0], output: [0] },
    { input: [1, 1], output: [0] },
    { input: [1, 0], output: [1] },
    { input: [0, 1], output: [1] },
    { input: [0, 0], output: [0] },
    { input: [1, 1], output: [0] },
    { input: [1, 0], output: [1] }]); 

    net.train([
    { input: 'I feel great about the world!', output: 'happy' },
    { input: 'The world is a terrible place!', output: 'sad' },
    ]);
```
</details> 


### [Training Options](https://github.com/BrainJS/brain.js#training-options)
<details>
<summary>code</summary>

```javascript
    net.train(data, {
    // Defaults values --> expected validation
    iterations: 20000, // the maximum times to iterate the training data --> number greater than 0
    errorThresh: 0.005, // the acceptable error percentage from training data --> number between 0 and 1
    log: false, // true to use console.log, when a function is supplied it is used --> Either true or a function
    logPeriod: 10, // iterations between logging out --> number greater than 0
    learningRate: 0.3, // scales with delta to effect training rate --> number between 0 and 1
    momentum: 0.1, // scales with next layer's change value --> number between 0 and 1
    callback: null, // a periodic call back that can be triggered while training --> null or function
    callbackPeriod: 10, // the number of iterations through the training data between callback calls --> number greater than 0
    timeout: Infinity, // the max number of milliseconds to train for --> number greater than 0
    });
```
</details> 

### [Asynchronus Training](https://github.com/BrainJS/brain.js#async-training)
<details>
<summary>code</summary>

```javascript
    const net = new brain.NeuralNetwork();
    const net2 = new brain.NeuralNetwork();

    const p1 = net.trainAsync(data, options);
    const p2 = net2.trainAsync(data, options);

    Promise.all([p1, p2])
    .then((values) => {
        const res = values[0];
        const res2 = values[1];
        console.log(
        `net trained in ${res.iterations} and net2 trained in ${res2.iterations}`
        );
        // do something super cool with my 2 trained networks
    })
    .catch(handleError);

    const crossValidate = new brain.CrossValidate(
    brain.NeuralNetwork,
    networkOptions
    );
``` 
</details> 

### [Cross Validation](https://github.com/BrainJS/brain.js#cross-validation)
<details>
<summary>code</summary>

```javascript
    crossValidate.train(data, trainingOptions, k); //note k (or KFolds) is optional
    const json = crossValidate.toJSON(); // all stats in json as well as neural networks
    const net = crossValidate.toNeuralNetwork(); // get top performing net out of `crossValidate`

    // optionally later
    const json = crossValidate.toJSON();
    const net = crossValidate.fromJSON(json); 
```
</details> 

### [NodeJS Streams](https://github.com/BrainJS/brain.js#train-stream)
<details>
<summary>code</summary>

```javascript
    const net = new brain.NeuralNetwork();
    const trainStream = new brain.TrainStream({
    neuralNetwork: net,
    floodCallback: function () {
        flood(trainStream, data);
    },
    doneTrainingCallback: function (stats) {
        // network is done training!  What next?
    },
    });

    // kick it off
    readInputs(trainStream, data);

    function readInputs(stream, data) {
    for (let i = 0; i < data.length; i++) {
        stream.write(data[i]);
    }
    // let it know we've reached the end of the inputs
    stream.endInputs();
    } 
```
</details> 

### [Forecast](https://github.com/BrainJS/brain.js#forecastinput-count---predictions)
<details>
<summary>code</summary>

```javascript
    const net = new brain.LSTMTimeStep();
    net.fromJSON(json);
    net.forecast(input, 3); 

    const run = net.toFunction();
    const output = run({ r: 1, g: 0.4, b: 0 });
    console.log(run.toString()); // copy and paste! no need to import brain.js 
``` 
</details> 

### [Standalone Function](https://github.com/BrainJS/brain.js#standalone-function)
<details>
<summary>code</summary>

```javascript
    const run = net.toFunction();
    const output = run({ r: 1, g: 0.4, b: 0 });
    console.log(run.toString()); // copy and paste! no need to import brain.js
```
</details> 

### [Activation Function](https://github.com/BrainJS/brain.js#activation)
<details>
<summary>code</summary>

```javascript
    const net = new brain.NeuralNetwork({
        activation: 'sigmoid', /// relu, leaky-relu, tanh
        hiddenLayers: [4],
        learningRate: 0.6, // global learning rate, useful when training using streams
    }); 
``` 
</details>

### [Likely](https://github.com/BrainJS/brain.js#activation)
<details>
<summary>code</summary>

```javascript
    const likely = require('brain/likely');
    const key = likely(input, net); 
```
</details> 

## [toSVG](https://github.com/BrainJS/brain.js#tosvg)

