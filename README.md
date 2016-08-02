# minimegapixel
[The Megapixel](http://www.manchestermegapixel.com/) is a project being run by [Katie Steckles](http://www.katiesteckles.co.uk) to the [Manchester Science Festiva](http://www.manchestersciencefestival.com) 2016. It aims to [demonstrate how a computer display works, by taking hundreds of "pixels", colouring different amounts of each one red, green and blue, and then arranging the result into a photograph](http://www.manchestermegapixel.com/how-does-it-work/). Each pixel is a square, split into three sections for red, green and blue, each split into 100 smaller squares. RGB codes for each pixel will be given out of 100 and that many squares of each section are coloured red, green or blue. The other squares will be coloured black.

This tool is to help places like schools create their own smaller-scale versions. The pixel templates will be available for download to print; this will generate the numbers of squares to be coloured on each one — in this version, out of 10.

A real computer can display 16.7 million colours. The Megapixel will be able to display 1 million. The minimegapixels will be able to display 1000.

# Colour calibration

This is a fairly high-level discussion; I will try to post something more accessible later.

## Gamma

The first thing we do is apply a gamma correction. The Megapixel by nature has a gamma setting of exactly 1, so we need to remove the gamma factor from both the pen colours and the colours in the image to be encoded before we do anything else with them.

## Colour correction

The second step is to comvert the image from "true" RGB space to the somewhat defective RGB space of the pens. To do this, we define a matrix whose rows are the (gamma corrected) RGB values of each pen, and invert it. Multiplying a (gamma corrected) RGB value by this new matrix gives us the amount of pen needed to recreate it.

Sometimes this results in amounts of pen above 100%, or below 0%. The only thing we can do about this is to choose an image carefully, and apply an overall brightness correction to get the high values back under 100%. A few pixels outside the legal range do not matter though, and can be less destructive than making the entire image very dark to accomodate them.

For this reason we also generate a preview image so that you can get a feel for what the final megapixel will look like before doing all the colouring.
