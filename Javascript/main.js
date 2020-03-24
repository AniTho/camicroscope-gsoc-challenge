// Global variables to keep track of layer no and prepare a model
var layer_no = 0;
let model = null;

// Define x and y for demo purpose
var x = null;
var y = null;


// Create demo  regression data1
function addData1(){
  x = tf.tensor2d([0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], [9,1]);
  y = tf.tensor2d([0.1, 0.2, 0.2, 0.3, 0.3, 0.4, 0.4, 0.5, 0.5], [9,1]);
  const addButton1 = document.getElementById('add-data1');
  const addButton2 = document.getElementById('add-data2');
  const layerButton = document.getElementById('add-button');

  // Disable data loading button and enable add layer button
  addButton1.disabled = true;
  addButton1.style.backgroundColor = '#333333';
  addButton1.style.color = '#ffffff';
  addButton2.disabled = true;
  addButton2.style.backgroundColor = '#333333';
  addButton2.style.color = '#ffffff';
  layerButton.disabled = false;
  layerButton.style.backgroundColor = "#c1ff86";
  layerButton.style.color = "#000000";

  // Show that data is loaded
  const head = document.getElementById('start');
  head.textContent = "Data Loaded... and I/P is of size (9,1) and O/P is of size (9,1)";

}

// Create demo Classification data2
function addData2(){
  x = tf.tensor2d([[1,1], [1,2], [1,3], [2,2], [3,3], [3,2], [4,4], [4,3], [5,1], [6,3]], [10,2]);
  y = tf.tensor2d([1, 1, 1, 1, 1, -1, -1, -1, -1, -1], [10,1]);
  const addButton1 = document.getElementById('add-data1');
  const addButton2 = document.getElementById('add-data2');
  const layerButton = document.getElementById('add-button');

  // Disable data loading button and enable add layer button
  addButton1.disabled = true;
  addButton1.style.backgroundColor = '#333333';
  addButton1.style.color = '#ffffff';
  addButton2.disabled = true;
  addButton2.style.backgroundColor = '#333333';
  addButton2.style.color = '#ffffff';
  layerButton.disabled = false;
  layerButton.style.backgroundColor = "#c1ff86";
  layerButton.style.color = "#000000";

  // Show that data is loaded
  const head = document.getElementById('start');
  head.textContent = "Data Loaded... and I/P is of size (10,2) and O/P is of size (10,1) with 2 labels";

}


// Create a basic Model without any functionality
function createModel(){
  model = tf.sequential();
  layer_no += 1;
  var addButton1 = document.getElementById('add-data1');
  addButton1.style.display = 'none';
  var addButton2 = document.getElementById('add-data2');
  addButton2.style.display = 'none';
  //var head = document.getElementById('start');
  //head.textContent = "The";
  var denseButton = document.getElementById('dense-button');
  denseButton.style.display = 'inline';
  var addButton = document.getElementById('add-button');
  addButton.style.display = 'none';
  var addData = document.getElementById('add-button');
  addData.style.display = 'none';
}


// Display content to be entered for dense layer for model creation
function denseLayer(){

  // Disable Conv Layer button to prevent adding layer without entering anything
  const denseButton = document.getElementById("dense-button");
  denseButton.disabled = true;
  denseButton.style.backgroundColor = '#555555';


  const myForm = document.getElementById("form1");
  const input = document.getElementById("inputDim");
  const inputDimLab = document.getElementById("inputDimLab");
  const submitButton = document.getElementById('submit');

  // Enable submit button
  submitButton.disabled = false;
  submitButton.style.display = 'inline';


  // Display the message to enter details of nth layer
  const notice = document.getElementById('notice');
  notice.textContent = "Add Details of the layer "+layer_no+" to continue";
  notice.style.display = "inline";

  // Display my form
  myForm.style.display = "inline";

  // If no of layers is greater than 1 then hide input dimension
  if (layer_no > 1){
    input.style.display = "none";
    inputDimLab.style.display = "none";
  }

  // If layer is first than show input dimension
  else{
    input.style.display = "inline";
    inputDimLab.style.display = "inline-block";

  }
}


// Add layer if all the details are entered
function onClick(){
    const denseButton = document.getElementById("dense-button");
    const submitButton = document.getElementById('submit');
    var hidden = Number(document.querySelector("#hiddenUnit").value);
    var input = Number(document.querySelector("#inputDim").value);
    var fxn = document.querySelector("#activationFxn").value;
    if (layer_no == 1)
    {
      if ((hidden <= 0) || (input <= 0) || (fxn == ''))
      {
        alert("Kindly fill all the model details");
      }
      else{
        model.add(tf.layers.dense({inputShape: [input], units: hidden, activation:fxn}));

        layer_no ++;
        submitButton.disabled = true;
        submitButton.style.backgroundColor = '#555555';

        nextScreen();
      }
    }

    else{
      if ((hidden <= 0) || (fxn == ''))
      {
        alert("Kindly fill all the model details")
      }
      else
      {
        model.add(tf.layers.dense({units: hidden, activation:fxn}));
        layer_no ++;
        submitButton.disabled = true;
        submitButton.style.backgroundColor = '#555555';
        nextScreen();
      }
    }
}

// Hide the previous layer and show new layer
function nextScreen(){
  const fitModel =  document.getElementById("fit-button");
  fitModel.style.display = 'inline';
  const addLayer = document.getElementById("add-layer");
  addLayer.style.display = 'inline';
  const summaryModel = document.getElementById("summary-button");
  summaryModel.style.display = 'inline';
}

// Enable Functionality to add another layer
function addLayer(){

  const denseButton = document.getElementById("dense-button");
  const submitButton = document.getElementById('submit');
  const myForm = document.getElementById("form1");
  const input = document.getElementById("inputDim");
  const inputDimLab = document.getElementById("inputDimLab");
  const notice = document.getElementById('notice');

  // Enable button to add dense layer
  denseButton.disabled = false;
  denseButton.style.backgroundColor = '#b44e4e';

  // Enable submit button but hide it and the form
  submitButton.disabled = true;
  submitButton.style.backgroundColor = '#317e56';
  submitButton.style.display = 'none';

  myForm.style.display = 'none';
  input.style.display = 'none';
  inputDimLab.style.display = 'none';
  notice.style.display = 'none';
}

// Displays the summary of the model
function summary(){
  tfvis.show.modelSummary({name: 'Model Summary'}, model);
}

// Compile and fit the modelSummary
function fitModel(){
  const myForm2 = document.getElementById('form2');
  const notice1 = document.getElementById('notice1');
  notice1.style.display = "inline";
  myForm2.style.display = "inline";
}

// Training the Model

async function train(epoch, batch)
{
  const history = await model.fit(x, y,
                    { epochs: epoch,
                      batchSize: batch,
                      callbacks:{
                          onEpochEnd: async(epoch, logs) =>{
                              console.log("Epoch:"
                                          + epoch
                                          + " Loss:"
                                          + logs.loss);}}});
}

// Start training
async function runModel(){
  const optimizer = document.getElementById('Optimizers').value;
  const loss = document.getElementById('Loss').value;
  const metrics = document.getElementById('metrics').value;
  const epoch = Number(document.getElementById('epochs').value);
  const batch = Number(document.getElementById('batch').value);

  // Prompting user to fill all the necessary Details

  if ((optimizer == '') || (loss == '') || (metrics == '') || (epoch <= 0) || (batch <= 0))
  {
    alert("Kindly fill all the details properly");
  }
  else{
    model.compile({
      optimizer: optimizer,
      loss:loss,
      metrics: [metrics]
    });

    train(epoch, batch);

    const tail = document.getElementById('final');
    tail.textContent = "Model is training... You can view it on console";
  }

}
