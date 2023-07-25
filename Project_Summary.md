# Project Summary

## 1. Introduction

This is an project using Vue.js implementing an album. It includes a album frame with turning page animation where different HTML files can be inserted as pages. It's responsive to different devices.

## 2. Structure
Here's the main structure and useful files of this project.

```
|-- ...
|-- src
|   |-- ...
|   |-- components
|   |   |-- CurlingV2.vue
|   |-- router
|   |   |-- index.js
|   |-- App.vue
|   |-- ...
|-- static
|   |-- ...
|-- ...
```

The src directory includes all source files and the static one includes the html files inserted to the album pages.

## 3. Details

### 3.1 router/index.js

This file is a router file which manages different interfaces and the interaction between them. This project only has one interface, thus there's no interaction. Thus this router only includes one extra source file `CurlingV2`.

### 3.2 components/CurlingV2.vue
This file contains three parts: template, script, and style.

#### 3.2.1 \<template\>
This part includes different components on the interface. The structure looks like this:
```
|-- wrapper
|   |-- corner
|   |-- page leftpage
|   |-- page rightpage
|   |-- turn-wrapper
|   |   |-- turn-page
|   |-- turn-wrapper2
|   |   |-- turn-page2
```
The `wrapper` is the biggest component that includes all inside smaller ones.

The `corner` is a small rectengle located at the lower right corner of the right page. This corner is used to detect the mouse or touch events for turning page.

The two `page` parts are the basic frame of the album. Here the `leftpage` has a directive `v-if="!isMobile"`. This means if the detected device is a movile device, then the laftpage won't exist. There would be only one page on a mobile device interface.

The two `turn-wrapper` helps turning page, and each one contains a next page.

#### 3.2.2 \<script\>

Here two main logics are implemented: responsive position/size and turning page animation.

##### **Responsive**
Use `mounted()` and `watch` parts, we monitor the windows size in real time and set the components size accordingly.

##### **Turning page**
When mouse down at the corner of the lower right corner of the right page, we start the turning process.

Before mouse up, the positions and rotation degrees of wrappers and turn-pages are calculated according to the current mouse position.

After mouse up, two phase animation are conducted.
- The wrapper and turn-page would first translate along the direction from the lower right point of the right page to the mouse up position.
- Then when the lower right corner of the turn-page is at the lower left corner of the right page, the wrapper and turn-page would rotate till the turn-page completely overlap with the left page.

After the turn-page completely overlap with the left page, we reset all the wrappers and turn-pages, and increase the page index at the same time.

#### 3.2.3 \<style\>
This parts set the style of the components on the interface. Since here we will reset the size and position according to the window size (responsively), it's acutally sets the initial value of most of the sizes.