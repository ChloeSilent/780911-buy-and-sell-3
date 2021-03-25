"use strict";

const DEFAULT_PORT = 3000;
const MOCK_FILE_PATH = `./mocks.json`;
const fs = require(`fs`).promises;
const fs2 = require(`fs`);
const chalk = require(`chalk`);
const {HttpCode} = require(`../../HttpCode`);

const {Router} = require(`express`);
const offersRouter = new Router();

const express = require(`express`);
const {nanoid} = require("nanoid");

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(/\n|\r/g).filter((item) => {
      return item.length > 0;
    });
  } catch (err) {
    console.error(err);
    return [];
  }
};

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    "Content-Type": `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const returnTitles = async (file) => {
  const errMessage = `The file does not exist.`;
  try {
    if (fs2.existsSync(file)) {
      const mockData = await readContent(file);
      const arrMock = JSON.parse(mockData);
      return JSON.parse(arrMock).map((item) => {
        return item.title;
      });
    } else {
      console.log(errMessage);
      return false;
    }
  } catch (err) {
    console.log(errMessage);
    return false;
  }
};

const returnOffer = async (file, index) => {
  const errMessage = `The file does not exist.`;
  try {
    if (fs2.existsSync(file)) {
      const mockData = await readContent(file);
      const arrMock = JSON.parse(mockData);
      console.log('index', index, typeof inddex);
      console.log('JSON.parse(arrMock)', typeof JSON.parse(arrMock));
      return JSON.parse(arrMock)[index];
    } else {
      console.log(errMessage);
      return false;
    }
  } catch (err) {
    console.log(errMessage);
    return false;
  }
};

const returnOffers = async (file) => {
  const errMessage = `The file does not exist.`;
  try {
    if (fs2.existsSync(file)) {
      const mockData = await readContent(file);
      const arrMock = JSON.parse(mockData);
      return JSON.parse(arrMock).map((item) => {
        return item.comments;
      });
    } else {
      console.log(errMessage);
      return false;
    }
  } catch (err) {
    console.log(errMessage);
    return false;
  }
};

const returnList = (arr) => {
  const list = arr.map(item => {`<li>${item}</li>`});
  return `<ul>${list}</ul>`;
}

const returnComments = (arr) => {

  const list = arr.map(item => {return `<li id="${item.id}">${item.text}</li>`});
  return `<ul>${list.join('')}</ul>`;
}
module.exports = {
  name: `--server`,
  async run(args) {
    const port = args ? Number.parseInt(args[0], 10) : DEFAULT_PORT;
    const notFoundMessageText = `Not found`;
    const titlesList = await returnTitles(MOCK_FILE_PATH);
    const message = titlesList.map((post) => `<li>${post}</li>`).join(``);
    const app = express();

    app.get(`/`, async (req, res) => {
      try {
        sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, err, req, res);
      }
    });

    app.use(
      `/offers`,
      offersRouter.get(`/`, async (req, res) => {
        const jsonRes = JSON.parse(await fs.readFile(MOCK_FILE_PATH, `utf8`));
        res.json(jsonRes);
      })
    );

    app.get(`/offers/:offerId`, async (req, res) => {
      try {
        const offer = await returnOffer(MOCK_FILE_PATH, parseInt(req.params.offerId));
        const categories = returnList(offer.category);
        const comments = returnComments(offer.comments);
        sendResponse(res, HttpCode.OK, `<div><h1>${offer.title}</h1>${categories}<bold>${offer.type}</bold><bold>${offer.sum}</bold></div>${comments}`);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, err, req, res);
      }
    });

    app.use(function (req, res) {
      sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
    });

    app.listen(port, (err) => {
      if (err) {
        return console.error(`Ошибка при создании сервера`, err);
      }
      return console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  },
};
