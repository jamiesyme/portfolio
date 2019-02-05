# Name My Var

Name My Var is intended to be a search engine for variable, function, and class names. Given an input name, such as "error", the website will provide suggestions for alternative and related names, common uses, etc. At this point in time, only the front end is implemented.

- ![Home Page](/f/nmv-home.png)
- ![Search Page](/f/nmv-search.png)

## Why

Most programmers will agree that a key element to writing clean code is picking simple and succinct names. In most cases, the "right" name is the most obvious one. However, sometimes the right name isn\'t immediately obvious, either because the name you want to use is already taken, or the name isn\'t yet in your lexicon. I think having a website that you could use during such cases to explore a namespace of related/standard names would be very convenient.

## When

October 2017 &ndash; November 2017

## How

The front end is mostly custom, building only from jQuery and Milligram, and was designed to stay out of the user\'s way as much as possible. The temporary api server was put together with Node and Hapi.js, and serves results from a static JSON file. NGINX is used to serve the front end.

## Where

- [Website](https://namemyvar.com)
- [GitHub](https://github.com/jamiesyme/name-my-var)