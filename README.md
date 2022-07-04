![GrabMii](https://i.ibb.co/10XydrB/image.png)
A Node.js web API made to get Mii informations only using a Nintendo Network ID (NNID)

## Installation
**First, run `npm install` in your terminal to install all required packages**

Then, run it using `node index.js`

Once it is running, you're good to go!

## Usage
(**nnid** is your nintendo network username and **expression-type**s are listed below)

|url| usage |
|--|--|
| /all?id=**nnid** | Get every info from the Nintendo API |
| /whash?id=**nnid** | Gets the hash used for WaraWara Plaza |
| /mhash?id=**nnid** | Gets the hash used for mii-images.cdn.nintendo.net |
| /expression?type=**expression-type**&id=**nnid** | Gets an image from your Mii |

## Expression types

| example |expression-type| format |
|--|--|--|
| ![](http://mii-images.account.nintendo.net/3f89y68p7z0hq_whole_body.png) | whole_body | png |
| ![](https://mii-secure.account.nintendo.net/3f89y68p7z0hq_standard.tga) | standard | tga |
| ![](http://mii-images.account.nintendo.net/3f89y68p7z0hq_frustrated_face.png) | frustrated_face | png |
| ![](http://mii-images.account.nintendo.net/3f89y68p7z0hq_happy_face.png) | happy_face | png |
| ![](http://mii-images.account.nintendo.net/3f89y68p7z0hq_like_face.png) | like_face | png |
| ![](http://mii-images.account.nintendo.net/3f89y68p7z0hq_normal_face.png) | normal_face | png |
| ![](http://mii-images.account.nintendo.net/3f89y68p7z0hq_puzzled_face.png) | puzzled_face | png |
| ![](http://mii-images.account.nintendo.net/3f89y68p7z0hq_surprised_face.png) | surprised_face | png |
