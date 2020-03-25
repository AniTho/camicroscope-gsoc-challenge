# camicroscope-gsoc-challenge
This repository contains implementation of second idea challenge by camicroscope for GSOC.

# About Challenge

Implement a web based GUI interface that allow user to select a layer for training of deep learning models.

## Technological Stack

- HTML
- CSS
- Javascript
- Tensorflow js

## Requirements

Nothing. The repository is self-contained. User just have to run **index.html** file.


## Note:- 

- The data taken for training is for demonstration purposes and is hard-coded tensorflow tensors. It can be changed by going to the functions addData1() and addData2() for regression and classification respectively in the file main.js in javascript folder.
- Since the data is fixed the input dimension for regression data is 1 and it has 9 sample data point to show that the program is working well.
- Similarly, the input dimension for classification data is 2 it has 10 sample data point and 2 classes to show that program is working well.
- The implementation currently doesn't have any feature for providing testing data which can be added later.

## Refernces:-

- https://towardsdatascience.com/how-to-train-a-neural-network-on-chrome-using-tensorflow-js-76dcd1725032
- https://www.tensorflow.org/js/guide
- https://www.w3schools.com/
