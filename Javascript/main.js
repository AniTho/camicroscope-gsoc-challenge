// Global variables to keep track of layer no and prepare a model
var layer_no = 0;
let model = null;

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

// Create a basic Model without any functionality
function createModel(){
  model = tf.sequential();
  layer_no += 1;
  var denseButton = document.getElementById('dense-button');
  denseButton.style.display = 'inline';
  var addButton = document.getElementById('add-button');
  addButton.style.display = 'none';
  var addData = document.getElementById('add-data');
  addData.style.display = 'none';
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
