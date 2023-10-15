import * as deepl from 'deepl-node';
import { config } from "dotenv";
config();

const authKey = process.env.DEEPL_KEY;
const translator = new deepl.Translator(authKey);

(async () => {
    const result = await translator.translateText('Hello', null, 'de');
    console.log(result.text); 
    console.log(result)
})();