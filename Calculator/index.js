//Node.js sample of automating Windows 10 Calculator
//Created by LeanPro Co., Ltd.

const { TestModel, Util } = require("leanrunner");
const path = require('path');
const assert = require('assert');

let modelfile = path.join(__dirname, 'Model.tmodel')
let model = TestModel.loadModel(modelfile);

/**
 * launch Calculator
 */
function launchCalc() {
    let calcPath = '%windir%\\system32\\calc.exe';
    let expandedPath = calcPath.replace(/%([^%]+)%/g, (_, n) => (process.env[n]))
    return Util.launchProcess(expandedPath);
}

/**
 * perform "add" operation
 */
async function add() {

    await model.getButton("Clear").click();

    await model.getButton("One").click();
    await model.getButton("Plus").click();
    await model.getButton("Two").click();
    await model.getButton("Equals").click();

    //check the result is expected 
    let text = await model.getText("Display Result").name()
    let t = text.split(' ');
    assert.equal(3, t[t.length - 1]);
}

/**
 * perform "minus" operation
 */
async function minus() {

    await model.getButton("Clear").click();

    await model.getButton("Two").click();
    await model.getButton("Minus").click();
    await model.getButton("One").click();
    await model.getButton("Equals").click();

    //check the result is expected 
    let text = await model.getText("Display Result").name();
    let t = text.split(' ');
    assert.equal(1, t[t.length - 1]);

}

/**
 * perform "multiply" operation
 */
async function multiply() {

    await model.getButton("Clear").click();

    await model.getButton("Two").click();
    await model.getButton("Multiply by").click();
    await model.getButton("Three").click();
    await model.getButton("Equals").click();

    //check the result is expected 
    let text = await model.getText("Display Result").name()
    let t = text.split(' ');
    assert.equal(6, t[t.length - 1]);

}

/**
 * perform "divide" operation
 */
async function divide() {

    await model.getButton("Clear").click();

    await model.getButton("Eight").click();
    await model.getButton("Divide by").click();

    await model.getButton("Two").click();
    await model.getButton("Equals").click();

    //check the result is expected 
    let text = await model.getText("Display Result").name();
    let t = text.split(' ');
    assert.equal(4, t[t.length - 1]);
}

async function run() {
    let proc = launchCalc();
    await Util.delay(1000); //wait for process to initialize

    await add();
    console.log('add is successful.');
    await minus();
    console.log('minus is successful.');
    await multiply();
    console.log('multiply is successful.');
    await divide();
    console.log('divide is successful.');
}

run();