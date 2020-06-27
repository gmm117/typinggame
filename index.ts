import './public/reset.css';
import './public/index.css';
import { init } from './src/presenter';


try {
    init(atob('aHR0cHM6Ly9teS1qc29uLXNlcnZlci50eXBpY29kZS5jb20va2FrYW9wYXktZmUvcmVzb3VyY2VzL3dvcmRz'));
} catch (e) {
    console.error(e);
}


