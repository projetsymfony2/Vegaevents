"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactController_1 = require("../Controllers/contactController"); // Import ES Modules
const router = express_1.default.Router();
// Endpoint pour soumettre un formulaire de contact
router.post('/submit', contactController_1.submitContactForm);
exports.default = router;
