import './public/reset.css';
import './public/index.css';
import { init } from './src/presenter';


try {
    init( document.getElementById("root"), "https://my-json-server.typicode.com/kakaopay-fe/resources/words1" );
} catch (e) {
    console.error(e);
}


