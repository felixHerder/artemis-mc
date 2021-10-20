"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const path_1 = __importDefault(require("path"));
const express_static_gzip_1 = __importDefault(require("express-static-gzip"));
const morgan_1 = __importDefault(require("morgan"));
const api_1 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use((0, morgan_1.default)("tiny"));
app.use(express_1.default.json());
// emulate latency
// app.use((req,res,next)=>{
//   setTimeout(()=>next(),500)
// })
//API
app.use('/v1', api_1.default);
//Serve client files with gzip
const pathToClient = path_1.default.join(__dirname, '..', 'public');
app.use('/', (0, express_static_gzip_1.default)(pathToClient, { index: false }));
app.get('/*', (req, res) => {
    res.sendFile(path_1.default.join(pathToClient, 'index.html'));
});
exports.default = app;
