import multer from "multer";
import path from "path";
import express from "express";
const app = express();
import bodyParser from "body-parser";
import cors from "cors";
import upload from "./upload.js";

app.use(cors());
app.use("/images", express.static("images"));
app.listen(3000, function () {
  console.log("listening on 3000");
});

let books = [
  {
    id: 0,
    book_name: "This book",
    writer_name: "Azam Ali Khan",
    price: "10$",
    Available: false,
  },
  {
    id: 1,
    book_name: "The last life",
    writer_name: "Dr Ali Khan",
    price: "20$",
    Available: true,
    file: "abc.png",
  },
];
let jsoform = {
  feildData: {
    title: "NFT-Drop Form",
    type: "object",
    properties: {
      name: {
        type: "string",
      },
      blockchain: {
        type: "string",
      },
      description: {
        type: "string",
      },
      logo: {
        type: "string",
        format: "data-url",
      },
      gallery: {
        type: "string",
        format: "data-url",
      },
      website: {
        type: "string",
      },
      saleDate: {
        type: "string",
        format: "date",
      },
      salePrice: {
        type: "number",
        minimum: 0,
      },
      presalePrice: {
        type: "number",
        minimum: 0,
      },
      totalSupply: {
        type: "number",
        minimum: 0,
      },
      twitterUrl: {
        type: "string",
        format: "uri",
        pattern: "^(https?|wss?|ftp)://",
      },
      discordUrl: {
        type: "string",
        format: "uri",
        pattern: "^(https?|wss?|ftp)://",
      },
      required: ["name", "discordUrl"],
    },
  },
  schema: {
    name: {
      classNames: "form-group",
      "ui:autofocus": true,
      "ui:placeholder": "Enter you NFT title ",
    },

    blockchain: {
      classNames: "form-group",
      "ui:placeholder": "Enter you type of Blockchain  ",
    },
    description: {
      classNames: "form-group",
      "ui:widget": "textarea",
      "ui:placeholder": "Tell us about your NFT drop and why it's unique",
    },
    logo: {
      classNames: "form-group",
    },
    gallery: {
      classNames: "form-group",
    },
    website: {
      classNames: "form-group",
      "ui:placeholder": "Enter your NFT collection website",
    },
    saleDate: {
      classNames: "form-group",
    },
    salePrice: {
      classNames: "form-group",
      "ui:placeholder": "$00.0",
    },
    presalePrice: {
      classNames: "form-group",
      "ui:placeholder": "$00.0",
    },
    totalSupply: {
      classNames: "form-group",
      "ui:placeholder": "00.00",
    },
    twitterUrl: {
      classNames: "form-group",
      "ui:placeholder": "http://twitter.com/yournftdrop",
    },
    discordUrl: {
      classNames: "form-group",
      "ui:placeholder": "http://discord.gg/yournftdrop",
    },
  },
};

let jsoform1 = {
  feildData: {
    type: "object",
    anyOf: [
      {
        properties: {
          email: {
            type: "string",
          },
          password: {
            type: "string",
            "ui:widget": "password",
            "ui:help": "Hint: Make it strong!",
          },
        },
        required: ["email", "password"],
      },
      {
        properties: {
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
          ipsum: {
            type: "string",
          },
          ipsum1: {
            type: "string",
          },
        },
      },
    ],
  },
  schema: {
    password: {
      "ui:widget": "password",
      "ui:description": "",
    },
  },
};
let tailwendCssform = [
  {
    id: 0,
    book_name: "This book",
    writer_name: "Azam Ali Khan",
    price: "10$",
    Available: false,
  },
];

// TAILWEND CSS FORM

app.get("/tailwendcssform", (req, res) => {
  res.json(tailwendCssform);
});

app.post(
  "/tailwendcssform",
  upload.fields([
    {
      name: "logo",
      maxCount: 1,
    },
    {
      name: "imgArray",
      maxCount: 100,
    },
  ]),
  (req, res) => {
    console.log(req.files.logo, "body");
    console.log(req.files.imgArray, "body");
    req.body.imageArray = [];
    req.body.logoImage = "";

    for (let x = 0; x < req.files.imgArray.length; x++) {
      req.body.imageArray.push(
        `${req.protocol}://${req.get("host")}/${req.files.imgArray[
          x
        ].path.replace("\\", "/")}`
      );
    }

    req.body.logoImage = `${req.protocol}://${req.get(
      "host"
    )}/${req.files.logo[0].path.replace("\\", "/")}`;
    req.body.id = tailwendCssform.length;
    console.log(req.body.imageArray, req.body.logoImage);
    tailwendCssform.push(req.body);
    res.send("form is added to the database");
  }
);

//Json Form
app.get("/simpleform", (req, res) => {
  res.json(jsoform);
});
app.get("/nustedform", (req, res) => {
  res.json(jsoform1);
});

//Create the Books

app.post("/book", (req, res) => {
  const book = req.body;
  book.id = books.length;
  books.push(book);
  res.send("Book is added to the database");
});

//Read the Books

app.get("/book", (req, res) => {
  res.json(books);
});

//Read the Books at specific id
//   app.get('/book/:id', (req, res) => {

//   const id = parseInt(req.params.id);
//   for (let book of books) {
//       if (book.id == id) {
//           res.json(book);
//           console.log("yes book is found")
//           return;
//       }
//   }
//   res.status(404).send('Book not found');
// });
// //update the book at specific id through put
// app.put('/book/:id', (req, res) => {
//   const id = req.params.id;
//   let book = req.body;
//   for (let i = 0; i < books.length; i++) {
//       let book1 = books[i]
//       if (book.id == book1.id) {
//           books[i] = book;
//       }
//   }
//   res.send('Book is replace');
// });
// //update the book at specific id through patch
// app.patch('/book/:id', (req, res) => {
//   const id = req.params.id;
//   let book = req.body;

//   for (let i = 0; i < books.length; i++) {
//       let book1 = books[i]
//       if (book.id == book1.id) {
//           books[i] = {...book[i], ...book};
//       }
//   }
//   res.send('Book is update');
// });
// //Delete the specific id
// app.delete('/book/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   let book=req.body
// for(let x=0;x<books.length;x++){
//   let book1=books[x]
//   if(book.id==book1.id){
//     console.log(book.id)
//     let index=books.indexOf(book1)
// books.splice(index,1);
// console.log("yyyyyyyyy",index)
//   }
// }
//   res.send('Book is deleted');
// });
