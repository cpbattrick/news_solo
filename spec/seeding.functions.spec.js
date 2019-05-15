const { expect } = require("chai");
const { createRef, renameKeys } = require("../utils/seeding-functions");

describe("createRef", () => {
  it("returns an empty object, when passed an empty array", () => {
    const input = [];
    const actual = createRef(input);
    const expected = {};
    expect(actual).to.eql(expected);
  });

  it("returns a reference object, when passed an array containing one object", () => {
    const input = [
      {
        title: "Learn HTML5, CSS3, and Responsive WebSite Design in One Go",
        topic: "coding",
        author: "grumpy19",
        body:
          "Both CSS3 and HTML5 are just about fully supported in all modern browsers, and we there are techniques in place to patch old browsers that lack support. So there is no disadvantage to using CSS3 and HTML5 today. The opposite is true, however: there are many painful, frustrating disadvantages with forgoing HTML5 and CSS3. You may already “know” a bit of HTML5 and a touch of CSS3 (or perhaps you probably know enough old-school HTML and CSS), and with this knowledge, you might have thought you needn’t learn HTML5 and CSS3 fully.",
        created_at: 1488766934447
      }
    ];
    const actual = createRef(input, "author", "title");
    const expected = {
      grumpy19: "Learn HTML5, CSS3, and Responsive WebSite Design in One Go"
    };
    expect(actual).to.eql(expected);
  });

  it("returns a reference object, when passed an array containing more than one object", () => {
    const input = [
      {
        title: "Express.js: A Server-Side JavaScript Framework",
        topic: "coding",
        author: "cooljmessy",
        body:
          "You’re probably aware that JavaScript is the programming language most often used to add interactivity to the front end of a website, but its capabilities go far beyond that—entire sites can be built on JavaScript, extending it from the front to the back end, seamlessly. Express.js and Node.js gave JavaScript newfound back-end functionality—allowing developers to build software with JavaScript on the server side for the first time. Together, they make it possible to build an entire site with JavaScript: You can develop server-side applications with Node.js and then publish those Node.js apps as websites with Express. Because Node.js itself wasn’t intended to build websites, the Express framework is able to layer in built-in structure and functions needed to actually build a site. It’s a pretty lightweight framework that’s great for giving developers extra, built-in web application features and the Express API without overriding the already robust, feature-packed Node.js platform. In short, Express and Node are changing the way developers build websites.",
        created_at: 1467269979654
      },
      {
        title: "Learn HTML5, CSS3, and Responsive WebSite Design in One Go",
        topic: "coding",
        author: "grumpy19",
        body:
          "Both CSS3 and HTML5 are just about fully supported in all modern browsers, and we there are techniques in place to patch old browsers that lack support. So there is no disadvantage to using CSS3 and HTML5 today. The opposite is true, however: there are many painful, frustrating disadvantages with forgoing HTML5 and CSS3. You may already “know” a bit of HTML5 and a touch of CSS3 (or perhaps you probably know enough old-school HTML and CSS), and with this knowledge, you might have thought you needn’t learn HTML5 and CSS3 fully.",
        created_at: 1488766934447
      },
      {
        title:
          "An Introduction to JavaScript Object Notation (JSON) in JavaScript and .NET",
        topic: "coding",
        author: "cooljmessy",
        body:
          "When designing an application that will communicate with a remote computer, a data format and exchange protocol must be selected. There are a variety of open, standardized options, and the ideal choice depends on the applications requirements and pre-existing functionality. For example, SOAP-based web services format the data in an XML payload wrapped within a SOAP envelope. While XML works well for many application scenarios, it has some drawbacks that make it less than ideal for others. One such space where XML is often less than ideal is with Ajax-style web applications. Ajax is a technique used for building interactive web applications that provide a snappier user experience through the use of out-of-band, lightweight calls to the web server in lieu of full-page postbacks. These asynchronous calls are initiated on the client using JavaScript and involve formatting data, sending it to a web server, and parsing and working with the returned data. While most browsers can construct, send, and parse XML, JavaScript Object Notation (or JSON) provides a standardized data exchange format that is better-suited for Ajax-style web applications. JSON is an open, text-based data exchange format (see RFC 4627). Like XML, it is human-readable, platform independent, and enjoys a wide availability of implementations. Data formatted according to the JSON standard is lightweight and can be parsed by JavaScript implementations with incredible ease, making it an ideal data exchange format for Ajax web applications. Since it is primarily a data format, JSON is not limited to just Ajax web applications, and can be used in virtually any scenario where applications need to exchange or store structured information as text. This article examines the JSON standard, its relationship to JavaScript, and how it compares to XML. Jayrock, an open-source JSON implementation for .NET, is discussed and examples of creating and parsing JSON messages are provided in JavaScript and C#.",
        created_at: 1477707849225
      }
    ];
    const actual = createRef(input, "author", "title");
    const expected = {
      cooljmessy: "Express.js: A Server-Side JavaScript Framework",
      grumpy19: "Learn HTML5, CSS3, and Responsive WebSite Design in One Go",
      cooljmessy:
        "An Introduction to JavaScript Object Notation (JSON) in JavaScript and .NET"
    };
    expect(actual).to.eql(expected);
  });

  it("returns a reference object, when passed an array containing different key/ value", () => {
    const input = [
      {
        title: "Express.js: A Server-Side JavaScript Framework",
        topic: "coding",
        author: "cooljmessy",
        body:
          "You’re probably aware that JavaScript is the programming language most often used to add interactivity to the front end of a website, but its capabilities go far beyond that—entire sites can be built on JavaScript, extending it from the front to the back end, seamlessly. Express.js and Node.js gave JavaScript newfound back-end functionality—allowing developers to build software with JavaScript on the server side for the first time. Together, they make it possible to build an entire site with JavaScript: You can develop server-side applications with Node.js and then publish those Node.js apps as websites with Express. Because Node.js itself wasn’t intended to build websites, the Express framework is able to layer in built-in structure and functions needed to actually build a site. It’s a pretty lightweight framework that’s great for giving developers extra, built-in web application features and the Express API without overriding the already robust, feature-packed Node.js platform. In short, Express and Node are changing the way developers build websites.",
        created_at: 1467269979654
      },
      {
        title: "Learn HTML5, CSS3, and Responsive WebSite Design in One Go",
        topic: "coding",
        author: "grumpy19",
        body:
          "Both CSS3 and HTML5 are just about fully supported in all modern browsers, and we there are techniques in place to patch old browsers that lack support. So there is no disadvantage to using CSS3 and HTML5 today. The opposite is true, however: there are many painful, frustrating disadvantages with forgoing HTML5 and CSS3. You may already “know” a bit of HTML5 and a touch of CSS3 (or perhaps you probably know enough old-school HTML and CSS), and with this knowledge, you might have thought you needn’t learn HTML5 and CSS3 fully.",
        created_at: 1488766934447
      },
      {
        title:
          "An Introduction to JavaScript Object Notation (JSON) in JavaScript and .NET",
        topic: "coding",
        author: "cooljmessy",
        body:
          "When designing an application that will communicate with a remote computer, a data format and exchange protocol must be selected. There are a variety of open, standardized options, and the ideal choice depends on the applications requirements and pre-existing functionality. For example, SOAP-based web services format the data in an XML payload wrapped within a SOAP envelope. While XML works well for many application scenarios, it has some drawbacks that make it less than ideal for others. One such space where XML is often less than ideal is with Ajax-style web applications. Ajax is a technique used for building interactive web applications that provide a snappier user experience through the use of out-of-band, lightweight calls to the web server in lieu of full-page postbacks. These asynchronous calls are initiated on the client using JavaScript and involve formatting data, sending it to a web server, and parsing and working with the returned data. While most browsers can construct, send, and parse XML, JavaScript Object Notation (or JSON) provides a standardized data exchange format that is better-suited for Ajax-style web applications. JSON is an open, text-based data exchange format (see RFC 4627). Like XML, it is human-readable, platform independent, and enjoys a wide availability of implementations. Data formatted according to the JSON standard is lightweight and can be parsed by JavaScript implementations with incredible ease, making it an ideal data exchange format for Ajax web applications. Since it is primarily a data format, JSON is not limited to just Ajax web applications, and can be used in virtually any scenario where applications need to exchange or store structured information as text. This article examines the JSON standard, its relationship to JavaScript, and how it compares to XML. Jayrock, an open-source JSON implementation for .NET, is discussed and examples of creating and parsing JSON messages are provided in JavaScript and C#.",
        created_at: 1477707849225
      }
    ];
    const actual = createRef(input, "topic", "author");
    const expected = {
      coding: "cooljmessy",
      coding: "grumpy19",
      coding: "cooljmessy"
    };
    expect(actual).to.eql(expected);
  });
});

describe("renameKeys", () => {
  it("returns a new array with new keys, when passed an array containing objects and a key/replacement", () => {
    const books = [
      { title: "Slaughterhouse-Five", writtenBy: "Kurt Vonnegut" },
      {
        title: "Blood Meridian",
        genre: "anti-western",
        writtenBy: "change my key"
      }
    ];
    const keyToChange = "writtenBy";
    const newKey = "author";
    const actual = renameKeys(books, keyToChange, newKey);
    const expected = [
      { title: "Slaughterhouse-Five", author: "Kurt Vonnegut" },
      {
        title: "Blood Meridian",
        genre: "anti-western",
        author: "change my key"
      }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(books);
  });
});
