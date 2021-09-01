import { useCallback, useState } from "react";

import axios from 'axios';
import { saveAs } from 'file-saver';
import JSZip from "jszip";
import { span } from "prelude-ls";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGetFile = useCallback(async () => {
    try {
      setIsLoading(true);
      const tagResponse = await axios.get('https://www.correios.com.br/enviar/encomendas/arquivo/nacional/guia-tecnico-embalagens-rpc_v1-1.pdf', {
        responseType: 'blob'
      });

      const plpResponse = await axios.get('http://santoandre.educaon.com.br/wp-content/uploads/2020/10/Manual_do_Usuario_SIGEP.pdf', {
        responseType: 'blob'
      });

      setIsLoading(false);

      const zip = new JSZip();
      zip.file('etiqueta.pdf', tagResponse.data, { binary: true });
      zip.file('plp.pdf', plpResponse.data, { binary: true });

      zip.generateAsync({ type: 'blob' }).then(blob => {
        saveAs(blob, 'file.zip');
      });

    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }

  }, []);

  return (
    <div styles="display: flex">
      <button onClick={handleGetFile}>
        Get file
      </button>

      <p>
        {isLoading && (
          <span>We are getting your files...</span>
        )}
      </p>
    </div>
  );
}

export default App;
