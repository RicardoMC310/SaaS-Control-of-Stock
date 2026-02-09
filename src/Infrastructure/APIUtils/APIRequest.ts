import { Request } from "express";

export default interface APIRequest extends Request {
    sessionID?: string;
}