# Videoso

Videoso is an early prototype of a video sharing platform.

- ![Home Page](/f/videoso-1.png)
- ![Video Player](/f/videoso-2.png)

## Why

I've been watching YouTube for over 10 years now, and while I love the website, their subscription system is anything but flexible. I thought it'd be interesting to experiment with a tag-based system that would allow users to subscribe to a specific series of videos published by a creator. I also figured that in this day and age, it wouldn't hurt to learn a little bit about video streaming.

## When

July 2017 – August 2017

## How

The front end is pretty basic, using only Bootstrap and Video.js. The back end is written in Go, and uses FFmpeg and MP4Box to process videos. After processing, the MPEG-DASH files are uploaded to S3, and video metadata is stored in Postgres.

## Where

- [Website](https://videoso.ca)
- [GitHub](https://github.com/jamiesyme/videoso)