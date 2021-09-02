<h1 align="center">
    <img src="https://github.com/ivanseibel/zip-files-with-react/blob/main/src/static/printscreen01.png" alt="printscreen01.png">
</h1>

# Zipping 2 PDF files with jszip library

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [To Improve](#to_improve)


## About <a name = "about"></a>

You have two different endpoints that return a blob-like content, in this case pdf files, and you want to offer the user a one-click download with the files compressed into a single zip file.

What do you do?

Okay, the backend should return the zipped files, I agree. But what if you don't have a backend that does it for you? What if you have to consume completely different services to get these files?

In that case you'll want to be able to do this from the front end.

### Libraries

I'm using:

- [Axios](https://github.com/axios/axios): to get remote files;
- [JSZip](https://stuk.github.io/jszip/): to zip the files obtained;
- [file-saver](https://github.com/eligrey/FileSaver.js): to save the zip file automatically.

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

No prerequisites at all.

### Installing

Install all libraries.

```bash
# npm install
```

## Usage <a name = "usage"></a>

Just run it.

```bash
# npm start
```

## To Improve <a name = "to_improve"></a>

- Get filename or create randomly
- Create a container to add multiple URLs
- Add a loading visual component (progress bar?)