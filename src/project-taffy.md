# Taffy

Taffy is an experiment in tag-based file systems. It supports file organization and search through use of tags.

- ![Help Command](/f/taffy-help.png)
- ![Using Taffy](/f/taffy-use.png)

## Why

I think tags provide a far more flexible approach to file organization than the traditional hierarchical systems, for both end-users and developers. This project was an attempt to explore the concept a bit more (and it allowed me to play with bloom filters).

## When

December 2017 &ndash; January 2018

## How

Since this was only prototype, I went with JavaScript/Node as my language of choice, and used Yarn to manage dependencies. The file system info is stored in a (fairly) flat directory structure in "~/.taffy". Hard links are created using the original files, so Taffy doesn\'t have to worry about file storage, and bloom filters are used to speed up large queries involving multiple tags.

## Where

- [GitHub](https://github.com/jamiesyme/taffy)