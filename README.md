# Knowledge-Import-Tools

This is the first I have done with a real client. This was developed as a group project for IQADOT, and it is a platform that integrates with the company's pre-existing platform, and provides the functionality of importing any form of data into the 'Articles' section of it. The application is meant for responsible employees who know the technical details of working with data sources. The application can work with API's, external databases, large excel files of pdf's. Every decision was discussed with the client and made to his liking.

# Application Features

- **Secure Accounts and Actions**: Being meant for responsible employees, the application only has one account type, with administrator priviledges. The account control uses JWT-Token Based authentication and validates every action, in the front-end as well as in the back-end. When securing the application, the OWASP 10 list was followed, documenting possible cyberattacks and implementing ways of preventing them. For added security, in order to access the app's database, a VPN connection to a private server must be established.

- **Account Control**: Within admin priviledges is also included the ability to create more accounts into the application. A decision was taken against using a single account, for added traceability.

- **Source Control**: Being meant to be used as a tool for importing knowledge into an existing codebase, the application is designed with source control in mind. A user can add sources and reuse the same sources in case of needing to extract another set of data. This keeps in mind sources such as API's or external databases, which require an extensive configuration. In order to account for every API scenario, the app features a very detailed source confiugration, which, as the client meantioned, requires a technical background to properly use.

- **Data Preview**: After having a source, knowing what you are about to send to the IQADOT platform before you click the button is essential. The application makes sure you are not sending too many objects, and allows you to send individual bits of information from the data preview. For example, Rijksmusem has large number of art objects, which can be extracted if the source is configured properly. You can choose to send the batch of selected objects or to send them individually. When sending individually, you can also make additional requests for details before exporting.

-**Data Export**: The data imported and previewed needs to be exported to the IQADOT acrticles platform. The application has a built in IQADOT API configuration and channel selection. The data is pre-formatted in HTML, so it is displayed in a readable manner. For example, a large Excel file will turn into a table, a JSON object with an image will have the image displayed and resized, a pdf file will keep it's pagination but adapt the font size, etc.

# Technologies Used and Architecture

-**Chosen Development Technologies**: In the back-end the application is using Node.ts, Express framework for routing, securing and handling requests. The front-end uses ReactTs as the development framework, along with Tailwind-css for styling and responsiveness and Material UI for better animations. The database connection is established via a private VPN network, and it is using MySQL.

- **Architectural Choices**: We followed a 5-layer design for the full-stack of the application, making use of interfaces and dependency injection in layer-to-layer communication. The class design follows the principles of OOP as well as the SOLID principles. The database was designed using the Table-Per-Type model.

# Important Notice

Copyright 2023, 2024 IQADOT
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
