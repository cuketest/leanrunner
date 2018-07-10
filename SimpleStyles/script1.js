//Node.js sample of automating SimpleStyles.exe
//Demo of automating different type of controls
//Created by LeanPro Co., Ltd.

const { TestModel, Util, launchSample } = require("leanrunner");
var model = TestModel.loadModel(__dirname + "/simle_styles.tmodel");

async function run() {

    await model.getButton("Default").click(0, 0, 1);

    await model.getButton("Normal").dblClick(0, 0, 1);

    await model.getText("CheckBox").click(0, 0, 1);

    await model.getCheckBox("Normal1").check(false);

    let ischecked = await model.getCheckBox("Normal1").checked();
    if (!ischecked) {
        await model.getCheckBox("Normal1").check(true);

    }

    await model.getCheckBox("Checked").dblClick(0, 0, 1);


    await model.getRadioButton("Normal2").check(false);

    await model.getRadioButton("Normal2").check(true);


    await model.getEdit("Edit").clearAll();

    await model.getEdit("Edit").pressKeys("china");

    await model.getEdit("Edit1").clearAll();

    await model.getEdit("Edit1").set("china");


    let item = await model.getList("List").getItem(0);
    console.log("item is:", item)

    await model.getComboBox("ComboBox1").open();

    await Util.delay(1000)


    await model.getText("Third Normal Item1").click(0, 0, 1);

    await Util.delay(1500)
    await model.getSlider("Slider1").drag(-1, -1);

    try {

        await model.getMenuItem("Top One").open();

        await Util.delay(1500)

        await model.getMenuItem("Sub Four").click(0, 0, 1);

        await Util.delay(1500)
        await model.getText("Sub Two1").click(0, 0, 1);
        await Util.delay(1500)
    } catch (e) {
        console.log("e:", e)
    }



    await model.getTreeItem("Top Three").expand();
    await Util.delay(1500)

    await model.getTreeItem("Top Three").collapse();

    await model.getTreeItem("Top Three").expand();
    await model.getTreeItem("Top Three").collapse();

    await model.getTreeItem("Top Three").expand();
    await model.getTreeItem("Top Three").collapse();

    await model.getTreeItem("Top Three").expand();
    await model.getTreeItem("Top Three").collapse();

    await model.getTreeItem("Top Three").expand();
    await model.getTreeItem("Top Three").collapse();

    await model.getTreeItem("Top Three").expand();
    // bug4 model文件未保存时 进行搜索会报错
    // await Util.delay(1000)
    await model.getText("(Right-Click Me)").click(0, 0, 2);
    await Util.delay(1500)

    await model.getMenuItem("Sub Four1").click(0, 0, 1);
    await Util.delay(1500)

    // await model.getMenuItem("Sub One").click(0, 0, 1);

    await model.getMenuItem("Sub Three").click(0, 0, 1);

    await model.getHyperlink("Page1").click(0, 0, 1);

}

(async function() {
    //launch sample exe
    launchSample();
    //wait for sample to show 
    await Util.delay(2000);
    //start automate
    run();
})();
