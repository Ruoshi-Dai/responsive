# Responsive Website Demo

## 1. Introduction
This is a demo project of responsive websites using Vue.js and Cube-ui (which is a mobile ui library developed by didi). Our main task is to make the website responsive. We simply put some elements in the ui lib on one page and modified the css code to make them responsive.

Here are the tools we used and their versions:

| Tools | Version |
| :----: | :----: |
| Vue | 2.7.14 |
| vue-cli | 2.9.6 |
| Cube-ui | 1.12.48 |


## 2. Results
We use the screenshots to show the results here. First is the whole page preview:

![avatar](/responsive/screenshots/preview.png)

### (1) Responsive

Firstly, the sizes of all the text on this page (including text in the elements like buttons, checkboxes and so on) are changing according to the screen size.

Then we will see how this page looks like under different dimensions as follows:

#### iPhone 12 Pro
![avatar](/responsive/screenshots/iphone12pro.png)

#### iPad Mini
![avatar](/responsive/screenshots/ipadmini.png)

#### Nest Hub
![avatar](/responsive/screenshots/NestHub.png)

### (2) Cube ui

Here's a simple explanation of how I used this ui library.

For the button, if we click it, the text on the right side is hidden and the text on the button changes to "Show".
![avatar](/responsive/screenshots/button1.png)
Then if we click it again, the text shows up.
![avatar](/responsive/screenshots/button2.png)

I didn't manage a lot about the action of checkboxes.

For the textarea, what we type in the area will show up on the right:
![avatar](/responsive/screenshots/textarea1.png)
These sentances' font size will also change according to the screen size:
![avatar](/responsive/screenshots/textarea2.png)

## 3. How to make the website responsive

In this demo, we use two ways to make the website responsive.

### (1) Use %

In the css code, using % instead of fixed length. Like

```
h1 {
  margin-left: 5%;
  margin-top: 5%;
}
```

### (2) Use ```mounted``` and ```watch```

Set a variable in ```data``` to record the screen width. We listen to the window resizing and change this variable once the window resizes. Then we use ```:style``` to bind the elements' size with the window size. Thus the elements will resize when the window resizes.