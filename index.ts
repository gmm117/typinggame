import './public/reset.css';
import './public/index.css';
import { init } from './src/presenter';


try {
    init('https://my-json-server.typicode.com/kakaopay-fe/resources/words');
} catch (e) {
    console.error(e);
}


