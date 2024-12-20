import bcrypt from 'bcrypt';
import {fileURLToPath} from 'url';
import { dirname } from 'path';

const createHash = async(password) =>{
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salts);
}

const isValidPassword = async(user,password) => bcrypt.compare(password, user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export { createHash, isValidPassword, __dirname };